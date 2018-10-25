using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Foodmaps.Jwt
{
    /// <summary>
    /// Classe de criptografia para gerar o JSON Web Token de modo seguro.
    /// </summary>
    public static class JwtSecurityKey
    {
        public static SymmetricSecurityKey Create(string secret)
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
        }
    }
}
