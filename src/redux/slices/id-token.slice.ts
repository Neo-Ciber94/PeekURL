import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IdTokenState {
    idToken: string | null
}

const initialState: IdTokenState = {
    idToken: null
}

const idTokenSlice = createSlice({
    name: 'idToken',
    initialState: initialState,
    reducers: {
        saveToken(state: IdTokenState, action: PayloadAction<{ idToken: string }>) {
            state.idToken = action.payload.idToken;
        },
        destroyToken(state: IdTokenState, action: PayloadAction) {
            state.idToken = null;
        }
    }
})

export const idTokenActions = idTokenSlice.actions;

export const idTokenReducer = idTokenSlice.reducer;