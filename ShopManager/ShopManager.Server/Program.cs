using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SharpCraftStudio.Authorization.Services;
using ShopManager.Server;
using ShopManager.Server.Authorization;
using ShopManager.Server.Authorization.Interfaces;
using ShopManager.Server.Authorization.Services;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Repositories;
using ShopManager.Server.Services;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddDbContext<AppDbContext>(options =>
               options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

services.AddIdentity<Admin, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

var jwtOptions = new JwtOptions();
builder.Configuration.GetSection(JwtOptions.Jwt).Bind(jwtOptions);

services.AddScoped<ICategoryRepository, CategoryRepository>();
services.AddScoped<IProductRepository, ProductRepository>();
services.AddScoped<ISiteRepository, SiteRepository>();
services.AddScoped<ISiteService, SiteService>();
services.AddScoped<ISignInService, SignInService>();
services.AddScoped<IJwtService, JwtService>();
services.AddScoped<ICategoryService, CategoryService>();
services.AddScoped<IProductService, ProductService>();
services.AddSingleton<IImageService, ImageService>();
services.AddSingleton(jwtOptions);

services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
                      policy =>
                      {
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                          policy.SetIsOriginAllowed((host) => true);
                      });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("_myAllowSpecificOrigins");
app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
