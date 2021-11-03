using Asp.Application.Nlog;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace NLogDemo.Pages
{
    public class IndexModel : PageModel
    {
        private ILoggerManager _logger;

        public IndexModel(ILoggerManager logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            _logger.LogInfo("Log information"); 
            _logger.LogDebug("Log debug"); 
            _logger.LogWarn("Log warning");

            var ex = new InvalidCastException();
            _logger.LogError(ex, "Log Error");
        }
    }
}
