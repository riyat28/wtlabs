import { useState } from "react";
import axios from "axios";
import './bill.css';
export function Bill()
{
    const [units,setUnits] = useState(0);
    function handleSubmit(e)
    {
        e.preventDefault();
        console.log(units);
        /*const url = `http://localhost:8080/electricity/calculate/${ans}`;
        const bill = await axios.get(url);
        setAns(bill);*/
        fetch(`http://localhost:8080/electricity/calculate/${units}`).then((res)=>res.json())
        .then(result=>setUnits(result));
        console.log('units consumed are '+units);
    }
    return(
        <div className="body">
            <h1> BILL</h1>
            <br />
            <label for='units'>Enter number of units consumed</label>
            <input type= 'number' id="units" onChange={(e)=>setUnits(e.target.value)}></input>
            <input type='submit' onClick={handleSubmit}/>
            <br />
            <p>Total Bill : {units}</p>
        </div>
    )
}