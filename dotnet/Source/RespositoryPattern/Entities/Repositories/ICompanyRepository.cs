using System;
using Entities.Models;
using System.Collections.Generic;

namespace Entities.Repositories
{
    public interface ICompanyRepository
    {
        IEnumerable<Company> GetAllCompanies(bool trackChanges);
        
        Company GetCompany(Guid companyId, bool trackChanges);
    }
}
