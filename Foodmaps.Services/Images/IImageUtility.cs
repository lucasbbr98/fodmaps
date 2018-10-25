using System.Net;
using System.Threading.Tasks;
using Foodmaps.Models;
using Amazon.S3;

namespace Foodmaps.Services.Images
{
    public interface IImageUtility
    {
        HttpStatusCode Get(int id, out AngularImage img);
        Task<int> SendToS3(Image image, IAmazonS3 client);
    }

}
