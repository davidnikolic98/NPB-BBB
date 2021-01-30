import React from "react"
import { useEffect, useState } from "react";
import { useParams,Link} from "react-router-dom";
import "./Team.css";
import PlayerCard from "./PlayerCard";
import ReactSlidy from 'react-slidy'
import 'react-slidy/lib/styles.css'
import SliderPlayers from "./SliderPlayer";
import Players from "./Players";

export default function Team()
{

    const [tim,setTim] = useState([]);
    const [players,setPlayers] = useState([])
    const [name,setName] = useState();
    const {teamName} = useParams();
    const [srcLogo,setSrcLogo] = useState("../Image/");
    const [srcPlayerImage,setPlayerImage] = useState("./Image/Players/");


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
        setSrcLogo(srcLogo + teamName.split('2')[0]+".png");

        console.log(data);
    }

    const { items } = players;
    console.log(items);

    return(
        <div className="div-team" >
 
            <div className="team">
                <div className="team-logo-info">
                    <img src={srcLogo} className="team-logo"/>
                    <h1>{tim.name}</h1>

                </div>
                <div className="team-players">
                    <div className="players">
                    <div id="label">Players in the {"2"+teamName.split('2')?.[1]}{teamName.split('2')[2]?"2"+teamName.split('2')[2]:""} season</div>
                    <ReactSlidy numOfSlides={3}>
                        <PlayerCard playerName={players[0]?.name.split('2')[0]} image={"../Image/Players/"+players[0]?.name.split('2')[0]+'.png'} teamLogo={srcLogo}/>
                        <PlayerCard playerName={players[1]?.name.split('2')[0]} image={"../Image/Players/"+players[1]?.name.split('2')[0]+'.png'} teamLogo={srcLogo}/>
                        <PlayerCard playerName={players[2]?.name.split('2')[0]} image={"../Image/Players/"+players[2]?.name.split('2')[0]+'.png'} teamLogo={srcLogo}/>
                        <PlayerCard playerName={players[3]?.name.split('2')[0]} image={"../Image/Players/"+players[3]?.name.split('2')[0]+'.png'} teamLogo={srcLogo}/>
                        <PlayerCard playerName={players[4]?.name.split('2')[0]} image={"../Image/Players/"+players[4]?.name.split('2')[0]+'.png'} teamLogo={srcLogo}/>
                    </ReactSlidy>
                    </div>
                    <div className="players-stat">
                    <div id="label">Player statistics</div>
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
                </div>
                
                
            </div>
              
        </div>
    )
}