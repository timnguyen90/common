﻿using System;
using System.Collections.Generic;
using System.Linq;
using Entities.Models;

namespace Entities.Repositories
{
    public class EmployeeRepository: RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(RepositoryContext repositoryContext) 
            : base(repositoryContext) 
        { 
        }

        public IEnumerable<Employee> GetEmployees(Guid companyId, bool trackChanges)
        {
            return FindByConditon(e => e.CompanyId.Equals(companyId), trackChanges)
                .OrderBy(e => e.Name);
        }
    }
}
