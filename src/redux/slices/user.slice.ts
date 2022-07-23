import { User } from "@firebase/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        initialize(state: UserState, action: PayloadAction<{ user: User }>) {
            state.user = action.payload.user;
        },
        logout(state: UserState, _: PayloadAction) {
            state.user = null;
        }
    }
})

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;