﻿using System;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Entities.Repositories
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllCompaniesAsync(bool trackChanges);
        
        Task<Company> GetCompanyAsync(Guid companyId, bool trackChanges);

        Task<IEnumerable<Company>> GetByIdsAsync(IEnumerable<Guid> ids, bool trackChanges);

        void CreateCompany(Company company);

        void DeleteCompany(Company company);
    }
}
