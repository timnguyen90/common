using System;

namespace Asp.Application.Nlog
{
    public interface ILoggerManager
    {
        void LogInfo(string message);
        void LogWarn(string Message);
        void LogDebug(string message);
        void LogError(Exception ex, string message = null);
    }
}
