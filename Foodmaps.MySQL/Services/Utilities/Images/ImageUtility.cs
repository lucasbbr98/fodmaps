using System.Net;
using System.Threading.Tasks;
using Foodmaps.MySQL.Services.Amazon.S3;
using Foodmaps.MySQL.Services.Database;
using Foodmaps.Services.Images;
using Amazon.S3;

namespace Foodmaps.MySQL.Services.Utilities.Images
{
    using Models;

    public class ImageUtility : IImageUtility
    {
        private IImageService imgService;
        private IUserService userService;
        public ImageUtility(IImageService imgService, IUserService userService)
        {
            this.imgService = imgService;
            this.userService = userService;
        }

        public HttpStatusCode Get(int id, out AngularImage img)
        {
            img = null;
            if (id <= 0)
            {
                return HttpStatusCode.BadRequest;
            }

            var image = imgService.Get(id);
            if (image == null)
            {
                return HttpStatusCode.NotFound;
            }

            img = new AngularImage(image);

            return HttpStatusCode.OK;
        }

        // Amazon S3 Example
        public async Task<int> SendToS3(Image image, IAmazonS3 client)
        {
            var uploader = new AmazonFileUploader(client);

                var link = new AmazonS3Link(image, "organizations");

                if (!await uploader.UploadImage(image, link))
                {
                    return -1;
                }

                image.Key = link.ToStringShort();
                image.Content = null;
                var imageId = imgService.InsertGetId(image);
                if (imageId <= 0)
                {
                    return -1;
                }

            return imageId;
   
        }
    }
}