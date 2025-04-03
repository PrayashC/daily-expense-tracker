import { expensesCollection } from "../db.js";

const DeleteExpense = async (req, res) => {
    const { userId, date, expend, cost} = req.body;
    try{
        const result = await expensesCollection.updateOne(
            { _id: userId, "expenseList.date": date },
            { $pull: { "expenseList.$.expense": {
                expend: expend,
                cost: cost
            } } }
          );
      
          if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Details not found" });
          } else {
            return res.status(200).json({ message: "Expense deleted successfully!" });
          }
        } catch (error) {
            res.status(500).json({ message: "Error inserting expense:",error: error });
        }
}

export default DeleteExpense;