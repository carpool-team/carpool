using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using Auth.DataAccessLayer.DatabaseContexts;
using AuthDomain.Entities;
using AuthServer.Options;
using AuthServer.Services;
using AuthServer.Utilities;
using AuthShared.Options;
using AutoWrapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RestEase;

namespace AuthServer
{
	public class Startup
	{
		private readonly JwtOptions _jwtOptions;
		private readonly RestApiOptions _restApiOptions;
		
		public Startup(IConfiguration configuration)
		{
			_configuration = configuration;
			_jwtOptions = GetJwtOptions();
			_restApiOptions = GetRestApiOptions();
		}

		private readonly IConfiguration _configuration;

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSingleton(_jwtOptions);
			
			services.AddCors();

			services.AddDbContext<ApplicationDbContext>(options =>
			{
				options.UseSqlServer(_configuration.GetConnectionString("IdentityDbConnectionString"));
			});

			services.AddIdentity<AuthUser, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();

			services.AddAuthentication(x =>
				{
					x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
					x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
					x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
				})
				.AddJwtBearer(options =>
				{
					options.RequireHttpsMetadata = true;
					options.SaveToken = true;
					options.TokenValidationParameters = new TokenValidationParameters
					{
						//TokenDecryptionKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key)),
						ValidateLifetime = true,
						ValidateIssuer = true,
						ValidIssuer = _jwtOptions.Issuer,
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key)),
						ValidateAudience = true,
						ValidAudience = _jwtOptions.Audience,
						ClockSkew = TimeSpan.FromMinutes(1)
					};
				});

			services.AddAuthorization(options =>
			{
				options.AddPolicy("ApiScope", policy =>
				{
					policy.RequireAuthenticatedUser();
				});
			});
			
			services.AddTransient(_ => RestClient.For<IUserManagementService>(_restApiOptions.RestApiUrl,
				async (request, cancellationToken) =>
				{
					var auth = request.Headers.Authorization;
					if (auth != null)
					{
						TokenGenerator tokenGenerator = new(_jwtOptions);
						var token = tokenGenerator.GenerateIdpJwtToken();
						request.Headers.Authorization = new AuthenticationHeaderValue(auth.Scheme,
							new JwtSecurityTokenHandler().WriteToken(token));
					}
				}));
			services.AddTransient<ITokenGenerator, TokenGenerator>();
			
			services.AddControllers();
			
			services.AddMediatR(Assembly.GetExecutingAssembly());

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo {Title = "AuthServer", Version = "v1"});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
				app.UseDeveloperExceptionPage();

			app.UseSwagger();
			app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AuthServer v1"));

			app.UseHttpsRedirection();

			app.UseRouting();
			
			app.UseCors(x =>
			{
				x.AllowAnyMethod()
					.AllowAnyHeader()
					.SetIsOriginAllowed(origin => true); // allow any origin
			});
			
			app.UseApiResponseAndExceptionWrapper();

			app.UseStaticFiles();

			app.UseAuthentication();

			app.UseAuthorization();
			
			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}

		private JwtOptions GetJwtOptions()
			=> _configuration.GetSection(nameof(JwtOptions))
				.Get<JwtOptions>();

		private RestApiOptions GetRestApiOptions()
			=> _configuration.GetSection(nameof(RestApiOptions))
				.Get<RestApiOptions>();
	}
}