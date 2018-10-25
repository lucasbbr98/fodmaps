using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Foodmaps.Web.Controllers.Api.Version1
{
    /// <summary>
    /// Classe base de todos os controladores, responsável pela autorização e decodificação do JSON Web Token
    /// </summary>
    [Route("v1/[controller]/[action]")]
    public class BaseController : Controller
    {
        // Caso queira resgatar o IP e o Navegador de Internet
        //public string IPAddress => Request.HttpContext.Connection.RemoteIpAddress.ToString();
        //public string UserAgent => Request.Headers.ContainsKey("User-Agent") ? Request.Headers["User-Agent"].ToString() : "";

        public int? UserId => GetClaim(ClaimTypes.PrimarySid, out int userid) ? userid : (int?)null;
        public string Email => GetClaim(ClaimTypes.Email, out string email) ? email : null;

        //Não utilizar para autorização, utilize [Authorize(Roles = "")] atributo acima dos controles
        public string[] Roles => GetClaims<string>(ClaimTypes.Role);


        private bool GetClaim<T>(string name, out T claim)
            where T: IConvertible
        {
            var strClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == name)?.Value;
            if (strClaim == null)
            {
                claim = default(T);
                return false;
            }
            try
            {
                claim = (T)Convert.ChangeType(strClaim, typeof(T));
                return true;
            }
            catch
            {
                claim = default(T);
                return false;
            }
        }
        private T[] GetClaims<T>(string name)
            where T: IConvertible
        {
            var typedClaims = new List<T>();
            foreach(var claim in User.FindAll(name))
            {
                try
                {
                    typedClaims.Add((T)Convert.ChangeType(claim, typeof(T)));
                }
                catch { }
            }

            return typedClaims.ToArray();
        }
    }
}
