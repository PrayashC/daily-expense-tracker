import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaUserCircle, FaChartBar, FaWallet, FaHistory, FaCog } from "react-icons/fa";

const Home = () => {
    const [desp,setDesp] = useState("")
    const [cost, setCost] = useState(0)
    const [expenses, setExpenses] = useState([]);

    const addExpense = () => {
        if (desp.trim() && cost.trim()) {
            setExpenses([...expenses, { desp, cost }]);
            setDesp("");
            setCost("");
        }
    };

    const deleteExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    
      
      
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/login';
    };

    
    return (
        <div className="w-full h-screen flex">
            <div className="bg-white text-gray-900 w-64 p-6 flex flex-col shadow-lg transition duration-300 hover:bg-black hover:text-white">
                <div className="flex flex-col items-center mb-8">
                    <FaUserCircle className="text-6xl mb-3 text-gray-500" />
                    <h2 className="text-lg font-semibold">Your Name</h2>
                </div>

                <nav className="flex flex-col space-y-2">
                    <button className="flex items-center p-3 font-semibold transition duration-300 hover:bg-gray-800 hover:text-white">
                        <FaChartBar className="mr-3" /> Dashboard
                    </button>
                    <button className="flex items-center p-3 font-semibold transition duration-300 hover:bg-gray-800 hover:text-white">
                        <FaWallet className="mr-3" /> Expenses
                    </button>
                    <button className="flex items-center p-3 font-semibold transition duration-300 hover:bg-gray-800 hover:text-white">
                        <FaHistory className="mr-3" /> History
                    </button>
                    <button className="flex items-center p-3 font-semibold transition duration-300 hover:bg-gray-800 hover:text-white">
                        <FaCog className="mr-3" /> Settings
                    </button>
                    <button className="flex items-center p-3 font-semibold transition duration-300 hover:bg-gray-800 hover:text-white"
                    onClick={handleLogout}>
                        <FaCog className="mr-3" /> Logout
                    </button>
                </nav>
            </div>

            <div className="flex-1 p-8 bg-gray-900 text-white">
                <div className="flex items-center justify-center mb-6 text-lg font-semibold">
                    <button className="p-2 mx-4 bg-gray-700 hover:bg-gray-600 transition">
                        <FaArrowLeft />
                    </button>
                    <span className="font-semibold">Apr 24</span>
                    <button className="p-2 mx-4 bg-gray-700 hover:bg-gray-600 transition">
                        <FaArrowRight />
                    </button>
                </div>

                <div className="bg-gray-800 p-4 shadow-lg">
                    <div className="flex items-center">
                        <input
                            className="flex-1 p-2 bg-gray-700 text-white focus:outline-none placeholder-gray-400 font-semibold"
                            type="text"
                            placeholder="Description"
                            value={desp}
                            onChange={(e) => setDesp(e.target.value)}
                        />
                        <input
                            className="w-24 p-2 mx-3 text-center bg-gray-700 text-white focus:outline-none placeholder-gray-400 font-semibold"
                            type="text"
                            placeholder="Cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                        <button
                            className="p-2 bg-gray-600 hover:bg-orange-500 text-white font-semibold transition duration-300"
                            onClick={addExpense}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    {expenses.map((item, index) => (
                        <div key={index} className="flex items-center bg-gray-700 p-3 mt-2 shadow">
                            <span className="flex-1 ml-3 text-gray-300 font-semibold">{item.desp}</span>
                            <span className="w-24 text-center text-gray-300 font-semibold">{item.cost}</span>
                            <button
                                className="p-2 text-gray-400 hover:text-orange-500 transition duration-300"
                                onClick={() => deleteExpense(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
