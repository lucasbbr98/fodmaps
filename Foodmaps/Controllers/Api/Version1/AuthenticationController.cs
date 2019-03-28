using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using Foodmaps.MySQL.Services.Database;

namespace Foodmaps.Web.Controllers.Api.Version1
{
    using Models;
    using Jwt;
    using Microsoft.Extensions.Configuration;
    using System.Security.Claims;
    using Models.RequestModels;
    using Services.Authentication;
    using System.Text;

    public class AuthenticationController : BaseController
    {
        private IAuthenticationUtility authenticationService;
        private IConfigurationRoot configuration;
        private IImageService imageService;
        private IFatalErrorService fatalErrorService;
        const string CONTROLLER_NAME = "AuthController";

        public AuthenticationController(
            IAuthenticationUtility authenticationService, 
            IImageService imageService,
            IConfigurationRoot configuration,
            IFatalErrorService fatalErrorService)
        {
            this.authenticationService = authenticationService;
            this.configuration = configuration;
            this.imageService = imageService;
            this.fatalErrorService = fatalErrorService;
        }

        [HttpGet("{email}/{password}"), AllowAnonymous]
        public IActionResult Login(string email, string password)
        {
            try
            {
                // Decoding from BASE 64
                byte[] data = Convert.FromBase64String(password);
                string decodedPw = Encoding.UTF8.GetString(data);

                var loggedIn = authenticationService.Authenticate(email, decodedPw, out User user);

                if (loggedIn != HttpStatusCode.OK)
                {
                    return StatusCode((int)loggedIn);
                }                

                var expiry = int.Parse(configuration["Tokens:Expiration"]) * 60;
                var token = new JwtTokenBuilder()
                    .AddSecurityKey(JwtSecurityKey.Create(configuration["Tokens:Key"]))
                    .Email(user.Email)
                    .Issuer(configuration["Tokens:Issuer"])
                    .Audience(configuration["Tokens:Issuer"])
                    .Claim(ClaimTypes.PrimarySid, user.Id.ToString())
                    .Expires(expiry);

                foreach (var role in user.Roles ?? new Role[0])
                {
                    token.Claim(ClaimTypes.Role, role.Name);
                }
                return Ok(new
                {
                    Token = token.Build().Value,
                    User = user
                });
            }
            catch (Exception ex)
            {
                //fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | Login"));

                //Log EX somewhere.
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
        }

        [HttpPost, AllowAnonymous]
        public IActionResult Register([FromBody] RegistrationModel model)
        {
            try
            {
                var resp = authenticationService.Register(model);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | Register"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }

        [HttpPost, Authorize]
        public IActionResult RegisterAdditional([FromBody] RegistrationAdditionalModel model)
        {
            try
            {
                if(UserId == null || UserId <= 0)
                {
                    return StatusCode(500);
                }

                var userId = (int)UserId;
                var resp = authenticationService.RegisterAdditional(model, userId);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | RegisterAdditional"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }

        [HttpGet, Authorize]
        public IActionResult GetUser()
        {
            try
            {
                var getUser = authenticationService.GetUser(UserId, out User user);
                if (getUser != HttpStatusCode.OK)
                {
                    return StatusCode((int)getUser);
                }

                var userId = 0;
                if(UserId != null)
                     userId = (int) UserId;


                var expiry = int.Parse(configuration["Tokens:Expiration"]) * 60;
                var token = new JwtTokenBuilder()
                    .AddSecurityKey(JwtSecurityKey.Create(configuration["Tokens:Key"]))
                    .Email(user.Email)
                    .Issuer(configuration["Tokens:Issuer"])
                    .Audience(configuration["Tokens:Issuer"])
                    .Claim(ClaimTypes.PrimarySid, user.Id.ToString())
                    .Expires(expiry);

                foreach (var role in user.Roles ?? new Role[0])
                {
                    token.Claim(ClaimTypes.Role, role.Name);
                }                

                return Ok(new
                {
                    Token = token.Build().Value,
                    User = user
                });
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | GetUser"));
                //Log EX somewhere.
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
        }

        [HttpPost, AllowAnonymous]
        public IActionResult SendResetPassword([FromBody]GetStringModel model)
        {
            try
            {
                var resp = authenticationService.SendResetPassword(model);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | SendResetPassword"));

                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }

        [HttpPost, AllowAnonymous]
        public IActionResult ResetPassword([FromBody]ResetPasswordModel model)
        {
            try
            {
                var resp = authenticationService.ResetPassword(model);
                if (resp != HttpStatusCode.OK)
                {
                    return StatusCode((int)resp);
                }
            }
            catch (Exception ex)
            {
                fatalErrorService.Insert(new FatalError(ex.ToString(), $"{CONTROLLER_NAME} | ResetPassword"));
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
            return Ok();
        }

    }
}
