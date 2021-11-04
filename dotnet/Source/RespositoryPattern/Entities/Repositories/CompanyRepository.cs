﻿using Entities.Models;

namespace Entities.Repositories
{
    public class CompanyRepository : RepositoryBase<Company>, ICompanyRepository
    {
        public CompanyRepository(RepositoryContext repositoryContext)
            :base(repositoryContext)
        {
        }
    }
}
