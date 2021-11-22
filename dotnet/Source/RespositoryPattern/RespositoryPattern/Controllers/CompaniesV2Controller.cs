using Entities.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace RespositoryPattern.Controllers
{
    [ApiVersion("2.0")]
    [Route("api/companies")]
    [ApiController]
    public class CompaniesV2Controller : ControllerBase
    {
        private readonly IRepositoryManager _repository;

        public CompaniesV2Controller(IRepositoryManager repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> GetCompanies()
        {
            var companies = await _repository.Company.GetAllCompaniesAsync(trackChanges:false);
            return Ok(companies);
        }
    }
}
