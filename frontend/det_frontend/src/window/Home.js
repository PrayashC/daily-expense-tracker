import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [desp,setDesp] = useState("")
    const [cost, setCost] = useState(0)

    return (
        <div className="bg-slate-900 w-full h-screen fixed">
            <h1 className="text-white">This is home page.</h1>
            
            <input className="m-2 p-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text" 
            placeholder="Description"
            value={desp}
            onChange={(e) => setDesp(e.target.value)} />
            
            <input className="m-2 p-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text" 
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            />

            <button className="m-2 px-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
            >Add</button>
        
        
        
        
        
        
        
        </div>

    )
}

export default Home;