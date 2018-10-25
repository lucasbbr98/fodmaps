using Microsoft.Extensions.Configuration;
using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Foodmaps.MySQL.Services.Database.Services
{
    public interface IEmailService
    {
        void SendEmail(string email, string subject, string body);
    }
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public static NetworkCredential credential;
        public static SmtpClient client;



        public EmailService(IConfigurationRoot c)
        {
            _config = c;

            credential = new NetworkCredential()
            {
                UserName = _config["AgregaEmail:Email"],
                Password = _config["AgregaEmail:Password"]
            };

            client = new SmtpClient()
            {
                Credentials = credential,
                Host = _config["AgregaEmail:Host"],
                Port = int.Parse(_config["AgregaEmail:Port"]),
                EnableSsl = true

            };

        }


        public void SendEmail(string email, string subject, string body)
        {
            using (client)
            {
                using (var message = new MailMessage())
                {
                    message.To.Add(new MailAddress(email));
                    message.From = new MailAddress(_config["AgregaEmail:Email"]);
                    message.Subject = subject;
                    message.Body = body;
                    message.IsBodyHtml = true;
                    client.Send(message);
                }
            }
        }


        // Body
        public static string PasswordResetBody(string token)
        {
            StringBuilder body = new StringBuilder();
            body.AppendFormat("<h1>Agrega Universidades</h1>");
            body.AppendFormat("<br />");
            body.AppendFormat("<h3>Recuperação de senha</h3>");
            body.AppendFormat("<br />");
            body.AppendFormat("<p>Essa é uma mensagem automática para recuperação de senha. Se você não solicitou, por favor ignore.</p>");
            body.AppendFormat("<br />");
            body.AppendFormat("<p>Clique no link abaixo para cadastrar uma nova senha</p>");
            body.AppendFormat($"<a href=\"https://www.agregauni.com/account/reset/{token}\">https://www.agregauni.com/account/reset/{token}</a>");


            return body.ToString();
        }
    }
}
