import { expensesCollection } from "../db.js";

const ExpenseDb = async (req, res) => {
    const { userId } = req.body;
    try{
        await expensesCollection.insertOne({
            _id: userId, 
            expenseList: [
                {
                  date: Date,
                  expense: [
                    {
                      expend: String,
                      cost: Number
                    }
                  ]
                }
            ]
        });
    } catch(err){
        res.status(500).json({ message: 'Error creating user', error: err });
    }
}

export default ExpenseDb;