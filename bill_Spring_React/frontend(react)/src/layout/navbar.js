import { Link } from "react-router-dom"
import './nav.css'
export function Navbar()
{
    return(
        <div>
            <div className="Title"><h1>Maharashtra State Electricity Board</h1></div>
        <div className="flex-container">
            <div><Link to="/home">Home</Link></div>
            <div><Link to="/bill">Bill</Link></div>
        </div>
        </div>
    )
}