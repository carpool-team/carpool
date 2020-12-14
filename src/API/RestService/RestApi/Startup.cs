using System;
using System.Reflection;
using System.Text;
using AuthShared.Options;
using AutoWrapper;
using DataAccessLayer.DatabaseContexts;
using DataAccessLayer.Repositories;
using DataAccessLayer.Repositories.Intersections;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Contracts.Repositories.Intersections;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;

namespace RestApi
{
	public class Startup
	{
		private readonly IConfiguration _configuration;
		private readonly JwtOptions _jwtOptions;

		public Startup(IConfiguration configuration, JwtOptions jwtOptions)
		{
			_configuration = configuration;
			_jwtOptions = GetJwtOptions();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			Log.Information("Configuring services...");

			services.Configure<JwtOptions>(_configuration);

			services.AddCors();

			services.AddSingleton(_configuration);

			services.AddDbContext<CarpoolDbContext>(options =>
				options.UseSqlServer(_configuration.GetConnectionString("RestDbConnectionString")));

			services.AddHttpContextAccessor();

			services.AddControllers()
				.AddNewtonsoftJson()
				.AddFluentValidation(fv => fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));

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
					policy.RequireClaim("scope", "carpool_rest_api");
				});
			});

			services.AddSingleton(_configuration);

			services.AddScoped<IGroupRepository, GroupRepository>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IRideRepository, RideRepository>();
			services.AddScoped<IGroupInviteRepository, GroupInviteRepository>();
			services.AddScoped<IRideParticipantRepository, RideParticipantRepository>();
			services.AddScoped<IUserGroupRepository, UserGroupRepository>();
			services.AddScoped<IUnitOfWork, UnitOfWork>();

			services.AddMediatR(Assembly.GetExecutingAssembly());

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1",
					new OpenApiInfo
					{
						Title = "Carpool API",
						Version = "v1",
						Description = "",
						Contact = new OpenApiContact
						{
							Name = "Michał Dulski",
							Email = "mic.dulski@st.amu.edu.pl",
							Url = new Uri("https://carpool.pl")
						}
					});
			});

			Log.Information("Services configured.");
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

			app.UseSwagger();

			app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Carpool API v1"); });

			app.UseHttpsRedirection();

			app.UseApiResponseAndExceptionWrapper();

			app.UseRouting();

			app.UseCors(x =>
			{
				x.AllowAnyMethod()
					.AllowAnyHeader()
					.SetIsOriginAllowed(origin => true); // allow any origin
			});

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}
		
		private JwtOptions GetJwtOptions()
			=> _configuration.GetSection(nameof(JwtOptions))
				.Get<JwtOptions>();
	}
}