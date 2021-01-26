import React from "react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

export default function Team()
{

    const [tim,setTim] = useState([]);
    const [players,setPlayers] = useState([])
    const {teamName} = useParams();

    useEffect(()=>
    {
        getTeam();
    },[] );

    const getTeam = async () =>
    {
        const respone = await fetch('https://localhost:5001/neo4j/getTeamAndItsPlayersByName/' + teamName);
        const data = await respone.json();
        setTim(data);
        setPlayers(data.players);
        console.log(data);
    }

    const { items } = players;
    console.log(items);

    return(
        <div>
            <h1>{tim.name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            Player name
                        </th>
                        <th>
                            PointsPer Game
                        </th>
                        <th>
                            APG
                        </th>
                        <th>
                            RPG
                        </th>
                        <th>
                            BLK
                        </th>
                        <th>
                            STL
                        </th>
                        <th>
                            FG%
                        </th>
                        <th>
                            FT%
                        </th>
                        <th>
                            TP%
                        </th>
                        <th>
                            PER
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {players?.map(player=>(
                        <tr key={player.name}>
                            <td>
                                <Link to={`/player/${player.name}`}>
                                    {player.name}
                                </Link>
                            </td>
                            <td>
                                {player.ppg}
                            </td>
                            <td>
                                {player.apg}
                            </td>
                            <td>
                                {player.rpg}
                            </td>
                            <td>
                                {player.blk}
                            </td>
                            <td>
                                {player.stl}
                            </td>
                            <td>
                                {player.fGpct}
                            </td>
                            <td>
                                {player.fTpct}
                            </td>
                            <td>
                                {player.tPpct}
                            </td>
                            <td>
                                {player.per}
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    )
}