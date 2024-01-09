namespace ShopManager.Server.Models
{
    public struct ProductSaleInfo
    {
        public int PurchasePrice { get;set; }

        public int SalePrice { get;set; }

        public string TrackNumber { get; set; }

        public DeliveryState DeliveryState { get; set; }
    }
}
