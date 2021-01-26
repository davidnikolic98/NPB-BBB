import React from "react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Player()
{

    const [player,setPlayer] = useState([]);
    const {playerName} = useParams();

    useEffect(()=>
    {
        getPlayer();
    },[] );

    const getPlayer = async () =>
    {
        const respone = await fetch('https://localhost:5001/neo4j/getPlayerByName/' + playerName);
        const data = await respone.json();
        setPlayer(data);
        console.log(data);
    }


    return (
        <div>
            <h1>{player.name}</h1>
            <table>
                <thead>
                    <tr>
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
                        <tr key={player.name}>
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
                </tbody>
            </table>
        </div>
    )
}