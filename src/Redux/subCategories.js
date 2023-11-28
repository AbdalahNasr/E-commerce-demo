
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export let getCategories = createAsyncThunk('categoriesSlice/getCategories',
async()=>{
 let {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)

return data.data;

}
)
export let getSpecificBrand = createAsyncThunk('categoriesSlice/getCategories',
async(subcategories_id)=>{
 let {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${subcategories_id}`)

return data.data;

}
)
let initialState = {categories:[],loading:false,isError:null}
let categorySlice = createSlice({
name:'categoriesSlice',
initialState,
extraReducers:{
[getCategories.pending]:(state,action)=>{
    state.loading = true;
},
[getCategories.fulfilled]:(state,action)=>{
    state.categories = action.payload;
    state.loading=false;
},
[getCategories.rejected]:(state,action)=>{
    // state.isError = action.payload;
    state.loading=false;
}

}
})

export let categoriesReducer = categorySlice.reducer

