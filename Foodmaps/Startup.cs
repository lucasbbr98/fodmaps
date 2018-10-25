using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StructureMap;
using System;
using Amazon.S3;
using Microsoft.AspNetCore.Rewrite;
using System.Text;

namespace Foodmaps
{
    using Foodmaps.Setup;
    using Jwt;
    using Microsoft.AspNetCore.ResponseCompression;
    using Microsoft.AspNetCore.Rewrite;

    public class Startup
    {
        public IConfigurationRoot Configuration;

        public Startup(IHostingEnvironment env)
        {
            var fp = new PhysicalFileProvider(AppContext.BaseDirectory);

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile(fp, "appsettings.json", optional: false, reloadOnChange: true)
                .AddXmlFile(fp, "SqlQueries.xml", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opts =>
                {
                    opts.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Tokens:Issuer"],
                        ValidAudience = Configuration["Tokens:Issuer"],
                        IssuerSigningKey = JwtSecurityKey.Create(Configuration["Tokens:Key"])
                    };
                });

            services.AddMvc();
            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = System.IO.Compression.CompressionLevel.Optimal);
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
            });
            var setup = new FoodmapsSetup()
                .Configure(c =>
                {
                    c.For<IConfigurationRoot>().Use(t => Configuration);
                });

            setup.Container.Populate(services);
            return setup.Container.GetInstance<IServiceProvider>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseResponseCompression();
            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseStaticFiles(new StaticFileOptions
                {
                    OnPrepareResponse = ctx =>
                    {
                        ctx.Context.Response.Headers.Add("Cache-Control", "public, max-age=600");
                    }
                });
            }
            else
            {
                var options = new RewriteOptions()
        .AddRedirectToProxiedHttps();
                app.UseRewriter(options);
                app.UseExceptionHandler("/error");
                app.UseStaticFiles();
            }
            
            app.UseMvcWithDefaultRoute();

            app.UseMvc(r =>
            {
                r.MapRoute("default", "{*catchall}", new { controller = "Home", action = "Index" });
            });
        }
    }
}

public static class RedirectToProxiedHttpsExtensions
{
    public static RewriteOptions AddRedirectToProxiedHttps(this RewriteOptions options)
    {
        options.Rules.Add(new RedirectToProxiedHttpsRule());
        return options;
    }
}

public class RedirectToProxiedHttpsRule : IRule
{
    public virtual void ApplyRule(RewriteContext context)
    {
        var request = context.HttpContext.Request;

        // #1) Did this request start off as HTTP?
        string reqProtocol;
        if (request.Headers.ContainsKey("X-Forwarded-Proto"))
        {
            reqProtocol = request.Headers["X-Forwarded-Proto"][0];
        }
        else
        {
            reqProtocol = (request.IsHttps ? "https" : "http");
        }


        // #2) If so, redirect to HTTPS equivalent
        if (reqProtocol != "https")
        {
            var newUrl = new StringBuilder()
                .Append("https://").Append(request.Host)
                .Append(request.PathBase).Append(request.Path)
                .Append(request.QueryString);

            context.HttpContext.Response.Redirect(newUrl.ToString(), true);
        }
    }
}
