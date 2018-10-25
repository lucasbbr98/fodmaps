namespace Foodmaps.Models.ViewModels
{
    public interface IExampleViewModel
    {
        User User { get; }
        UserRole Role { get; }

    }

    public class ExampleViewModel : IExampleViewModel
    {
        public User User { get; set; }

        public UserRole Role { get; set; }

        public ExampleViewModel() { }

    }
}
