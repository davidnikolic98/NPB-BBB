import React from "react"
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Team from "./Team";
import './Teams.css';

export default function Teams()
{

    const [teams,setTeams] = useState([]);
    const [teams20,setTeams20] = useState([]);
    const [teams19,setTeams19] = useState([]);
    const [teams18,setTeams18] = useState([]);

    useEffect(()=>
    {
        getTeams();
        
    },[] );

    const getTeams = async () =>
    {
        const respone = await fetch('https://localhost:5001/neo4j/getAllTeams');
        const data = await respone.json();
        setTeams(data);
        setSessons(data);
        // setTeams20({...teams20, team2: {
        //     teamName: "data[0].teamName",
        //     season: "data[0].season"
        // }});
        console.log(data);
        //console.log(teams);
        //setTeams20(teams[0]);
        //alert(teams20);
            // if(team.season=='2019')
            // {
            //     let niz = teams19;
            //     niz.push(team);
            //     setTeams19(niz);
            // }
            // if(team.season=='2018')
            // {
            //     let niz = teams18;
            //     niz.push(team);
            //     setTeams18(niz);
            // }
    }; 

    
    function setSessons(data){
        data.forEach(team => {
            if(team.season==2020)
            {
                let niz = teams20;
                niz.push(team);
                setTeams20(niz);
            }
        })
    }
    //         if(team.season==2019)
    //         {
    //             let niz = teams19;
    //             niz.push(team);
    //             setTeams19(niz);
    //         }
    //         if(team.season==2018)
    //         {
    //             let niz = teams18;
    //             niz.push(team);
    //             setTeams18(niz);
    //         }
    //     })
    // };


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
                    </div>
                </div>
            </div>
        </div>           
    )
}

