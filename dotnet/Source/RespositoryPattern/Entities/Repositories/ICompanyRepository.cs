using Entities.Models;
using System.Collections.Generic;

namespace Entities.Repositories
{
    public interface ICompanyRepository
    {
        IEnumerable<Company> GetAllCompanies(bool trackchanges);
    }
}
