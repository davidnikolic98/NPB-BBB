import React from "react";
import { useEffect, useState } from "react";
import { useParams,Link} from "react-router-dom";
import "./Team.css";


export default function Home()
{

    const [teams20,setTeams20] = useState([]);
    const [teams19,setTeams19] = useState([]);
    const [teams18,setTeams18] = useState([]);

    useEffect(()=>
    {
        getTeam();
    },[] );

    const getTeam = async () =>
    {
        const respone20 = await fetch('https://localhost:5001/neo4j/getWinrate/2020');
        const data20 = await respone20.json();
        setTeams20(data20);

        const respone19 = await fetch('https://localhost:5001/neo4j/getWinrate/2019');
        const data19 = await respone19.json();
        setTeams19(data19);

        const respone18 = await fetch('https://localhost:5001/neo4j/getWinrate/2018');
        const data18 = await respone18.json();
        setTeams18(data18);

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
                    {teams20?.map(team=>(
                        <tr key={team.name}>
                            <td>
                                <Link to={`/team/${team.teamName}`}>
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
                    {teams19?.map(team=>(
                        <tr key={team.name}>
                            <td>
                                <Link to={`/team/${team.teamName}`}>
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