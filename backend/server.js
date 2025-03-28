import express, { json } from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(json());
app.use(cors());

mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    username:  { type: String },
    password:  { type: String },
});

const User = mongoose.model("User", UserSchema, "users");

app.get("/", (req, res) => {
    const getUserData = async () => {
        try {
            const users = await User.find();
            res.json(users);
            console.log(users);
        } catch (e) {
            res.status(500).json({error: "Failed to fetch data"});
        }
    }
    getUserData();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));