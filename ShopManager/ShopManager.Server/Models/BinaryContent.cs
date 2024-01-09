using System.ComponentModel.DataAnnotations;

namespace ShopManager.Server.Models
{
    public class BinaryContent
    {
        [Key]
        public Guid Id { get; set; }

        public byte[] Content { get; set; }
    }
}
