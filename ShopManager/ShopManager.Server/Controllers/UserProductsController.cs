﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Requests;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProductsController : Controller
    {
        private readonly IProductService _productService;

        public UserProductsController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = await _productService.GetPublishedNotSaledAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            return Ok(new UserProductResponse
            {
                Description = product.Description,
                CreationDate = product.CreationDate,
                EditionDate = product.EditionDate,
                Article = product.Article,
                Categories = product.Categories,
                Id = product.Id,
                Images = product.Images,
                Name = product.Name,
                PurchasePrice = product.PurchasePrice,
                SalePrice = product.SalePrice,
            });
        }

        public async Task<IActionResult> Index([FromQuery] UserProductsRequest request)
        {
            var result = (await _productService.GetAllAsync(request));

            var products = result.PageItems.Select(c => new UserProductResponse
            {
                CreationDate = c.CreationDate,
                EditionDate = c.EditionDate,
                Article = c.Article,
                Categories = c.Categories,
                Id = c.Id,
                Images = c.Images,
                Name = c.Name,
                PurchasePrice = c.PurchasePrice,
                SalePrice = c.SalePrice,
            }).ToList();

            return Ok(new PageResponse<UserProductResponse>()
            {
                ItemsCount = result.ItemsCount,
                PageItems = products
            });
        }
    }
}
