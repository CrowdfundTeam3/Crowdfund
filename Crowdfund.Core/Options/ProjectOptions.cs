﻿namespace Crowdfund.Core.Options
{
    public class ProjectOptions
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Photo { get; set; }
        public string Video { get; set; }
        public string Status { get; set; }
        public decimal Goal { get; set; }
        public decimal CurrentFund { get; set; }
        public int CreatorId { get; set; }
        public int TimesFunded { get; set; }
    }
}
