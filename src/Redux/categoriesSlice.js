import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export let getCategories = createAsyncThunk('categoriesSlice/getCategories',
async()=>{
 let {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

return data.data;

}
)
export let getSpecificBrand = createAsyncThunk('categoriesSlice/getCategories',
async(brand_id)=>{
 let {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brand_id}`)

return data.data;

}
)
let initialState = {categories:[],loading:false,isError:null}
let categorySlice = createSlice({
name:'categoriesSlice',
initialState,
// extraReducers:(builder)=>{
//     builder.addCase(getCategories.fulfilled,(state,action)=>{
//     state.categories = action.payload;
//     state.loading=false;

//     }),
//     builder.addCase(getCategories.pending, ()=>{
//         // console.log("Pending");
//     state.loading=true;

//     })
// //     builder.addCase(getCategories.rejected,(action)=>{
// //         // console.log("rejected");
// //     state.isError = action.payload;
// //     state.loading=false;
// // })

// }

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

