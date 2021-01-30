import React from "react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlayerCard.css";

export default function PlayerCard({playerName,image,teamLogo})
{
    return(
    <>
    <div className="player-card">
        
        <img id="player-image" src={image}/>
        <div className="player-name">
            <img id="player-team-logo" src={teamLogo}/>
            {playerName} 
        </div>
    </div>
    </>
    );
}