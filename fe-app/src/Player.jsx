import React from "react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Player.css";

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
        <div className="div-player">
        <div className="player-image-name">
            <img src={"../Image/Players/"+player.name?.split('2')[0]+'.png'}/>
            <div>{player.name?.split('2')?.[0]}<br/>{"2"+player.name?.split('2')?.[1]}{player.name?.split('2')[2]?"2"+player.name.split('2')[2]:""}</div>
        </div>
        <div className="player-statistics">
            <table>
                <tr>
                    <th>
                        PPG<br/><br/>{player.ppg}
                    </th>
                    <th>
                        APG<br/><br/>{player.apg}
                    </th>
                    <th>
                        RPG<br/><br/>{player.rpg}
                    </th>
                    <th>
                        BLK<br/><br/>{player.blk}
                    </th>
                    <th>
                        STL<br/><br/>{player.stl}
                    </th>
                    <th>
                        FG%<br/><br/>{player.fGpct}
                    </th>
                    <th>
                        FT%<br/><br/>{player.fTpct}
                    </th>
                    <th>
                        TP%<br/><br/>{player.tPpct}
                    </th>
                    <th>
                        PER<br/><br/>{player.per}
                    </th>
                </tr>
            </table>
        </div>
        
    </div>
    )
}