import { usersCollection } from '../db.js';

const Update = async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername, newPassword } = req.body;

        const result = await usersCollection.updateOne(
            { username: username },
            { $set: { username: newUsername, password: newPassword } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: `User ${username} updated successfully.` });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default Update;