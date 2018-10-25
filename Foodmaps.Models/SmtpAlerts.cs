using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;

namespace Foodmaps.Models
{
    public class SmtpAlerts
    {
        public static string SenderEmail { get; set; } = "agregauni@gmail.com";
        public static string Password { get; set; } = "Pmlt2998!";
        public static string Host { get; set; } = "smtp.gmail.com";
        public static int Port { get; set; } = 587;
        public static bool Ssl { get; set; } = true;
        public string EmailContent { get; set; } // = content in constructor
        public string Subject { get; set; } = "Agrega Universidades";
        public List<string> RecieverEmails { get; set; } = new List<string>();
        public List<byte[]> Attachments { get; set; } = new List<byte[]>();

        public SmtpAlerts(string content, string subject, params string[] toAddresses)
        {
            Subject = subject;
            EmailContent = content;
            AddRecieverEmails(toAddresses);
        }

        //                             v this makes it so you can have 1 or more :D.
        public void AddRecieverEmails(params string[] toAdds)
        {
            foreach (var add in toAdds)
                RecieverEmails.Add(add);

            //Example:
            //AddRecieverEmails("js@as.com", "bs@bs.com", "12@asdf.com"); //This would work :Dn
            //AddRecieverEmails(new string[] { "js@as.com", "bs@bs.com", "12@asdf.com" }); //These do the exact same thing
        }

        public void AddAttachments(params byte[][] attach)
        {
            foreach (var at in attach)
                Attachments.Add(at);
        }

        public bool SendEmail()
        {
            try
            {
                using (var client = new SmtpClient(Host, Port))
                {
                    using (var message = new MailMessage())
                    {
                        message.From = new MailAddress(SenderEmail);

                        foreach (var addr in RecieverEmails)
                            message.To.Add(addr);

                        client.Credentials = new NetworkCredential(SenderEmail, Password);
                        client.EnableSsl = Ssl;

                        message.Body = EmailContent;
                        message.IsBodyHtml = true;
                        message.Subject = Subject;

                        for (var i = 0; i < Attachments.Count; i++)
                        {
                            var att = Attachments[i];
                            message.Attachments.Add(new Attachment(new MemoryStream(att), "Attachment " + i + ".png"));
                        }

                        client.Send(message);
                        return true;
                    }
                }
            }
            catch
            {
                //Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
