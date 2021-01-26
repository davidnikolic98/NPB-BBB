import React from "react"
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Team from "./Team";

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
        data.forEach(team => {
            if(team.season=='2020')
            {
                let niz = teams20;
                niz.push(team);
                setTeams20(niz);
            }
            if(team.season=='2019')
            {
                let niz = teams19;
                niz.push(team);
                setTeams19(niz);
            }
            if(team.season=='2018')
            {
                let niz = teams18;
                niz.push(team);
                setTeams18(niz);
            }
        });
        /*
        data.forEach(team => {
            if(team.season=='2020')
            {
                var niz = teams20;
                niz.push(team);
                setTeams20(team);
            }});
            */
        console.log(teams);
    }; 

    return(
        <div>
            <ul>
            {teams?.map(team=>(
               <li>
                 <Link  to={`/team/${team.teamName}`}>
                    {team.teamName}
                 </Link>
               </li>
            ))}
            </ul>
        </div>
    )
}

