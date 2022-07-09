
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAdminState, UserSearchData } from './store.model';

const adminSlice = createSlice({
    name: 'task',
    initialState: initialAdminState,
    reducers: {
        users: (state, action: PayloadAction<{ users: UserSearchData[] }>) => {
            state.users = action.payload.users;
        }
    }
});

export const { name, actions, reducer } = adminSlice;