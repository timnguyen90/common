﻿using System.Threading.Tasks;

namespace Entities.Repositories
{
    public interface IRepositoryManager
    {
        ICompanyRepository Company { get; }

        IEmployeeRepository Employee { get; }

        Task SaveAsync();
    }
}
