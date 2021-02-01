import React from "react"
import { useEffect, useState } from "react";
import useAutocomplete from 'use-autocomplete';
import "./Fantasy.css";

export default function Fantasy()
{

    const [pg, setpg] = useState("");
    const [sg, setsg] = useState("");
    const [sf, setsf] = useState("");
    const [pf, setpf] = useState("");
    const [c, setc] = useState("");
    const [teamName, setTeamName] = useState("");
    const [creator, setCreator] = useState("");
    const [players,setPlayers] = useState([]);
    const [teams,setTeams] = useState([]);
    const [pokreni,setPokreni] = useState(false);
    const [allteams,setAllteams] = useState([]);
    const [create,setCreate]=useState(1);


    const updatepg = e => {
        setpg(e.target.value);
    }
    const updatesg = e => {
        setsg(e.target.value);
    }
    const updatesf = e => {
        setsf(e.target.value);
    }
    const updatepf = e => {
        setpf(e.target.value);
    }
    const updatec = e => {
        setc(e.target.value);
    }
    const updateTeamName = e => {
        setTeamName(e.target.value);
    }
    const updateCreator = e => {
        setCreator(e.target.value);
    }

    useEffect(()=>
    {
        getAllTeams();
    },[]);


    const getPlayers = async () =>
    {
        const respone = await fetch('https://localhost:5001/neo4j/getAllPlayers/PER');
        const data = await respone.json();
        data.forEach(player => {
            var niz = players;
            niz.push(player.name);
            setPlayers(niz);
        });
    }

    const createTeam = async(e) =>{

        e.preventDefault();

        console.log(JSON.stringify({"Creator":creator,"Name":teamName,"Players":[pg,sg,sf,pf,c]}));
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({"Creator":creator,"Name":teamName,"Players":[pg,sg,sf,pf,c]})};
            
        const response = await fetch('https://localhost:5001/neo4j/CreateFantasyTeam/',requestOptions);
        console.log(response);
    }

    const getAllTeams = async () =>
    {
        const respone = await fetch('https://localhost:5001/neo4j/getAllFTeams');
        const data = await respone.json();
        console.log(data);
        setAllteams(data);
    }

    const getTeams = async () =>
    {
        const respone = await fetch('https://localhost:5001/neo4j/getFTeams/'+creator);
        const data = await respone.json();
        setTeams(data);
        setPokreni(!pokreni);
    }

    const updateTeam = async (e) =>
    {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({"Creator":creator,"Name":teamName,"Players":[pg,sg,sf,pf,c]})};
            
        const response = await fetch('https://localhost:5001/neo4j/UpdateFantasy/',requestOptions);
        
        console.log(response);
        setCreate(1);
    }

    const deleteTeam = async (e) =>
    {
        e.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json' }
        };

        const respone = await fetch('https://localhost:5001/neo4j/DeleteFantasy/'+ teamName + "/" + creator,requestOptions);
        const data = await respone.json();
        setTeams(data);
        setPokreni(!pokreni);
    }

    const handleCreate = (teamName) => {
        setTeamName(teamName);
        setCreate(0);
    }

    return(
        <div className="div-fantasy">
            <div className="div-nickname">
            Your nickname: <input className="inputSignup" type="text" value={creator} onChange={updateCreator} />
            
            <button id="buttonSingup" onClick={getTeams}>Start fantasy</button>
            </div>
            <div className="fantasy">
                <div className="fantasy-teams">
                <div>{pokreni}</div>
                Your teams
                <br/><br/>
                {pokreni && 
                    teams?.map((team) => (
                    <div key={team.name} className="fantasy-team">
                        <p>{team.name}</p>
                        <p>Rating: {team.rating.toFixed(3)}</p>
                        {team.pg}
                        <br/>
                        {team.sg}
                        <br/>
                        {team.sf}
                        <br/>
                        {team.pf}
                        <br/>
                        {team.c}
                        <br/>
                        <br/>
                        <button onClick={() => handleCreate(team.name)}>Update</button>
                        <button onClick={deleteTeam}>Delete</button>
                    </div>
                ))}
                </div>

                <div className="fantasy-forms">
                {create?
                    <form onSubmit={createTeam}>
                        Team name: <input className="inputSignup" type="text" value={teamName} onChange={updateTeamName} />
                        <br /><br />
                        Point guard: <input className="inputSignup" type="text" value={pg} onChange={updatepg} />
                        <br /><br />
                        Shooting guard: <input className="inputSignup" type="text" value={sg} onChange={updatesg} />
                        <br /><br />
                        Small forward: <input className="inputSignup" type="text" value={sf} onChange={updatesf} />
                        <br /><br />
                        Power forward: <input className="inputSignup" type="text" value={pf} onChange={updatepf} />
                        <br /><br />
                        Center: <input className="inputSignup" type="text" value={c} onChange={updatec} />
                        <br /><br />
                        <button type="submit" id="buttonSingup">Create team</button> 
                    </form>
                    :
                    <form onSubmit={updateTeam}>
                        <div>{teamName}</div>
                        Point guard: <input className="inputSignup" type="text" value={pg} onChange={updatepg} />
                        <br /><br />
                        Shooting guard: <input className="inputSignup" type="text" value={sg} onChange={updatesg} />
                        <br /><br />
                        Small forward: <input className="inputSignup" type="text" value={sf} onChange={updatesf} />
                        <br /><br />
                        Power forward: <input className="inputSignup" type="text" value={pf} onChange={updatepf} />
                        <br /><br />
                        Center: <input className="inputSignup" type="text" value={c} onChange={updatec} />
                        <br /><br />
                        <button type="submit" id="buttonSingup">Save</button>
                    </form>}
                    </div>
                    <div className="fantasy-all-teams">
                    All teams rating<br/><br/>
                    {allteams?.map((team) => (
                        <div key={team.name} className="fantasy-teams-rating">
                        <p>{team.name} 
                        <p>Rating: {team.rating}</p>
                        </p>
                    </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}