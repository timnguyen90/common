﻿using Entities.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using AutoMapper;
using Entities.DTO;
using Entities.Models;
using Logging.Interfaces;
using System.Linq;
using Entities.ModelBinders;

namespace RespositoryPattern.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly ILoggerManager _logger;

        public CompaniesController(IRepositoryManager repository, IMapper mapper, ILoggerManager logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetCompanies()
        {
            var companies = _repository.Company.GetAllCompanies(trackChanges: false);
            var companiesDto = _mapper.Map<IEnumerable<Company>>(companies);
            return Ok(companiesDto);
        }

        [HttpGet("{id}", Name = "CompanyById")]
        public IActionResult GetCompany(Guid id)
        {
            var company = _repository.Company.GetCompany(id, trackChanges: false);
            if (company == null)
            {
                _logger.LogInfo($"Company with id: {id} doesn't exist in the database.");
                return NotFound();
            }
            else
            {
                var companyDto = _mapper.Map<Company>(company);
                return Ok(companyDto);
            }
        }

        [HttpPost]
        public IActionResult CreateCompany([FromBody] CompanyForCreationDto company)
        {
            if (company == null)
            {
                _logger.LogError("CompanyForCreationDto object sent from client is null.");
                return BadRequest("CompanyForCreationDto object is null");
            }

            var companyEntity = _mapper.Map<Company>(company);
            _repository.Company.CreateCompany(companyEntity);
            _repository.Save();

            var companyToReturn = _mapper.Map<CompanyDto>(companyEntity);
            return CreatedAtRoute("CompanyById", new {id = companyToReturn.Id}, companyToReturn);
        }

        [HttpGet("collection/{ids}", Name ="CompanyCollection")]
        public IActionResult GetCompanyCollection([ModelBinder(BinderType =typeof(ArrayModelBinder))] IEnumerable<Guid> ids)
        {
            if(ids == null)
            {
                _logger.LogError("Parameter ids is null");
                return BadRequest("Parameter ids is null");
            }

            var companyEntities = _repository.Company.GetByIds(ids, trackChanges: false);
            if(ids.Count() != companyEntities.Count())
            {
                _logger.LogError("Some ids are not valid in a collection");
                return NotFound();
            }
            var companiesToReturn = _mapper.Map<IEnumerable<CompanyDto>>(companyEntities);
            return Ok(companiesToReturn);
        }

        [HttpPost("collection")]
        public IActionResult CreateCompanyCollection([FromBody]IEnumerable<CompanyForCreationDto> companyCollection)
        {
            if(companyCollection == null)
            {
                _logger.LogError("Company collection sent from client is null.");
                return BadRequest("Company collection is null");
            }

            var companyEntities = _mapper.Map<IEnumerable<Company>>(companyCollection);
            foreach (var company in companyEntities)
            {
                _repository.Company.CreateCompany(company);
            }

            _repository.Save();

            var companyCollectionToReturn = _mapper.Map<IEnumerable<CompanyDto>>(companyEntities);
            var ids = string.Join(",", companyCollectionToReturn.Select(c => c.Id));

            return CreatedAtRoute("CompanyCollection", new { ids }, companyCollectionToReturn);
        }
    }
}
