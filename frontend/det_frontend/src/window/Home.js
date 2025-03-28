import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(async () => {
        try{
            const response = await axios.get("https://daily-expense-tracker-rmmm.onrender.com/");
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