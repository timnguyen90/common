using System;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;

namespace Entities.Repositories
{
    public class CompanyRepository : RepositoryBase<Company>, ICompanyRepository
    {
        public CompanyRepository(RepositoryContext repositoryContext)
            :base(repositoryContext)
        {
        }

        public IEnumerable<Company> GetAllCompanies(bool trackChanges)
        {
            return FindAll(trackChanges).OrderBy(c => c.Name).ToList();
        }

        public Company GetCompany(Guid companyId, bool trackChanges)
        {
            return FindByConditon(c => c.Id.Equals(companyId), trackChanges)
                .SingleOrDefault();
        }

        public void CreateCompany(Company company)
        {
            Create(company);
        }
    }
}