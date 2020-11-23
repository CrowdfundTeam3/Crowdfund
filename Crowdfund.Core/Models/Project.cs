using System;
using System.Collections.Generic;

namespace Crowdfund.Core.Models
{
    public class Project
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
        public int TimesFunded { get; set; }

        public int CreatorId { get; set; }
        public User Creator { get; set; }
        public List<Package> Packages { get; set; }

        public Project()
        {
            Packages = new List<Package>();
            Packages.Add(new Package()
            {
                Price = 5m,
                Reward = "Thanks for supporting our project"
            });
            CurrentFund = 0m;
            TimesFunded = 0;
        }
    }
}
