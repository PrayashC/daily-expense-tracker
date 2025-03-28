import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try{
                const response = await axios.get("https://daily-expense-tracker-rmmm.onrender.com/users/");
                setData(response.data);
            } catch(e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    return (
        <div>
            <h1>This is home page.</h1>
            <p>{data ? data : "loading..."}</p>
        </div>
    )
}

export default Home;