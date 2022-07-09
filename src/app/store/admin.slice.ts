
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAdminState, UserBaseInfo } from './store.model';

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialAdminState,
    reducers: {
        setUsers: (state, action: PayloadAction<{ users: UserBaseInfo[] }>) => {
            state.users = action.payload.users;
        },
        addUser: (state, action: PayloadAction<{ user: UserBaseInfo }>) => {
            state.users = [
                ...state.users,
                action.payload.user
            ]
        }
    }
});

export const { name, actions, reducer } = adminSlice;