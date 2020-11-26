using AuthDomain.Entities;
using AuthServer.Data;
using AutoWrapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace AuthServer
{
	public class Startup
	{
		public Startup(IConfiguration configuration) => Configuration = configuration;

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<ApplicationDbContext>(options =>
			{
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
			});

			services.AddIdentity<AuthUser, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();

			services.AddIdentityServer()
				.AddDeveloperSigningCredential()
				.AddInMemoryPersistedGrants()
				.AddInMemoryIdentityResources(Config.IdentityResources)
				.AddInMemoryApiScopes(Config.ApiScopes)
				.AddInMemoryClients(Config.Clients)
				.AddAspNetIdentity<AuthUser>();

			services.AddControllers();
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo {Title = "AuthServer", Version = "v1"});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AuthServer v1"));
			}

			app.UseIdentityServer();

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseApiResponseAndExceptionWrapper();

			app.UseStaticFiles();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}
	}
}