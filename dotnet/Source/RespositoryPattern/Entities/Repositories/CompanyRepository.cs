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

        public IEnumerable<Company> GetAllCompanies(bool trackchanges)
        {
            return FindAll(trackchanges).OrderBy(c => c.Name).ToList();
        }
    }
}
