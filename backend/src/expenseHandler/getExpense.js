import { expensesCollection } from '../db.js';

const GetExpense =  async (req, res) => {
    const { userId, date } = req.params;
    try {
        const result = await expensesCollection.findOne( 
        { _id: userId, "expenseList.date": date }, // Finding the document with entered userId and date
        { projection: { "expenseList.$": 1 } } // Projecting so it doesn't return entire document
      );
  
      const expenses = (result?.expenseList?.[0]?.expense || []) // Get the expense array inside expenseList
        .filter(item => Object.keys(item).length > 0) // Filter to remove empty {}
        .map(({ expend, cost }) => ({ expend, cost })); // Map to array
  
      if (expenses.length === 0) {
        // If no data found
        return res.status(404).json({
          error: true,
          message: "No expenses found on the given date.",
          data: []
        });
      }
  
      // If data found
      res.json({
        error: false,
        message: "Expenses fetched successfully.",
        data: expenses // Array of { expend, cost }
      });
    } catch (err) {
      res.status(500).json({ error: true, message: "Internal server error", details: err.message });
    }
  };

export default GetExpense;