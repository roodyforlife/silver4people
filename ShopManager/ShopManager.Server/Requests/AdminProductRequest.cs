using ShopManager.Server.Models;
using ShopManager.Server.Requests.FilterEnums;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Requests
{
    public class AdminProductsRequest : BaseRequest<Product>
    {
        public BoolFilter PublishedFilter { get; set; }

        public int MinPurchasePrice { get; set; }

        public int MaxPurchasePrice { get; set; }

        public int MinSalePrice { get; set; }

        public int MaxSalePrice { get; set; }

        public int[] CategoryIdes { get; set; }

        public int[] SiteIdes { get; set; }

        public OrderField Order { get; set; }


        public override ISpecification<Product> GetFilterSpecification()
        {
            var lowerSearchString = SearchString?.ToLower();
            var search = new FilterSpecification<Product>(product => string.IsNullOrEmpty(lowerSearchString) ||
                product.Name.ToLower().Contains(lowerSearchString) ||
                product.TrackNumber.ToLower().Contains(lowerSearchString) ||
                product.Description.ToLower().Contains(lowerSearchString));

            var filter = new FilterSpecification<Product>(product =>
                product.PurchasePrice >= MinPurchasePrice && product.PurchasePrice <= MaxPurchasePrice &&
                product.SalePrice >= MinSalePrice && product.SalePrice <= MaxSalePrice &&
                (CategoryIdes == null || product.Categories.Any(c => CategoryIdes.Contains(c.Id))) &&
                (SiteIdes == null || product.Sites.Any(c => SiteIdes.Contains(c.Id))));

            var publishedFilter = PublishedFilter == BoolFilter.All ? new FilterSpecification<Product>(_ => true) :
                 PublishedFilter == BoolFilter.True ? new FilterSpecification<Product>(product => product.Published) :
                 new FilterSpecification<Product>(product => !product.Published);

            return new AndSpecification<Product>(publishedFilter, new AndSpecification<Product>(filter, search));
        }

        public override ISpecification<Product> GetOrderSpecification()
        {
            switch (Order)
            {
                case OrderField.SalePrice:
                    return new OrderSpecification<Product, object>(OrderType, product => product.SalePrice);
                case OrderField.Name:
                    return new OrderSpecification<Product, object>(OrderType, product => product.Name);
                case OrderField.PurchasePrice:
                    return new OrderSpecification<Product, object>(OrderType, product => product.PurchasePrice);
            }

            throw new NotImplementedException();
        }

        public enum OrderField
        {
            Name,
            PurchasePrice,
            SalePrice
        }
    }
}
