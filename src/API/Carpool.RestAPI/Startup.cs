using System;
using System.Reflection;
using AutoWrapper;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.DAL.Repositories.Company;
using Carpool.DAL.Repositories.Group;
using Carpool.DAL.Repositories.GroupInvite;
using Carpool.DAL.Repositories.Location;
using Carpool.DAL.Repositories.Rating;
using Carpool.DAL.Repositories.Ride;
using Carpool.DAL.Repositories.RideParticipant;
using Carpool.DAL.Repositories.RideRequest;
using Carpool.DAL.Repositories.User;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Carpool.RestAPI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

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
			services.AddMvc(options => options.EnableEndpointRouting = false);
			services.AddSingleton(Configuration);

			services.AddScoped<IGroupRepository, GroupRepository>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<ICompanyRepository, CompanyRepository>();
			services.AddScoped<IRideRepository, RideRepository>();
			services.AddScoped<IRideRequestRepository, RideRequestRepository>();
			services.AddScoped<IGroupInviteRepository, GroupInviteRepository>();
			services.AddScoped<IRatingRepository, RatingRepository>();
			services.AddScoped<IRideParticipantRepository, RideParticipantRepository>();
			services.AddScoped<ILocationRepository, LocationRepository>();
			services.AddMediatR(Assembly.GetExecutingAssembly());




			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo()
				{
					Title = "Carpool API",
					Version = "v1",
					Description = "",
					Contact = new OpenApiContact()
					{
						Name = "Michał Dulski",
						Email = "mic.dulski@st.amu.edu.pl",
						Url = new Uri("https://carpool.pl")
					},
				});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseSwagger();

			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Carpool API v1");
			});
			
			app.UseHttpsRedirection();

			app.UseApiResponseAndExceptionWrapper(new AutoWrapperOptions() {UseApiProblemDetailsException = true});

			app.UseRouting();

			app.UseCors();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}
	}
}