using System.ComponentModel.DataAnnotations;

namespace todoCS.Dtos;

public class ChangeEmailDto
{
    [EmailAddress]
    public string NewEmail { get; set; }
}