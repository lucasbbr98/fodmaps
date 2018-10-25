using System;

namespace Foodmaps.Models
{
	public class Image : IEntity
	{
        //https://s3-sa-east-1.amazonaws.com/agregauni/images/users/b76606b5-ace5-47ff-bb59-7009fb69816e.png

        public int Id { get; set; }
		public byte[] Content { get; set; }
		public string MimeType { get; set; }
        public string Key { get; set; }
		public DateTime CreatedOn { get; set; }
		public string CreatedBy { get; set; }
		public DateTime ModifiedOn { get; set; }
		public string ModifiedBy { get; set; }
		public DateTime? ObsoletedOn { get; set; }
		public string ObsoletedBy { get; set; }
	    public string Link() => "https://s3-sa-east-1.amazonaws.com/agregauni/" + Key;
		public override string ToString() => "images";

	    public string GetExtension()
	    {
	        var ex = "";
	        if (this.MimeType == "image/png")
	        {
	            ex = ".png";
	        }
	        if (this.MimeType == "image/jpeg")
	        {
	            ex = ".jpeg";
	        }
	        if (this.MimeType == "image/jpg")
	        {
	            ex = ".jpg";
	        }

            return ex;
	    }

	    public Image(){ }
	    
	}

    public class AngularImage
    {
        public string Link { get; set; }
        public string Base64String { get; set; }
        public string MimeType { get; set; }

        public AngularImage() { }

        public AngularImage(Image i)
        {
            this.MimeType = i.MimeType;
            if (i.Content != null)
            {
                this.Base64String = System.Text.Encoding.ASCII.GetString(i.Content);
            }
            else
            {
                this.Link = i.Link();
            }
        }
    }

    public class AmazonS3Link
    {
        public string Base = "https://s3-sa-east-1.amazonaws.com";
        public string Bucket = "agregauni";
        public string Subfolder { get; set; }
        public string MimeType { get; set; }
        public string Guid = System.Guid.NewGuid().ToString();

        public AmazonS3Link(Image i, string subfolder)
        {
            this.Subfolder = subfolder;

            if (i.MimeType == "image/png")
            {
                this.MimeType = ".png";
                return;
            }

            if (i.MimeType == "image/jpeg")
            {
                this.MimeType = ".jpeg";
            }

            if (i.MimeType == "image/jpg")
            {
                this.MimeType = ".jpg";
            }
        }
        
        // This is to use on short
        public string ToStringShort() => $"images/{Subfolder}/{Guid}{MimeType}";

        // https://s3-sa-east-1.amazonaws.com/agregauni/images/users/b76606b5-ace5-47ff-bb59-7009fb69816e.png
        public string GenerateLink() => $"{Base}/{Bucket}/images/{Subfolder}/{Guid}{MimeType}";

    }
}