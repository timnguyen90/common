using Entities.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Entities.DTO;
using Logging.Interfaces;

namespace RespositoryPattern.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;

        public CompaniesController(IRepositoryManager repository, ILoggerManager logger)
        {
            _repository = repository;
            _logger = logger;
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
                _logger.LogError($"Error in the {nameof(GetCompanies)}{ex}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
