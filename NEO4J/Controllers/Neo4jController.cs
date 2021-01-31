using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore;
using Microsoft.Extensions;
using Neo4jClient;
using Neo4jClient.Cypher;
using System.Text;
using Neo4j.Driver;

namespace NEO4J.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Neo4jController : ControllerBase
    {
        private readonly ILogger<Neo4jController> _logger;
        public BoltGraphClient bgc;
        public IDriver driver;
        public Neo4jController(ILogger<Neo4jController> logger)
        {
            _logger = logger;
            var user = "neo4j";
            var pass = "admin";
            var uri = new Uri("http://localhost:7474/db/data");

            driver = GraphDatabase.Driver("bolt://localhost:7687", AuthTokens.Basic("neo4j", "admin"));

            //Pass that driver to the BoltGraphClient
            bgc = new BoltGraphClient(driver);

            //Connect.
            bgc.ConnectAsync().Wait();
        }

        [HttpGet]
        [Route("getAllPlayers/{sort}")]
        public async Task<IActionResult> GetAllTeams(string sort)
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync(
                        "match (p:Player) return p.Name,p.PER,p.PPG,p.APG,p.RPG,p.BLK,p.STL,p.FGpct,p.TPpct,p.FTpct ORDER BY p." + sort + " DESC").Result.ToListAsync();
            var temp = new List<Object>();
            for (int i = 0; i < data.Count; i++)
            {
                var result = new
                {
                    Name = data[i].Values["p.Name"].As<string>(),
                    PER = data[i].Values["p.PER"].As<double>(),
                    APG = data[i].Values["p.APG"].As<double>(),
                    PPG = data[i].Values["p.PPG"].As<double>(),
                    RPG = data[i].Values["p.RPG"].As<double>(),
                    STL = data[i].Values["p.STL"].As<double>(),
                    BLK = data[i].Values["p.BLK"].As<double>(),
                    FGpct = data[i].Values["p.FGpct"].As<double>(),
                    TPpct = data[i].Values["p.TPpct"].As<double>(),
                    FTpct = data[i].Values["p.FTpct"].As<double>()
                };
                temp.Add(result);
            }
            return Ok(temp);
        }
        [HttpGet]
        [Route("getPlayerByName/{playerName}")]
        public  async Task<IActionResult> GetPlayerByName([FromRoute(Name = "playerName")] string playerName)
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync(
                        "match (p:Player{Name:\"" + playerName + "\"}) return p.Name,p.PER,p.PPG,p.APG,p.RPG,p.BLK,p.STL,p.FGpct,p.TPpct,p.FTpct").Result.ToListAsync();
            Player p = new Player()
            {
                Name = data[0].Values["p.Name"].As<string>(),
                PER = data[0].Values["p.PER"].As<double>(),
                APG = data[0].Values["p.APG"].As<double>(),
                PPG = data[0].Values["p.PPG"].As<double>(),
                RPG = data[0].Values["p.RPG"].As<double>(),
                STL = data[0].Values["p.STL"].As<double>(),
                BLK = data[0].Values["p.BLK"].As<double>(),
                FGpct = data[0].Values["p.FGpct"].As<double>(),
                TPpct = data[0].Values["p.TPpct"].As<double>(),
                FTpct = data[0].Values["p.FTpct"].As<double>()

            };
            return Ok(p);
        }
        [HttpGet]
        [Route("getAllTeams/{season}")]
        public async Task<IActionResult> GetAllPlayers(string season)
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync(
                        "match (t:Team{Season:\"" + season + "\"}) return t.Name,t.Season ORDER BY t.Season DESC").Result.ToListAsync();
            var temp = new List<Object>();
            for (int i = 0; i < data.Count; i++)
            {
                var result = new
                {
                    TeamName = data[i].Values["t.Name"].As<string>(),
                    Season = data[i].Values["t.Season"].As<int>(),
                };
                temp.Add(result);
            }
            return Ok(temp);
        }
        [Route("getTeamAndItsPlayersByName/{teamName}")]
        public async Task<IActionResult> GetTeamAndItsPlayersByName([FromRoute(Name = "teamName")] string teamName)
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));

            var data = await session.RunAsync(
                        "match (t:Team{Name:\"" + teamName + "\"})<-[r:PLAYED_FOR]-(p) return t.Name,p.Name,p.PER,p.PPG,p.APG,p.RPG,p.BLK,p.STL,p.FGpct,p.TPpct,p.FTpct").Result.ToListAsync();
            Team t = new Team()
            {
                Name = data[0].Values["t.Name"].As<string>(),
            };
            t.Players = new List<Player>();
           for(int i=0;i<data.Count; i++)
            {
                Player p = new Player()
                {
                    Name = data[i].Values["p.Name"].As<string>(),
                    PER = data[i].Values["p.PER"].As<double>(),
                    APG = data[i].Values["p.APG"].As<double>(),
                    PPG = data[i].Values["p.PPG"].As<double>(),
                    RPG = data[i].Values["p.RPG"].As<double>(),
                    STL = data[i].Values["p.STL"].As<double>(),
                    BLK = data[i].Values["p.BLK"].As<double>(),
                    FGpct = data[i].Values["p.FGpct"].As<double>(),
                    TPpct = data[i].Values["p.TPpct"].As<double>(),
                    FTpct = data[i].Values["p.FTpct"].As<double>()

                };
                t.Players.Add(p);
            }

       
            return Ok(t);
        }
        [HttpGet]
        [Route("getWinrate/{season}")]
        public async Task<IActionResult> GetWinrate(string season)
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync("MATCH (t:Team{Season:\"" + season + "\"})-[w:PLAYED_IN]->(g:Game)" +
                " RETURN t.Name AS TEAM,t.Season AS SEASON, COUNT(w.Differential) AS TOTAL, SUM(CASE WHEN w.Differential > 0 then 1 else 0 END)" +
                " AS TOTAL_WIN, COUNT(w.Differential)-SUM(CASE WHEN w.Differential > 0 then 1 else 0 END) AS TOTAL_LOSS," +
                " round( (toFloat(SUM( CASE WHEN w.Differential > 0 then 1 else 0 END))/ COUNT(w.Differential))*100,2) as WIN_PERCENTAGE ORDER BY t.Season DESC,WIN_PERCENTAGE DESC").Result.ToListAsync();
            var temp= new List<Object>();
            for (int i = 0; i < data.Count; i++)
            {
                var result = new
                {
                    TeamName = data[i].Values["TEAM"].As<string>(),
                    TOTAL = data[i].Values["TOTAL"].As<int>(),
                    TOTAL_WIN = data[i].Values["TOTAL_WIN"].As<int>(),
                    TOTAL_LOSS = data[i].Values["TOTAL_LOSS"].As<double>(),
                    WIN_PERCENTAGE = data[i].Values["WIN_PERCENTAGE"].As<double>()
                };
                temp.Add(result);
            }
            return Ok(temp);
        }
        [HttpPost]
        [Route("Chemistry/{playerName1}/{playerName2}")]
        public async Task<IActionResult> Chemistry([FromRoute(Name = "playerName1")] string playerName1, [FromRoute(Name = "playerName2")] string playerName2)
        {
            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync("MATCH(p1: Player{Name:\"" + playerName1 + "\"})-[u1:USED_IN]->(f1:Fantasy)," +
                "(p2: Player{Name:\"" + playerName2 + "\"})-[u2:USED_IN]->(f2:Fantasy)" +
                "MERGE (f1)-[c: CHEMISTRY]->(f2) ON CREATE SET c.Strength = round(p2.PER * 1.5 + p2.APG * 2.66,2) ON MATCH SET c.Strength= round(p2.PER * 1.5 + p2.APG * 2.66,2) return f1.Name as Name1,c.Strength as Strength,f2.Name as Name2").Result.ToListAsync();
            return Ok(data);
        }
        [HttpPost]
        [Route("CreateFantasyTeam")]
        public async Task<IActionResult> CreateFantasyTeam([FromBody] FTeam t)
        {
            var data = new List<Neo4j.Driver.IRecord>();
            double rating = 0;
            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            for (int i = 0; i < t.Players.Count; i++)
            {
                for (int j = 0; j < t.Players.Count; j++)
                {
                    if (i != j)
                    {
                        data = await session.RunAsync("MATCH(p1: Player{Name:\"" + t.Players[i] + "\"})-[u1:USED_IN]->(f1:Fantasy)," +
                       "(p2: Player{Name:\"" + t.Players[j] + "\"})-[u2:USED_IN]->(f2:Fantasy)" +
                       "MERGE (f1)-[c: CHEMISTRY]->(f2) ON CREATE SET c.Strength = round(p2.PER * 1.5 + p2.APG * 2.66,2) ON MATCH SET c.Strength= round(p2.PER * 1.5 + p2.APG * 2.66,2) return f1.Name as Name1,c.Strength as Strength,f2.Name as Name2").Result.ToListAsync();
                        rating += data[0].Values["Strength"].As<double>();

                        data = await session.RunAsync("MATCH(p1: Player{Name:\"" + t.Players[i] + "\"})-[r1:PLAYED_FOR]->(t1:Team)-[w:PLAYED_IN]->(g:Game)," +
                       "(p2: Player{Name:\"" + t.Players[j] + "\"})-[r2:PLAYED_FOR]->(t2:Team)" +
                       "return CASE WHEN t1.Name = t2.Name then" +
                       "(round((toFloat(SUM(CASE WHEN w.Differential > 0 then 1 else 0 END))/ COUNT(w.Differential))*100,2))"+
                       "WHEN t1.Name<> t2.Name then 0 END AS WIN_PERCENTAGE").Result.ToListAsync();
                        double tmp = data[0].Values["WIN_PERCENTAGE"].As<double>();
                        if (tmp < 50)
                            rating -= tmp;
                        else rating += tmp;

                    }
                }
            }

            data = await session.RunAsync("CREATE (f: FTeam{Name:\"" + t.Name + "\",Creator:\"" + t.Creator + "\",Rating:" + rating + "," +
                "PG:\"" + t.Players[0]+ "\"," +
                "SG:\"" + t.Players[1] + "\"," +
                "SF:\"" + t.Players[2] + "\"," +
                "PF:\"" + t.Players[3] + "\"," +
                "C:\"" + t.Players[4] + "\"})" +
                "return f").Result.ToListAsync();

            return Ok();
        }
        [HttpGet]
        [Route("getAllFTeams")]
        public async Task<IActionResult> GetAllFTeams()
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync(
                        "match (t:FTeam) return t.Name,t.Creator,t.Rating,t.PG,t.SG,t.SF,t.PF,t.C ORDER BY t.Rating DESC").Result.ToListAsync();
            var temp = new List<FTeam>();
            for (int i = 0; i < data.Count; i++)
            {
                var result = new FTeam()
                {
                    Name = data[i].Values["t.Name"].As<string>(),
                    Creator = data[i].Values["t.Creator"].As<string>(),
                    Rating = data[i].Values["t.Rating"].As<double>(),
                    PG = data[i].Values["t.PG"].As<string>(),
                    SG = data[i].Values["t.SG"].As<string>(),
                    SF = data[i].Values["t.SF"].As<string>(),
                    PF = data[i].Values["t.PF"].As<string>(),
                    C = data[i].Values["t.C"].As<string>(),
                    Players = new List<String>()
                };
                result.Players.Add(result.PG);
                result.Players.Add(result.SG);
                result.Players.Add(result.SF);
                result.Players.Add(result.PF);
                result.Players.Add(result.C);
                temp.Add(result);
            }
            return Ok(temp);
        }
    }
}
