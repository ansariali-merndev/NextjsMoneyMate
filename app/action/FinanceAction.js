"use server";

import { connectDB } from "@/config/db";
import { financeDB } from "@/model/FinanceModel";



export async function addFinanceData(email, income, finance) {
    await connectDB();

    let financeData = await financeDB.findOne({userEmail: email});

    if(!financeData) {
        financeData = new financeDB({
            userEmail: email,
            incomeData: [],
            expenseData: [],
        })
    }

    financeData[income ? "incomeData" : "expenseData"].push(finance)
    
    await financeData.save();
}