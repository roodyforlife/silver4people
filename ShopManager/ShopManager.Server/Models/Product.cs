using System.ComponentModel.DataAnnotations;

namespace ShopManager.Server.Models
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        [MaxLength(2000)]
        public string Description { get; set; }

        public string Article { get;set; }

        public bool Published { get; set; }

        public int PurchasePrice { get; set; }

        public int SalePrice { get; set; }

        public string TrackNumber { get; set; }

        public string Location { get; set; }

        public List<Site> Sites { get; set; }

        public List<Image> Images { get; set; }

        public List<Category> Categories { get; set; }
    }
}
