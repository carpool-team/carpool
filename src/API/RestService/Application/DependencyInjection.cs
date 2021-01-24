using System.Reflection;
using Application.Extensions;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddApplication(this IServiceCollection services,
			IConfiguration configuration)
		{
			services.AddMediatR(Assembly.GetExecutingAssembly());

			MapsterExtensions.RegisterCustomMappings();

			return services;
		}
	}
}