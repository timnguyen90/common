using Entities.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

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
                return Ok(companies);
            }
            catch (Exception ex)
            {
                // logging the error here.
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
