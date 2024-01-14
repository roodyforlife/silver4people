using ShopManager.Server.Models;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Requests
{
    public abstract class BaseRequest<T> : ISpecification<T>
    {
        public int Take { get; set; }

        public int Skip { get; set; }

        public string SearchString { get; set; }

        private ISpecification<T> GetPaginationSpecification()
        {
            var paginationSpecification = new PaginationSpecification<T>(Take, Skip);
            return paginationSpecification;
        }

        public abstract ISpecification<T> GetOrderSpecification();
        public abstract ISpecification<T> GetFilterSpecification();

        public IQueryable<T> Specify(IQueryable<T> query)
        {
            return GetFilterSpecification()
                .Specify(GetOrderSpecification()
                    .Specify(GetPaginationSpecification().Specify(query)));
        }

        public OrderType OrderType { get; set; }
    }
}
