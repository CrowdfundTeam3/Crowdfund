using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrowdFund.Models
{
    public class ProjectWithPictureModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Video { get; set; }
        public string Status { get; set; }
        public decimal Goal { get; set; }
        public decimal CurrentFund { get; set; }
        public int CreatorId { get; set; }
        public int TimesFunded { get; set; }
        public IFormFile Photo { get; set; }
    }
}
