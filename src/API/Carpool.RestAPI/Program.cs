using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Carpool.RestAPI
{
	public class Program
	{
		private static readonly bool IsDebugging = Debugger.IsAttached;
		public static void Main(string[] args)
		{
			if(IsDebugging)
				Log.Logger = new LoggerConfiguration()
				             .MinimumLevel.Debug()
				             .WriteTo.Console()
				             .WriteTo.File("logs\\log.txt",
					             rollingInterval: RollingInterval.Day,
					             rollOnFileSizeLimit: true)
				             .CreateLogger();
			else
				Log.Logger = new LoggerConfiguration()
				             .MinimumLevel.Information()
				             .WriteTo.Console()
				             .WriteTo.File("logs\\log.txt",
					             rollingInterval: RollingInterval.Day,
					             rollOnFileSizeLimit: true)
				             .CreateLogger();
			
			Log.Information("Application is starting.");
			
			CreateHostBuilder(args).Build().Run();
			
			Log.Information("Application has been closed.");
			Log.CloseAndFlush();
			
		}

		public static IHostBuilder CreateHostBuilder(string[] args)
			=> Host.CreateDefaultBuilder(args)
			       .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
	}
}