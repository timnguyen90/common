using Entities.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Entities.DTO;

namespace RespositoryPattern.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;

        public CompaniesController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetCompanies()
        {
            try
            {
                var companies = _repository.Company.GetAllCompanies(trackchanges: false);
                var companiesDto = companies.Select(c=> new CompanyDto()
                {
                    Id= c.Id,
                    Name = c.Name,
                    FullAddress = string.Join(' ', c.Address, c.Country)
                }).ToList();

                return Ok(companiesDto);
            }
            catch (Exception ex)
            {
                // logging the error here.
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
