import mongoose from "mongoose"

const requiredString = { type: String, required: true };

const financeSchema = new mongoose.Schema({
    userEmail : requiredString,
    incomeData : [{ amount: requiredString, emoji: requiredString, type: requiredString }],
    expenseData :  [ { amount: requiredString, emoji: requiredString, type: requiredString }],
})

export const financeDB = mongoose.models.Finance || mongoose.model("Finance", financeSchema);