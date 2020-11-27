using System;
using System.Reflection;
using System.Text;
using AuthShared.Options;
using AutoWrapper;
using DataAccessLayer.DatabaseContexts;
using DataAccessLayer.Repositories;
using DataAccessLayer.Repositories.Group;
using DataAccessLayer.Repositories.GroupInvite;
using DataAccessLayer.Repositories.Intersections.UserGroup;
using DataAccessLayer.Repositories.Ride;
using DataAccessLayer.Repositories.RideParticipant;
using DataAccessLayer.Repositories.User;
using FluentValidation.AspNetCore;
using IdentifiersShared.Converters;
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
		public Startup(IConfiguration configuration)
			=> Configuration = configuration;

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			Log.Information("Configuring services...");
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(builder => { builder.WithOrigins("http://localhost:8080"); });
			});

			services.AddSingleton(Configuration);

			services.AddDbContext<CarpoolDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddHttpContextAccessor();

			services.AddControllers()
				.AddNewtonsoftJson()
				.AddFluentValidation(fv => fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
				{
					options.Authority = JwtOptions.Issuer;
					options.Audience = JwtOptions.Audience;
					options.SaveToken = true;
					options.TokenValidationParameters = new TokenValidationParameters
					{
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.Key)),
						TokenDecryptionKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.Key)),
						ValidateLifetime = true,
						ValidateIssuer = true
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

			services.AddSingleton(Configuration);

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

			app.UseCors();

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}
	}
}