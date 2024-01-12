﻿using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Repositories
{
    public class CategoryRepository : BaseRepository<Category, int>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<List<Category>> GetAsync(int[] ides)
        {
            return await _appDbContext.Categories
                .Include(c => c.ParentCategory)
                .Where(c => ides.Any(i => i == c.Id))
                .ToListAsync();
        }

        public override async Task<List<Category>> GetAllAsync()
        {
            return await _appDbContext.Categories
                .Include(c => c.ParentCategory).ToListAsync();
        }

        public override async Task<Category> GetByIdAsync(int id)
        {
            return await _appDbContext.Categories
                .Include(c => c.ParentCategory).FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
