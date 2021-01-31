using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NEO4J
{
    public class FTeam
    {
        public string Name { get; set; }
        public string Creator { get; set; }
        public string PG { get; set; }
        public string SG { get; set; }
        public string SF { get; set; }
        public string PF { get; set; }
        public string C { get; set; }
        public double Rating { get; set; }
        public IList<String> Players { get; set; }
    }
}
