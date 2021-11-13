using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entities.DTO
{
    public class CompanyForManipulationDto
    {
        [Required(ErrorMessage = "Company name is a required field.")]
        [MaxLength(30, ErrorMessage = "Maximum length for the name is 30 characters.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Address is a required field.")]
        [MaxLength(30, ErrorMessage = "Maximum length for the address is 30 characters.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Country is a required field.")]
        [MaxLength(30, ErrorMessage = "Maximum length for the country is 30 characters.")]
        public string Country { get; set; }

        public IEnumerable<EmployeeForCreationDto> Employees { get; set; }
    }
}
