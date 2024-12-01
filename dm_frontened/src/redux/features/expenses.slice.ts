import { createSlice } from "@reduxjs/toolkit";

export interface expensesType {
    loading: boolean,
    expensesList:[],
    totalExpense:number,
    error: Error | null;
}

const initialState : expensesType = {
    loading : false,
    expensesList:[],
    error: null,
    totalExpense:0
}


export const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addExpenses: (state,action)=>{
            state.loading = true;
        },
        addExpensesSuccess: (state,action) =>{
            state.loading = false;
        },
        addExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        editExpenses: (state,action)=>{
            state.loading = true;
        },
        editExpensesSuccess: (state,action) =>{
            state.loading = false;
        },
        editExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        listExpenses: (state,action)=>{
            state.loading = true;
        },
        listExpensesSuccess: (state,action) =>{
            state.expensesList=action.payload
            state.loading = false;
        },
        listExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        getTotalExpenses: (state,action)=>{
            state.loading = true;
        },
        getTotalExpensesSuccess: (state,action) =>{
            state.totalExpense=action.payload
            state.loading = false;
        },
        getTotalExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        deleteExpenses: (state,action)=>{
            state.loading = true;
        },
        deleteExpensesSuccess: (state,action) =>{
            state.loading = false;
        },
        deleteExpensesFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
    }
}) 

export const { addExpenses,addExpensesFailure,addExpensesSuccess,listExpenses,listExpensesSuccess,listExpensesFailure,deleteExpenses,deleteExpensesSuccess,deleteExpensesFailure,editExpenses,editExpensesSuccess,editExpensesFailure,getTotalExpenses,getTotalExpensesSuccess,getTotalExpensesFailure} =expensesSlice.actions;

export default expensesSlice.reducer;