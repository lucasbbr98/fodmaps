using System;
using System.Net;
using Foodmaps.Models;
using Amazon.S3;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Foodmaps.Web.Controllers.Api.Version1
{
    using Services.Images;

    public class ImageController : BaseController
    {
        private IImageUtility imageService;
        private IAmazonS3 amazonClient;

        public ImageController(IImageUtility imageService, IAmazonS3 amazonClient)
        {
            this.imageService = imageService;
            this.amazonClient = amazonClient;
        }

        [HttpGet("{id}"), AllowAnonymous]
        public IActionResult Get(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return StatusCode((int)HttpStatusCode.PreconditionFailed);
                }

                var imageRequest = imageService.Get(id, out AngularImage image);
                if (imageRequest != HttpStatusCode.OK)
                {
                    return StatusCode((int)imageRequest);
                }

                if (image == null)
                {
                    return StatusCode((int) HttpStatusCode.NotFound);
                }

                return Ok(new
                {
                    Link = image.Link,
                    Base64String = image.Base64String,
                    MimeType = image.MimeType
                });
            }
            catch (Exception ex)
            {
                //Log EX somewhere.
                return StatusCode(500, new
                {
                    Message = ex.ToString()
                });
            }
        }

    }
}