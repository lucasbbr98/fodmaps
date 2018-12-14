using Microsoft.Extensions.Configuration;
using System;
using System.Net;
using System.Linq;

namespace Foodmaps.MySQL.Services.Utilities.Authentication
{
    using Models;
    using Models.RequestModels;
    using Database;
    using Database.Services;
    using Foodmaps.Services.Authentication;
    using System.Text;

    public class AuthenticationUtility : IAuthenticationUtility
    {
        private IUserService userService;
        private IConfigurationRoot configuration;
        private IPasswordUtility passwordService;
        private IAuthenticationService authenticationService;
        private IRoleService roleService;
        private IUserRoleService userRoleService;
        private IEmailService emailService;
        private IJobService jobService;
        private IAddressService addressService;
        public const string UTILITY_NAME = "Authentication Utility | ";

        public AuthenticationUtility(
            IUserService userService, 
            IConfigurationRoot configuration, 
            IPasswordUtility passwordService,
            IAuthenticationService authenticationService,
            IRoleService roleService,
            IUserRoleService userRoleService,
            IEmailService emailService,
            IJobService jobService,
            IAddressService addressService)
        {
            this.userService = userService;
            this.configuration = configuration;
            this.passwordService = passwordService;
            this.authenticationService = authenticationService;
            this.roleService = roleService;
            this.userRoleService = userRoleService;
            this.emailService = emailService;
            this.jobService = jobService;
            this.addressService = addressService;
        }

        public HttpStatusCode Authenticate(string email, string password, out User user)
        {
            user = null;
            try
            {
                if (string.IsNullOrEmpty(email) ||
                    string.IsNullOrEmpty(password))
                {
                    return HttpStatusCode.BadRequest;
                }

                var userAuth = userService.GetUser(email);
                if (userAuth == null || userAuth.Value.Key == null)
                {
                    return HttpStatusCode.NotFound;
                }

                user = userAuth.Value.Key;
                var auth = userAuth.Value.Value;

                var hashedPassword = passwordService.Hash(password, auth.Salt);

                if (auth.Password != hashedPassword)
                {
                    auth.Failures += 1;
                    auth.LastFailure = DateTime.Now;
                    auth.ModifiedBy = "AuthenticationService";
                    authenticationService.Update(auth);
                    return HttpStatusCode.NotAcceptable;
                }

                var roles = roleService.UserRoles(user.Id).ToArray();

                //Check for any bad roles here (Like suspended)
                if (roles.Any(t => t.Name == "Suspended"))
                {
                    return HttpStatusCode.Forbidden;
                }

                user.Roles = roles;

                return HttpStatusCode.OK;
            }
            catch
            {
                //Log the error here
                return HttpStatusCode.InternalServerError;
            }
        }

        public HttpStatusCode GetUser(int? userId, out User user)
        {
            user = null;
            try
            {
                if (userId == null)
                {
                    return HttpStatusCode.BadRequest;
                }

                var testId = (int)userId;

                if (testId <= 0 )
                {
                    return HttpStatusCode.BadRequest;
                }

                user = userService.Get(testId);
                if (user == null)
                {
                    return HttpStatusCode.NotFound;
                }
                // I NEED TO CHANGE THIS TO SQL!
                if (user.ObsoletedBy != null || user.ObsoletedOn != null)
                {
                    return HttpStatusCode.Forbidden;
                }


                var roles = roleService.UserRoles(user.Id).ToArray();

                //Check for any bad roles here (Like suspended)
                if (roles.Any(t => t.Name == "Suspended"))
                {
                    return HttpStatusCode.Forbidden;
                }

                user.Roles = roles;

                return HttpStatusCode.OK;
            }
            catch
            {
                //Log the error here
                return HttpStatusCode.InternalServerError;
            }
        }
        public HttpStatusCode GetUserByEmail(string email, out User user)
        {
            user = null;
            try
            {
                if (email == null)
                {
                    return HttpStatusCode.BadRequest;
                }

                user = userService.GetByEmail(email);
                if (user == null)
                {
                    return HttpStatusCode.NotFound;
                }
                // I NEED TO CHANGE THIS TO SQL!
                if (user.ObsoletedBy != null || user.ObsoletedOn != null)
                {
                    return HttpStatusCode.Forbidden;
                }


                var roles = roleService.UserRoles(user.Id).ToArray();

                //Check for any bad roles here (Like suspended)
                if (roles.Any(t => t.Name == "Suspended"))
                {
                    return HttpStatusCode.Forbidden;
                }

                user.Roles = roles;

                return HttpStatusCode.OK;
            }
            catch
            {
                //Log the error here
                return HttpStatusCode.InternalServerError;
            }
        }

