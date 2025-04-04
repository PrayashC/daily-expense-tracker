import { expensesCollection } from "../db.js";

const UpdateExpense = async (req, res) => {
  const { userId, date, expend } = req.params;
    const { newExpend, newCost} = req.body;
    try{
        const existingExpense = await expensesCollection.findOne({
            _id: userId,
            "expenseList.date": date,
            "expenseList.expense.expend": expend  // Check if the expense already exists
            });
          
        if (existingExpense) {
            throw new Error("Expense with this name already exists!");
        }
        const result = await expensesCollection.updateOne(
          { _id: userId, "expenseList.date": date, "expenseList.expense.expend": expend },
          { 
            $set: { 
              "expenseList.$[].expense.$[elem].expend": newExpend, 
              "expenseList.$[].expense.$[elem].cost": newCost 
            } 
          }, 
          { arrayFilters: [{ "elem.expend": expend }] }
        );
      
          if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Details not found" });
          } else {
            return res.status(200).json({ message: "Expense Updated successfully!" });
          }
        } catch (error) {
            res.status(500).json({ message: "Error updating expense:",error: error });
        }
}

export default UpdateExpense;