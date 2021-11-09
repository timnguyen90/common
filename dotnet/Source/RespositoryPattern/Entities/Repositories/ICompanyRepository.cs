using System;
using Entities.Models;
using System.Collections.Generic;

namespace Entities.Repositories
{
    public interface ICompanyRepository
    {
        IEnumerable<Company> GetAllCompanies(bool trackChanges);
        
        Company GetCompany(Guid companyId, bool trackChanges);

        IEnumerable<Company> GetByIds(IEnumerable<Guid> ids, bool trackChanges);

        void CreateCompany(Company company);

        void DeleteCompany(Company company);
    }
}
