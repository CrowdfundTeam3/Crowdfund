namespace CrowdfundCORE.Options
{
    public class ProjectOptions
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Photo { get; set; }
        public string Video { get; set; }
        public decimal GoalFund { get; set; }
        public decimal TotalFund { get; set; }
    }
}
