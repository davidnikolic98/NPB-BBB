import React from "react";
import { useEffect, useState } from "react";
import { useParams,Link} from "react-router-dom";
import "./Team.css";

export default function Players()
{
    const [players,setPlayers] = useState([]);
    const [sort,setSort] = useState("PER");

    useEffect(()=>
    {
        getPlayers();
        
    },[sort] );

    const getPlayers = async () =>
    {
        console.log(sort);
        const respone = await fetch('https://localhost:5001/neo4j/getAllPlayers/'+sort);
        const data = await respone.json();
        setPlayers(data);
    }

    const handleSort = (arg) =>
    {
        setSort(arg);
    }

    return(
        <div>
            <table>
                <caption>Players with biggest PER last 3 seasons</caption>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('Name')}>
                            Player name
                        </th>
                        <th onClick={() => handleSort('PER')}>
                            PER
                        </th>
                        <th onClick={() => handleSort('PPG')}>
                            PPG
                        </th>
                        <th onClick={() => handleSort('APG')}>
                            APG
                        </th>
                        <th onClick={() => handleSort('RPG')}>
                            RPG
                        </th>
                        <th onClick={() => handleSort('BLK')}>
                            BLK
                        </th>
                        <th onClick={() => handleSort('STL')}>
                            STL
                        </th>
                        <th onClick={() => handleSort('FGpct')}>
                            FG%
                        </th>
                        <th onClick={() => handleSort('FTpct')}>
                            FT%
                        </th>
                        <th onClick={() => handleSort('TPpct')}>
                            TP%
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
                                {player.per}
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
                            
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>           
    )
}