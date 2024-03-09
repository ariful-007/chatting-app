import { createSlice } from "@reduxjs/toolkit";

export const activeCahtSlice = createSlice({
  name:"activeCaht",
   initialState:{
    active: localStorage.getItem("activeFriend") ? JSON.parse(localStorage.getItem("activeFriend")) : null
   },
   reducers:{
    activeCaht:(state, action)=>{
      state.active = action.payload
    }
   } 
})

export const {activeCaht} = activeCahtSlice.actions

export default activeCahtSlice.reducer