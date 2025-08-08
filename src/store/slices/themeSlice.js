import { createSlice } from "@reduxjs/toolkit";

const ThemeHandlerSlice = createSlice({
    name: "theme",
    initialState: {
        theme: localStorage.getItem("theme") || "light"
    },
    reducers: {
        changeTheme: (state, action) => {
            if (state.theme == "light") {
                state.theme = "dark"
                document.documentElement.setAttribute("class", "dark")
                localStorage.setItem("theme", "dark")
            } else {
                state.theme = "light"
                document.documentElement.setAttribute("class", "light")
                localStorage.setItem("theme", "light")
            }
        }
    }
})

export const { changeTheme } = ThemeHandlerSlice.actions
export default ThemeHandlerSlice.reducer