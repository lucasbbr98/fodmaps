using System.Net;

namespace Foodmaps.Services.Authentication
{
    using Models;
    using Models.RequestModels;

    public interface IAuthenticationUtility
    {
        HttpStatusCode Authenticate(string email, string password, out User user);
        HttpStatusCode Register(RegistrationModel model);
        HttpStatusCode RegisterAdditional(RegistrationAdditionalModel model, int userId);
        HttpStatusCode GetUser(int? userId, out User user);
        HttpStatusCode GetUserByEmail(string email, out User user);
        HttpStatusCode SendResetPassword(GetStringModel model);
    }
}
