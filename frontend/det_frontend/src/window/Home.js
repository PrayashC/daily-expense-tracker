import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(async () => {
        try{
            const response = await axios.get("http://localhost:5000");
            setData(response.data);
        } catch(e) {
            console.log(e);
        }
    }, []);

    return (
        <div>
            <h1>This is home page.</h1>
            <p>{data ? data : "loading..."}</p>
        </div>
    )
}

export default Home;