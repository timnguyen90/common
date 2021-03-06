namespace Entities.RequestFeatures
{
    public class RequestParameters
    {
        const int maxPagesize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > maxPagesize) ? maxPagesize : value; }
        }
        public string OrderBy { get; set; }
        public string Fields { get; set; }
    }

    public class EmployeeParameters: RequestParameters
    {
        public EmployeeParameters()
        {
            OrderBy = "name";
        }
        public uint MinAge { get; set; }
        public uint MaxAge { get; set; } = int.MaxValue;
        public bool ValidAgeRange => MaxAge > MinAge;
        public string SearchTerm { get; set; }
    }
}