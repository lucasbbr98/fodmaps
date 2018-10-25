using Microsoft.AspNetCore.Mvc;

namespace Foodmaps.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
