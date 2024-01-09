using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Models;
using System.Security.Principal;
using System;

namespace ShopManager.Server
{
    public class AppDbContext : IdentityDbContext<Admin>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<DeliveryState> DeliveryStates { get; set;}

        public DbSet<Image> Images { get; set; }

        public DbSet<BinaryContent> BinaryContent { get; set; }
    }
}
