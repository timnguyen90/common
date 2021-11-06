using Entities.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Entities.DTO;
using Entities.Models;
using Logging.Interfaces;

namespace RespositoryPattern.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public CompaniesController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetCompanies()
        {
            var companies = _repository.Company.GetAllCompanies(trackchanges: false);
            var companiesDto = _mapper.Map<IEnumerable<Company>>(companies);
            return Ok(companiesDto);
        }
    }
}
