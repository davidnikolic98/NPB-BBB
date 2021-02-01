import useAutocomplete from 'use-autocomplete';
import { useEffect, useState } from "react";

export default function Suggestion({players,search})
{

    useEffect(()=>
    {
        console.log(players);
    },[]);

    const testWords = ["Klay2019", "Nurkic2018", "Irving2019", "Doncic2019", "Irving2018", "Oladipo2018", "Kuzma2019", "Bosh2018", "Butler2020", "Butler2019", "Lonzo2019", "Garnett2020", "Rondo2018", "Kawhi2020", "Garnett2018", "Westbrook2019", "Nurkic2020", "Rondo2020", "Zion2020", "Barkley2018", "Lebron2018", "Shaq2019", "Kuzma2020", "Nurkic2019", "Westbrook2020", "Caruso2018", "Butler2018", "Embiid2019", "Kobe2019", "Kawhi2019", "Duncan2019", "Caruso2020", "Durant2020", "Curry2019", "Oladipo2019", "Lebron2020", "Kuzma2018", "Doncic2018", "Durant2018", "Klay2018", "Duncan2018", "Kobe2020", "Smith2020", "Oladipo2020", "Adebayo2020", "Durant2019", "Curry2020", "Adebayo2019", "Lonzo2018", "Jokic2019", "Westbrook2018", "Barkley2019", "Klay2020", "Irving2020", "Embiid2020", "Wade2020", "Adebayo2018", "Garnett2019", "Barkley2020", "Shaq2018", "Doncic2020", "Embiid2018", "Wade2019", "Jokic2020", "Smith2018", "Duncan2020", "Jokic2018", "Kobe2018", "Caruso2019", "Kawhi2018", "Lebron2019", "Smith2019", "Shaq2020", "Curry2018", "Rondo2019"];

    const [igraci] = useAutocomplete(search,players);

    return(
        <div>
            {igraci.map((val,index)=>(
            <p key={index}>{val}</p> ))}
        </div>
    )
}
