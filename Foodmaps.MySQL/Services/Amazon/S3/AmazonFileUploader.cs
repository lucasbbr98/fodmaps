using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Foodmaps.Models;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;

namespace Foodmaps.MySQL.Services.Amazon.S3
{
    public class AmazonFileUploader
    {
        private readonly IAmazonS3 Client;
        public AmazonFileUploader(IAmazonS3 client)
        {
            this.Client = client;
        }

        public async Task<bool> UploadImage(Image image, AmazonS3Link link)
        {
            if (!await CheckOldImage(image, link))
            {
                return false;
            }

            var request = new PutObjectRequest
            {
                BucketName = link.Bucket,
                Key = $"{link.ToStringShort()}",
                InputStream = new MemoryStream(image.Content),
                CannedACL = S3CannedACL.PublicRead,
                
                Headers =
                {
                    ContentType = image.MimeType,
                    ContentLength = image.Content.Length                   
                }
               
            };

            var response = await Client.PutObjectAsync(request);

            if (response.HttpStatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            return true;
        }

        private async Task<bool> CheckOldImage(Image img, AmazonS3Link link)
        {
            if (img.Id <= 0)
            {
                return true;
            }

            DeleteObjectRequest request = new DeleteObjectRequest
            {
                BucketName = "agregauni",
                Key = img.Key
            };

            var response = await Client.DeleteObjectAsync(request);
            if (response.HttpStatusCode != HttpStatusCode.NoContent)
            {
                return false;
            }

            return true;
        }
    }
}
