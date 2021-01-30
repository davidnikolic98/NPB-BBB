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
        [Route("getAllTeams")]
        public async Task<IActionResult> GetAllPlayers()
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync(
                        "match (t:Team) return t.Name,t.Season ORDER BY t.Season DESC").Result.ToListAsync();
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
        public async Task<IActionResult> GetWinrate(string sesason)
        {

            IAsyncSession session = driver.AsyncSession(o => o.WithDatabase("nbp"));
            var data = await session.RunAsync("MATCH (t:Team{Season:\"" + "2020" + "\"})-[w:PLAYED_IN]->(g:Game)" +
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
            var data = await session.RunAsync("MATCH(p1: Player{Name:\"" + playerName1 + "\"}),(p2: Player{Name:\"" + playerName2 + "\"})" +
                " WHERE p1.Name<> p2.Name MERGE (p1)-[c: CHEMISTRY{ Strength: round(p2.PER * 1.5 + p2.APG * 2.66,2)}]->(p2) return p1.Name,c.Strength,p2.Name").Result.ToListAsync();
            return Ok(data);
        }
    }
}
