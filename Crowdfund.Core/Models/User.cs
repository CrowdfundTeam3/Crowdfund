using System.Collections.Generic;

namespace Crowdfund.Core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }


        public List<Project> CreatedProjects { get; set; }
        public List<Funding> Fundings { get; set; }

        public User()
        {
            CreatedProjects = new List<Project>();
            Fundings = new List<Funding>();
        }
    }
}
