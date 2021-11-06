namespace Logging.Interfaces
{
    public interface ILoggerManager
    {
        void LogInfo(string message);
        void LogWarn(string Message);
        void LogDebug(string message);
        void LogError(string message = null);
    }
}
