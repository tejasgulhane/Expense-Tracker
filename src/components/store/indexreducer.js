import Authreducer from './auth-reducer'
import Expensereducer from './Expense-Reducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore( {
    reducer :{
        auth :Authreducer ,
        expense:Expensereducer 
    }
})

export default store ;