using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Foodmaps.Jwt
{
    /// <summary>
    /// Classe para construir um Token de maneira mais elegante e simples dentro do código
    /// </summary>
    public class JwtTokenBuilder
    {
        private SecurityKey securityKey = null;
        private string issuer = "";
        private string audience = "";
        private List<Claim> claims = new List<Claim>();
        private int expiryInMinutes = 3;

        public JwtTokenBuilder AddSecurityKey(SecurityKey key)
        {
            this.securityKey = key;
            return this;
        }

        public JwtTokenBuilder Email(string subject)
        {
            Claim(ClaimTypes.Email, subject);
            return this;
        }

        public JwtTokenBuilder Issuer(string issuer)
        {
            this.issuer = issuer;
            return this;
        }

        public JwtTokenBuilder Audience(string audience)
        {
            this.audience = audience;
            return this;
        }

        public JwtTokenBuilder Claim(string type, string value)
        {
            this.Claim(new Claim(type, value));
            return this;
        }

        public JwtTokenBuilder Claim(params Claim[] claims)
        {
            foreach (var claim in claims)
                this.claims.Add(claim);
            return this;
        }

        public JwtTokenBuilder Expires(int minutes)
        {
            this.expiryInMinutes = minutes;
            return this;
        }

        public JwtToken Build()
        {
            EnsureArguments();
            
            Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString());

            var token = new JwtSecurityToken(
                issuer: this.issuer,
                audience: this.audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                signingCredentials: new SigningCredentials(
                        this.securityKey,
                        SecurityAlgorithms.HmacSha256
                    )
                );

            return new JwtToken(token);
        }

        private void EnsureArguments()
        {
            if (this.securityKey == null)
                throw new ArgumentNullException("Security Key");

            if (string.IsNullOrEmpty(this.issuer))
                throw new ArgumentNullException("Issuer");

            if (string.IsNullOrEmpty(this.audience))
                throw new ArgumentNullException("Audience");
        }
    }
}
