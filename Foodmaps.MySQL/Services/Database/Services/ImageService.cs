using Microsoft.Extensions.Configuration;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;

    public interface IImageService : IQueriable<Image>
    {

    }

    public class ImageService : Queriable<Image>, IImageService
    {
        public ImageService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }
    }
}