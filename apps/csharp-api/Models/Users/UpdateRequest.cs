using System.ComponentModel.DataAnnotations;
using CsharpApi.Entities;

namespace CsharpApi.Models.Users
{
    public class UpdateRequest
    {
        public string? Title { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [EnumDataType(typeof(Role))]
        public string? Role { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        // treat empty string as null for password fields
        // this allows password fields to be optional in frontend apps
        private string? _password;
        [MinLength(6)]
        public string? Password
        {
            get => _password;
            set => _password = string.IsNullOrEmpty(value) ? null : value;
        }

        private string? _confirmPassword;
        [Compare(nameof(Password))]
        public string? ConfirmPassword
        {
            get => _confirmPassword;
            set => _confirmPassword = string.IsNullOrEmpty(value) ? null : value;
        }

        // helpers
        private string? replaceEmptyStringWithNull(string? value)
        {
            return string.IsNullOrEmpty(value) ? null : value;
        }
    }
}