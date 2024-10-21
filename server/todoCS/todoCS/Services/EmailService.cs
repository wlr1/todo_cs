using System.Net;
using System.Net.Mail;

namespace todoCS.Services;

public interface IEmailService
{
    Task SendEmailAsync(string toEmail, string subject, string message);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        var smtpClient = new SmtpClient
        {
            Host = _configuration["EmailSettings:Host"],
            Port = int.Parse(_configuration["EmailSettings:Port"]),
            Credentials = new NetworkCredential(_configuration["EmailSettings:Username"],
                _configuration["EmailSettings:Password"]),
            EnableSsl = true
        };
        using var mailMessage = new MailMessage
        {
            From = new MailAddress(_configuration["EmailSettings:FromEmail"]),
            Subject = subject,
            Body = message,
            IsBodyHtml = true
        };
        
        mailMessage.To.Add(toEmail);

        await smtpClient.SendMailAsync(mailMessage);
    }
}