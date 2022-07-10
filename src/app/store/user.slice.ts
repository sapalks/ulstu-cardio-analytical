
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState, UserFullModel } from './store.model';

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        serUserId: (state, action: PayloadAction<{ userId: string }>) => {
            state.id = action.payload.userId
        },
        startUserLoading: (state, action: PayloadAction<{ id: string }>) => {
            state.id = action.payload.id;
            state.loading = true;
        },
        serUser: (state, action: PayloadAction<{ user: UserFullModel }>) => {
            state.current = action.payload.user;
            state.loading = false;
        }
    }
});

export const { name, actions, reducer } = userSlice;