using AutoMapper;
using Entities.DTO;
using Entities.Models;

namespace RespositoryPattern
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Company, CompanyDto>()
                .ForMember(c => c.FullAddress, opt => opt.MapFrom(x => string.Join(' ', x.Address, x.Country)));
        }
    }
}
