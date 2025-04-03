import { expensesCollection } from "../db.js";

const InsDate = async (req, res) => {
    const { userId, date } = req.body;
    try{
        const dateExist = await expensesCollection.findOne({ _id: userId, "expenseList.date": date });

        if (dateExist) 
            {
                // 1.if the entered date already exists.
                return res.status(400).json({ message: "This Date exists" });
            } 
             
            await expensesCollection.updateOne(
                //adding the data but checking the id first or it updates eeverything first
                { _id: userId }, 
                {
                    $push: { 
                        expenseList: { 
                            date: date,
                            expense: [
                                {
                                  expend: String,
                                  cost: Number
                                }] } 
                    } 
                },
                { upsert: true }
            );
            return res.status(200).json({ message: "Date added successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error inserting date",error: error });
    }
}

export default InsDate;