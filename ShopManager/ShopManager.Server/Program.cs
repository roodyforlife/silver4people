using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ShopManager.Server;
using ShopManager.Server.Authorization;
using ShopManager.Server.Authorization.Interfaces;
using ShopManager.Server.Authorization.Services;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Repositories;
using ShopManager.Server.Services;
using ShopManager.Server.Validators;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
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
services.AddScoped<IUserService, UserService>();
services.AddScoped<AdminRegisterValidator>();
services.AddSingleton<IImageService, ImageService>();
services.AddSingleton(jwtOptions);

services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 1;
});

services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateLifetime = false,
    };
});

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

await InitializeDefaultData(app.Services);

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("_myAllowSpecificOrigins");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


static async Task InitializeDefaultData(IServiceProvider serviceProvider)
{
    using var scope = serviceProvider.CreateScope();
    var adminRegister = scope.ServiceProvider.GetRequiredService<IUserService>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var adminName = "admin";
    var adminPassword = "123456";


    if (!await roleManager.RoleExistsAsync(Roles.Admin))
    {
        await roleManager.CreateAsync(new IdentityRole(Roles.Admin));
    }

    if (!await roleManager.RoleExistsAsync(Roles.Manager))
    {
        await roleManager.CreateAsync(new IdentityRole(Roles.Manager));
    }

    await adminRegister.RegisterManager(new ShopManager.Server.Dto.UserRegisterDto()
    {
        ConfirmPassword = adminPassword,
        Login = adminName,
        Password = adminPassword
    });
};