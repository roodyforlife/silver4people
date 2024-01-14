namespace ShopManager.Server.Requests
{
    public interface IPageRequest<T>
    {
        Task<PageResponse<T>> Execute(IQueryable<T> query);
    }
}
