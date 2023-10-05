using CsharpApi.Entities;
using System.ComponentModel.DataAnnotations;

namespace CsharpApi.Models.Users
{
    public class CreateRequest
    {
        [Required]
        public string? Title { get; set; }

        [Required]

        public string? FirstName { get; set; }

        [Required]
        [EnumDataType(typeof(Role))]
        public string? Role { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MinLength(6)]
        public string? Password { get; set; }

        [Required]
        [Compare(nameof(Password))]
        public string? ConfirmPassword { get; set; }
    }
}