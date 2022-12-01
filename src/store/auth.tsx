import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, token: "" };
const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            localStorage.setItem('isLoggedIn', '1');
            state.isAuthenticated = true;
        },
        logout(state) {
            localStorage.setItem('isLoggedIn', '0');
            localStorage.removeItem('token');
            state.isAuthenticated = false;
        },
        assert(state) {
            if (localStorage.getItem('isLoggedIn') === '1') {
                state.token = localStorage.getItem('token');
                state.isAuthenticated = true;
            }
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;