        public HttpStatusCode Register(RegistrationModel model)
        {
            const string METHOD_IDENTIFIER = UTILITY_NAME + "Register";

            // Validates Input Data
            var validator = new RegistrationModelValidator();
            var errorMsgs = validator.Validate(model);
            if (errorMsgs.Any())
            {
                return HttpStatusCode.BadRequest;
            }

            // Checks if email exists
            var userAuth = userService.GetUser(model.Email);
            if (userAuth != null)
            {
                return HttpStatusCode.Conflict;
            }

            //Creates new user
            var user = new User(model, METHOD_IDENTIFIER);
            user.Id = userService.InsertGetId(user);
            if (user.Id <= 0)
            {
                return HttpStatusCode.InternalServerError;
            }
            // Creates new Auth
            byte[] data = Convert.FromBase64String(model.Password);
            string decodedPassword = Encoding.UTF8.GetString(data);
            var salt = passwordService.RandomString();
            var hashedPassword = passwordService.Hash(decodedPassword, salt);
            var auth = new Authentication(user, salt, hashedPassword);
            if (!authenticationService.Insert(auth))
            {
                return HttpStatusCode.InternalServerError;
            }

            // Sets Role
            var role = new UserRole(user,RoleType.Doctor);
            if (!userRoleService.Insert(role))
            {
                return HttpStatusCode.InternalServerError;
            }

            return HttpStatusCode.OK;
        }
        public HttpStatusCode RegisterAdditional(RegistrationAdditionalModel model, int userId)
        {
            const string METHOD_IDENTIFIER = UTILITY_NAME + "RegisterAdditional";

            // Validates Input Data
            var validator = new RegistrationAdditionalModelValidator();
            var errorMsgs = validator.Validate(model);
            if (errorMsgs.Any())
                return HttpStatusCode.BadRequest;

            // Checks if user with id exists
            var user = userService.Get(userId);
            if (user == null)
                return HttpStatusCode.Conflict;

            // Inserts UserJob
            var job = new Job(model, METHOD_IDENTIFIER);
            var jobId = jobService.InsertGetId(job);
            if (jobId <= 0)
                return HttpStatusCode.InternalServerError;

            // Inserts Address
            var address = new Address(model.Address, METHOD_IDENTIFIER);
            var addressId = addressService.InsertGetId(address);
            if (addressId <= 0)
                return HttpStatusCode.InternalServerError;

            // Updates User
            user.University = model.University;
            user.JobId = jobId;
            user.AddressId = addressId;
            if (!userService.Update(user))
                return HttpStatusCode.InternalServerError;


            return HttpStatusCode.OK;
        }
        public HttpStatusCode SendResetPassword(GetStringModel model)
        {
            var validator = new GetStringModelValidator();
            var errorMsgs = validator.Validate(model);
            if (errorMsgs.Any())
            {
                return HttpStatusCode.BadRequest;
            }

            var userAuth = userService.GetUser(model.Data);
            if (userAuth == null || userAuth.Value.Key == null)
            {
                return HttpStatusCode.NotFound;
            }

            var user = userAuth.Value.Key;
            var auth = userAuth.Value.Value;

            Guid guid = Guid.NewGuid();
            auth.PasswordToken = guid.ToString();
            if (!authenticationService.Update(auth))
            {
                return HttpStatusCode.InternalServerError;
            }
            try
            {
                emailService.SendEmail(model.Data, "Recuperação de Senha | FODMAP Project", EmailService.PasswordResetBody(guid.ToString()));
                return HttpStatusCode.OK;
            }
            catch
            {
                return HttpStatusCode.InternalServerError;
            }
        }

        public HttpStatusCode ResetPassword(ResetPasswordModel model)
        {
            var validator = new ResetPasswordModelValidator();
            var errorMsgs = validator.Validate(model);
            if (errorMsgs.Any())
            {
                return HttpStatusCode.BadRequest;
            }

            var auth = authenticationService.GetByPasswordToken(model.PasswordToken);
            if (auth == null)
            {
                return HttpStatusCode.NotAcceptable;
            }

            var salt = passwordService.RandomString();
            var hashedPassword = passwordService.Hash(model.Password, salt);
            auth.Salt = salt;
            auth.Password = hashedPassword;
            auth.PasswordToken = null;
            auth.ModifiedBy = "ResetPassword";

            if (!authenticationService.Update(auth))
                return HttpStatusCode.InternalServerError;


            return HttpStatusCode.OK;
        }


    }
}
