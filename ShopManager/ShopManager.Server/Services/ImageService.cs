using ShopManager.Server.Images;
using ShopManager.Server.Interfaces;
using System.Reflection;

namespace ShopManager.Server.Services
{
    public class ImageService : IImageService
    {
        private readonly Assembly _imagesDirectory = typeof(ImagesFolderMark).Assembly;

        public async Task Save(IFormFile formFile, Guid id)
        {
            var path = Path.Combine(_imagesDirectory.Location, id + ".webp");
            using var file = File.Create(path);
            await formFile.CopyToAsync(file);
        }

        public async Task<byte[]> Get(Guid id)
        {
            var path = Path.Combine(_imagesDirectory.Location, id + ".webp");
            using var streamReader = File.OpenRead(path);
            var data = new byte[streamReader.Length];

            await streamReader.ReadAsync(data, 0, data.Length);

            return data;
        }
    }
}
