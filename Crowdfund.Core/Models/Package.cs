namespace CrowdfundCORE.Models
{
    public class Package
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public string Reward { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}