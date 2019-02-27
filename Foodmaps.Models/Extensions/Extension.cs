using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Foodmaps.Models.Extensions
{
    public static class Extension
    {
        public static bool ArrayIsNullOrEmpty(params string[] items)
        {
            foreach(var i in items)
            {
                if (string.IsNullOrEmpty(i))
                    return true;
            }
            return false;
        }
        public static bool ArrayIsTooLong(params string[] items)
        {
            foreach (var i in items)
            {
                if (i.Length > 49)
                    return true;
            }
            return false;
        }
        public static bool IsGuid(string guid)
        {
            if (string.IsNullOrEmpty(guid))
                return false;

            return Guid.TryParse(guid, out Guid g);
        }
        public static bool IsValidArray(params string[] items)
        {
            if (ArrayIsNullOrEmpty(items) || ArrayIsTooLong(items))
                return false;

            return true;
        }
        public static bool IsDigitsOnly(string str)
        {
            foreach (char c in str)
            {
                if (c < '0' || c > '9')
                    return false;
            }

            return true;
        }
        public static bool IsValidJobName(string j)
        {
            if (string.IsNullOrEmpty(j))
                return false;

            j = j.ToLower();
            if (j != "nutricionista" && j != "nutrólogo" && j != "outro")
                return false;

            return true;
        }

        public static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public static bool IsValidType(string t)
        {
            if (t == "student" || t == "teacher" || t == "professional" || t == "other")
                return true;

            return false;
        }
        public static bool IsValidQuestionnaireType(string t)
        {
            if (t == "questionario" || t == "pesquisa")
                return true;

            return false;
        }
        public static bool IsDate(string date)
        {
            try
            {
                DateTime dt = DateTime.Parse(date);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool IsCPF(string CPF)
        {
            int[] mt1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] mt2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string TempCPF;
            string Digito;
            int soma;
            int resto;

            CPF = CPF.Trim();
            CPF = CPF.Replace(".", "").Replace("-", "");

            if (CPF.Length != 11)
                return false;

            TempCPF = CPF.Substring(0, 9);
            soma = 0;
            for (int i = 0; i < 9; i++)
                soma += int.Parse(TempCPF[i].ToString()) * mt1[i];

            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            Digito = resto.ToString();
            TempCPF = TempCPF + Digito;
            soma = 0;

            for (int i = 0; i < 10; i++)
                soma += int.Parse(TempCPF[i].ToString()) * mt2[i];

            resto = soma % 11;
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;

            Digito = Digito + resto.ToString();

            return CPF.EndsWith(Digito);
        }
        public static string FormatCPF(string CPF)
        {
            CPF = CPF.Trim();
            CPF = CPF.Replace(".", "").Replace("-", "");
            CPF = CPF.Insert(3, ".");
            CPF = CPF.Insert(7, ".");
            CPF = CPF.Insert(11, "-");
            return CPF;
        }

        public static bool IsCnpj(string cnpj)
        {
            if (cnpj == "" || cnpj == default(string) || cnpj == null)
            {
                return true;
            }
            int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;
            string digito;
            string tempCnpj;
            cnpj = cnpj.Trim();
            cnpj = cnpj.Replace(".", "").Replace("-", "").Replace("/", "");
            if (cnpj.Length != 14)
                return false;
            tempCnpj = cnpj.Substring(0, 12);
            soma = 0;
            for (int i = 0; i < 12; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCnpj = tempCnpj + digito;
            soma = 0;
            for (int i = 0; i < 13; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cnpj.EndsWith(digito);
        }
        public static string FormatCNPJ(string CNPJ)
        {
            if (CNPJ == "")
                return CNPJ;

            CNPJ = CNPJ.Trim();
            CNPJ = CNPJ.Replace(".", "").Replace("-", "");
            CNPJ = CNPJ.Insert(2, ".");
            CNPJ = CNPJ.Insert(6, ".");
            CNPJ = CNPJ.Insert(10, "/");
            CNPJ = CNPJ.Insert(10, "-");
            return CNPJ;
        }

        public static bool IsNegative(int n)
        {
            if (n < 0)
                return true;

            return false;
        }

        public static bool IsValidNumber(int n)
        {
            if (n <= 0)
                return false;

            return true;
        }


        // Checks if theres only two places after decimal | For example: 100.000 == 100.00, but 90.59 != 90.597 
        // PS: I still have to take care of 100.000 cases, because .ToString() will show it. But i can do that on the front end.
        // PS2: It should never have a 100.000, unless theres some b ug on my end OR the user messed up client validation aka (tried to hack)
        public static bool IsValidPrice(decimal? d)
        {
            if (d == null)
                return false;

            if (d < 0)
                return false;

            var _d = (decimal)d;

            return decimal.Round(_d, 2) == _d;
        }

        public static bool IsValidYear(int y)
        {
            if (!IsValidNumber(y))
                return false;

            var currentYear = DateTime.Now.Year;
            if (y > currentYear || y < currentYear - 100)
                return false;

            return true;
        }
        public static bool IsName(string n)
        {
            if (!HasLength(n, 3, 40))
                return false;

            var re = new Regex("^[ A-Za-z\u00C0-\u00ff]+$");
            return re.IsMatch(n.ToLower());
        }

        public static bool IsSurname(string n)
        {
            if (!HasLength(n, 2, 70))
                return false;

            var re = new Regex("^[ A-Za-z\u00C0-\u00ff]+$");
            return re.IsMatch(n.ToLower());
        }

        public static bool IsPassword(string p)
        {
            return HasLength(p, 6, 50);
        }

        public static bool IsCourse(string c)
        {
            if (!HasLength(c, 3, 40))
                return false;

            var re = new Regex("^[ A-Za-z\u00C0-\u00ff]+$");
            return re.IsMatch(c.ToLower());
        }

        public static bool HasLength(string s, int min, int max)
        {
            if (string.IsNullOrEmpty(s) || s.Length < min || s.Length > max)
                return false;
            
            return true;
        }

        public static bool IsMime(string m)
        {
            if (IsPng(m) || IsJpeg(m))
                return true;

            return false;
        }
        public static bool IsValidRate(int r)
        {
            if(r <= 0 || r> 5)
                return false;

            return true;
        }
        public static bool IsValidImage(byte[] bytes)
        {
            // 16 MB
            if (bytes.Length < 16777215)
                return true;

            return false;

        }

        public static bool IsPng(string m)
        {
            if (m == "image/png")
                return true;

            return false;
        }
        public static bool IsJpeg(string m)
        {
            if (m == "image/jpeg")
                return true;

            return false;
        }
        public static bool IsGender(string g)
        {
            g = g.ToLower();
            if(g == "masculino" || g == "feminino" || g == "outro")
                return true;

            return false;
        }
        public static bool IsUniversity(string u)
        {
            if (string.IsNullOrEmpty(u) || u.Length < 2 || u.Length > 70)
                return false;

            return true;
        }
        public static bool isUser (User u)
        {
            if (!IsName(u.Name) || !IsSurname(u.Surname) || !IsGender(u.Gender) || !IsValidEmail(u.Email) || !IsUniversity(u.University))
                return false;           

            return true;
        }

        public static bool IsBetween(double d, double min, double max)
        {
            if (d < min)
                return false;

            if (d > max)
                return false;

            return true;
        }

        public static bool IsValidQuestionnaireAnswersArray(Answer[] answers)
        {
            // Checks if all FoodIds are Unique
            if (answers.GroupBy(x => x.FoodId).Any(g => g.Count() > 1))
                return false;

            // Makes sure all FoodIDs are between 1 and 65 including both
            if (answers.Any(t => t.FoodId < 1 || t.FoodId > 66))
                return false;

            // Makes sure the values are between 0 and 10 including both
            if (answers.Any(t => t.Value < 0 || t.Value > 10))
                return false;

            return true;
        }
    }
}
