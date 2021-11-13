using System;
using System.Threading.Tasks;
using Entities.Models;
using Entities.RequestFeatures;

namespace Entities.Repositories
{
    public interface IEmployeeRepository
    {
        Task<PageList<Employee>> GetEmployeesAsync(Guid companyId, EmployeeParameters employeeParameters, bool trackChanges);
        
        Task<Employee> GetEmployeeAsync(Guid companyId, Guid id, bool trackChanges);
        
        void CreateEmployeeForCompany(Guid companyId, Employee employee);

        void DeleteEmployee(Employee employee);
    }
}
