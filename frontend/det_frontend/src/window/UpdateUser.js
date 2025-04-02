import react, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
    const [updateUser, setUpdateUser] = useState("");
    const [newUsername, setUsername] = useState("");
    const [newPassword, setPassword] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        const newData = { newUsername, newPassword };
        try {
          const response = await axios.put(`http://localhost:5000/update/${updateUser}`, newData);
          console.log('Server response:', response.data);
        } catch (error) {
          console.error('Error updating user:', error);
        }
        setUsername("");
        setPassword("");
        setUpdateUser("");
      };

    return (
        <div>
            <div>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Enter User to Update</label>
                        <input type="text" 
                            name="updateuser"
                            value={updateUser}
                            onChange={(e) => setUpdateUser(e.target.value)} 
                            required />
                    </div>
                    <div>
                        <label>Enter New Name</label>
                        <input type="text" 
                            name="username"
                            value={newUsername}
                            onChange={(e) => setUsername(e.target.value)} 
                            required />
                    </div>
                    <div>
                        <label>Enter New Password</label>
                        <input type="text" 
                            name="password"
                            value={newPassword}
                            onChange={(e) => setPassword(e.target.value)} 
                            required />
                    </div>
                    <div>
                        <button type="submit">Update Data</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default UpdateUser;