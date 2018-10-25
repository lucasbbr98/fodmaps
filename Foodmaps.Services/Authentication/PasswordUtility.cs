using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Foodmaps.Services.Authentication
{
    public interface IPasswordUtility
    {
        string Hash(string password, string salt);

        string Md5(string input);

        string RandomString(int length);

        string RandomString();
    }

    public class PasswordUtility : IPasswordUtility
    {
        public const string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=\\|[]{}\"';:/?.>,<`~";
        private Random _rnd;
        public Random Random => _rnd ?? (_rnd = new Random());

        private IConfigurationRoot configuration;

        public PasswordUtility(IConfigurationRoot configuration)
        {
            this.configuration = configuration;
        }

        public string Hash(string password, string salt)
        {
            return Md5(password + salt + new string(password.Reverse().ToArray()));
        }

        public string Md5(string input)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(input)).Select(t => t.ToString("X2")).ToArray());
        }

        public string RandomString(int length)
        {
            var output = "";
            for (var i = 0; i < length; i++)
            {
                output += Characters[Random.Next(0, Characters.Length)];
            }
            return output;
        }

        public string RandomString()
        {
            return RandomString(Random.Next(5, 20));
        }
    }
}
