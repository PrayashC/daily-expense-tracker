import { expensesCollection } from "../db";

const InsDate = async (req, res) => {
    const { userId, date } = req.body;
    try{
        const dateExist = await expensesCollection.findOne({ _id: userId, "expenseList.date": date });

        if (dateExist) {
            await expensesCollection.updateOne(
                { 
                    $push: { 
                        expenseList: { 
                            date: date,
                            expense: [
                                {
                                  expend: String,
                                  cost: Number
                                }
                            ] 
                        } 
                    } 
                },
                { upsert: true })
            return res.status(200).json({ message: "Date added successfully!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error inserting date" });
    }
}

export default InsDate;