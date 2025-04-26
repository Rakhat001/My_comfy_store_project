import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  corporate: 'corporate',
  coffee: 'coffee'
}

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.corporate;
  document.documentElement.setAttribute('data-theme',theme);
  return theme
}

const getUserFromLocalStorage = () =>{
  return JSON.parse(localStorage.getItem('user')) || null
}


const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage()
};


  const userSlice = createSlice({
  name: 'user', initialState,
  reducers: {
    loginUser: (state, action) => {
      const user  = {...action.payload.user, token: action.payload.jwt};
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user)) 
    },
    logOutUser: (state) => {
      state.user  = null;
      localStorage.removeItem('user');
      toast.success('You log out from the application')
    },
    toggleTheme: (state) => {
      const { corporate, coffee } = themes;
      state.theme = state.theme === coffee ? corporate : coffee
      document.documentElement.setAttribute('data-theme',state.theme);
      localStorage.setItem('theme',state.theme)
    }
  }
})

export const { loginUser, logOutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer