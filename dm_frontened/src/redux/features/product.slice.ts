import { createSlice } from "@reduxjs/toolkit";

export interface authType {
    loading: boolean,
    productList:[],
    error: Error | null;
}

const initialState : authType = {
    loading : false,
    productList:[],
    error: null
}


export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        addProduct: (state,action)=>{
            state.loading = true;
        },
        addProductSuccess: (state,action) =>{
            state.loading = false;
        },
        addProductFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        editProduct: (state,action)=>{
            state.loading = true;
        },
        editProductSuccess: (state,action) =>{
            state.loading = false;
        },
        editProductFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        listProduct: (state,action)=>{
            state.loading = true;
        },
        listProductSuccess: (state,action) =>{
            state.productList=action.payload
            state.loading = false;
        },
        listProductFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        deleteProduct: (state,action)=>{
            state.loading = true;
        },
        deleteProductSuccess: (state,action) =>{
            state.loading = false;
        },
        deleteProductFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
    }
}) 

export const { addProduct,addProductFailure,addProductSuccess,listProduct,listProductSuccess,listProductFailure,deleteProduct,deleteProductSuccess,deleteProductFailure,editProduct,editProductSuccess,editProductFailure} =productSlice.actions;

export default productSlice.reducer;