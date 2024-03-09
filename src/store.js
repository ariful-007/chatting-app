import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import  activeCahtSlice  from './slice/ActiveSlice'



export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    activeCahtSlice:activeCahtSlice
  },
})