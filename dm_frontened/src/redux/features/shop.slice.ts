import { createSlice } from "@reduxjs/toolkit";

export interface shopType {
    loading: boolean,
    shopList:[],
    selectedShop:{}
    error: Error | null;
}

const initialState : shopType = {
    loading : false,
    shopList:[],
    selectedShop:{},
    error: null
}


export const shopSlice = createSlice({
    name: "shopSlice",
    initialState,
    reducers: {
        addShop: (state,action)=>{
            state.loading = true;
        },
        addShopSuccess: (state,action) =>{
            state.loading = false;
        },
        addShopFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        editShop: (state,action)=>{
            state.loading = true;
        },
        editShopSuccess: (state,action) =>{
            state.loading = false;
        },
        editShopFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        listShop: (state,action)=>{
            state.loading = true;
        },
        listShopSuccess: (state,action) =>{
            state.shopList=action.payload
            state.loading = false;
        },
        listShopFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        deleteShop: (state,action)=>{
            state.loading = true;
        },
        deleteShopSuccess: (state,action) =>{
            state.loading = false;
        },
        deleteShopFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        setSelectedShop:(state,action)=>{
            state.selectedShop=action.payload;
        }
    }
}) 

export const { addShop,addShopFailure,addShopSuccess,listShop,listShopSuccess,listShopFailure,deleteShop,deleteShopSuccess,deleteShopFailure,editShop,editShopSuccess,editShopFailure,setSelectedShop} =shopSlice.actions;

export default shopSlice.reducer;