import React from "react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Team.css";
import PlayerCard from "./PlayerCard";
import ReactSlidy from 'react-slidy'
import 'react-slidy/lib/styles.css'
export default function SliderPlayers({children}){
    return(
        <>
        <ReactSlidy className="slide" numOfSlides={3}>
            {children}
        </ReactSlidy>
        </>
    );
}