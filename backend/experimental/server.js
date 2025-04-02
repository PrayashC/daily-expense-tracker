import express, { json } from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(json());
app.use(cors());
mongoose.set('debug', true);
mongoose.set('strictQuery', false);

connect(process.env.ATLAS_URI)
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));

const db = mongoose.connection;
db.on('connected', () => console.log('connected'));
db.on('open', () => console.log('open'));
db.on('disconnected', () => console.log('disconnected'));

const UserSchema = new mongoose.Schema({
    username:  String,
    password:  String,
});

const User = mongoose.model("User", UserSchema, "users");
User.find({}).lean().then(users => console.log(users)).catch(err => console.error(err));


app.get("/", async (req, res) => {
    try {
        const users = await User.find({}).lean();
        res.json(users);
        console.log(users);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch data" });
        console.error(e);
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));