using System;
using System.Reflection;
using System.Text;
using AutoWrapper;
using Carpool.Core.Models;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.DatabaseContexts;
using Carpool.DAL.Repositories;
using Carpool.DAL.Repositories.Group;
using Carpool.DAL.Repositories.GroupInvite;
using Carpool.DAL.Repositories.Intersections.UserGroup;
using Carpool.DAL.Repositories.Rating;
using Carpool.DAL.Repositories.Ride;
using Carpool.DAL.Repositories.RideParticipant;
using Carpool.DAL.Repositories.User;
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

namespace Carpool.RestAPI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
			=> Configuration = configuration;

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options =>
			{
				options.AddDefaultPolicy(
					builder => { builder.WithOrigins("http://localhost:8080"); });
			});

			services.AddSingleton(Configuration);

			services.AddDbContext<CarpoolDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddHttpContextAccessor();
			services.AddControllers().AddNewtonsoftJson();

			services.AddIdentity<User, IdentityRole<Guid>>()
			        .AddEntityFrameworkStores<CarpoolDbContext>()
			        .AddDefaultTokenProviders();

			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.SaveToken = true;
				options.RequireHttpsMetadata = false;
				options.TokenValidationParameters =
					new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidAudience = Configuration["Jwt:Audience"],
						ValidIssuer = Configuration["Jwt:Issuer"],
						IssuerSigningKey =
							new SymmetricSecurityKey(
								Encoding.UTF8
								        .GetBytes(Configuration["Jwt:Key"]))
					};
			});

			services.AddMvc(options => options.EnableEndpointRouting = false);
			services.AddSingleton(Configuration);

			services.AddScoped<IGroupRepository, GroupRepository>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IRideRepository, RideRepository>();
			services.AddScoped<IGroupInviteRepository, GroupInviteRepository>();
			services.AddScoped<IRatingRepository, RatingRepository>();
			services.AddScoped<IRideParticipantRepository, RideParticipantRepository>();
			services.AddScoped<IUserGroupRepository, UserGroupRepository>();
			services.AddScoped<IUnitOfWork, UnitOfWork>();

			services.AddMediatR(Assembly.GetExecutingAssembly());


			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo
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
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

			app.UseSwagger();

			app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Carpool API v1"); });

			app.UseHttpsRedirection();

			app.UseApiResponseAndExceptionWrapper(new AutoWrapperOptions {UseApiProblemDetailsException = true});

			app.UseRouting();

			app.UseCors();

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}
	}
}