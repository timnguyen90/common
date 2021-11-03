using Asp.Application.Nlog;
using Microsoft.Extensions.DependencyInjection;

namespace NLogDemo
{
    public static class ServiceExtensions
    {
        public static void ConfigureLoggerService(this IServiceCollection service) 
            => service.AddScoped<ILoggerManager, LoggerManager>();
    }
}