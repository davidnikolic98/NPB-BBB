import React from "react";
import { useEffect, useState } from "react";
import { useParams,Link} from "react-router-dom";
import "./Team.css";


export default function Home()
{

    const [teams,setTeams] = useState([]);


    useEffect(()=>
    {
        getTeam();
    },[] );

    const getTeam = async () =>
    {
        const respone = await fetch('https://localhost:5001/neo4j/getWinrate/2020');
        const data = await respone.json();
        setTeams(data);

        console.log(data);
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Team
                        </th>
                        <th>
                            Total games
                        </th>
                        <th>
                            Total win
                        </th>
                        <th>
                            Total loss
                        </th>
                        <th>
                            Win percetage
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {teams?.map(team=>(
                        <tr key={team.name}>
                            <td>
                                <Link to={`/team/${team.name}`}>
                                    {team.teamName}
                                </Link>
                            </td>
                            <td>
                                {team.total}
                            </td>
                            <td>
                                {team.totaL_WIN}
                            </td>
                            <td>
                                {team.totaL_LOSS}
                            </td>
                            <td>
                                {team.wiN_PERCENTAGE}
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    )
}