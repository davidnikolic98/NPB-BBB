using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NEO4J
{
    public class Team
    {
        public string Name { get; set; }
        public IList<Player> Players { get; set; }
    }
}
