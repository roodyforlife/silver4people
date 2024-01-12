namespace ShopManager.Server.Interfaces
{
    public interface IImageService
    {
        Task Save(IFormFile formFile, Guid id);

        Task<byte[]> Get(Guid id);
    }
}
