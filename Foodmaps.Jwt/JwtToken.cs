using System;
using System.IdentityModel.Tokens.Jwt;

namespace Foodmaps.Jwt
{
    /// <summary>
    /// 'JwtToken' é uma classe para auxiliar na autenticação dos usuários segundo seus respectivos cargos.
    ///  Você pode pesquisar sobre como autenticação via JSON Web Token funciona para entender melhor.
    /// </summary>
    public class JwtToken
    {
        private JwtSecurityToken token;
        private string stringToken;
        public JwtToken(JwtSecurityToken token)
        {
            this.token = token;
        }

        public JwtToken(string token)
        {
            this.stringToken = token;
        }

        public DateTime ValidTo => token.ValidTo;

        public string Value => new JwtSecurityTokenHandler().WriteToken(this.token);

        public JwtSecurityToken Read => new JwtSecurityTokenHandler().ReadJwtToken(this.stringToken);
    }
}