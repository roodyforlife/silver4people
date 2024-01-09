using System.ComponentModel.DataAnnotations;

namespace ShopManager.Server.Models
{
    public class DeliveryState
    {
        [Key]
        public string Name { get; set; }
    }
}
