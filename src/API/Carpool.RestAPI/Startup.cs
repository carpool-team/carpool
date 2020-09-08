using System.Reflection;
using Carpool.DAL.DatabaseContexts;
using Carpool.DAL.Repositories.Group;
using Carpool.DAL.Repositories.User;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
					builder =>
					{
						builder.WithOrigins("http://localhost:8080");
					});
			});
			services.AddControllers().AddNewtonsoftJson();
			services.AddMvc(options => options.EnableEndpointRouting = false);
			services.AddSingleton<IConfiguration>(Configuration);

            services.AddTransient<IGroupRepository, GroupRepository>();
            services.AddTransient<IUserRepository, UserRepository>();

            services.AddMediatR(Assembly.GetExecutingAssembly());

			services.AddDbContext<CarpoolDbContext>(options =>
					options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseCors();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			app.UseOpenApi();
			app.UseSwaggerUi3();
		}
	}
}