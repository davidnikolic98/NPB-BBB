import React from "react"
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Team from "./Team";
import './Teams.css';

export default function Teams()
{

    const [teams20,setTeams20] = useState([]);
    const [teams19,setTeams19] = useState([]);
    const [teams18,setTeams18] = useState([]);

    useEffect(()=>
    {
        getTeams();
        
    },[] );

    const getTeams = async () =>
    {
        const respone20 = await fetch('https://localhost:5001/neo4j/getAllTeams/2020');
        const data20 = await respone20.json();
        setTeams20(data20);

        const respone19 = await fetch('https://localhost:5001/neo4j/getAllTeams/2019');
        const data19 = await respone19.json();
        setTeams19(data19);

        const respone18 = await fetch('https://localhost:5001/neo4j/getAllTeams/2018');
        const data18 = await respone18.json();
        setTeams18(data18);

    }; 



    return(
        <div>
            <div className="div-teams">
               <div className="all-teams">
                    
                    <div id="label">All teams</div>
                    <div className="teams-by-seasons">
                         <div className="teams-by-season">
                             Season 2020
                             {teams20?.map(team=>(
                                <div className="team-card-in-teams">
                                 <img className="team-logo-in-teams" src={"../Image/"+team.teamName?.split('2')[0]+".png"}/>
                                 <Link  to={`/team/${team.teamName}`}>
                                 {team.teamName}
                                 </Link><br/>
                                 </div>
                            ))}
                        </div>
                        <div className="teams-by-season">
                             Season 2019
                             {teams19?.map(team=>(
                                <div className="team-card-in-teams">
                                 <img className="team-logo-in-teams" src={"../Image/"+team.teamName?.split('2')[0]+".png"}/>
                                 <Link  to={`/team/${team.teamName}`}>
                                 {team.teamName}
                                 </Link><br/>
                                 </div>
                            ))}
                        </div>
                        <div className="teams-by-season">
                             Season 2018
                             {teams18?.map(team=>(
                                <div className="team-card-in-teams">
                                 <img className="team-logo-in-teams" src={"../Image/"+team.teamName?.split('2')[0]+".png"}/>
                                 <Link  to={`/team/${team.teamName}`}>
                                 {team.teamName}
                                 </Link><br/>
                                 </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>           
    )
}

