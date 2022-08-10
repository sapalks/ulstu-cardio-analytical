
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState, Recommendation, UserFullModel } from './store.model';

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
        setUser: (state, action: PayloadAction<{ user: UserFullModel }>) => {
            state.current = action.payload.user;
            state.loading = false;
        },
        updateUser: (state, action: PayloadAction<{ user: Pick<UserFullModel, 'id'> & Partial<UserFullModel> }>) => {
            const { user } = action.payload;
            const newCurrent = {
                ...state.current,
                ...user
            } as UserFullModel
            state.current = newCurrent;
        },
        setRecommendation: (state, action: PayloadAction<{ recommendations: Recommendation[] }>) => {
            state.recommendation = action.payload.recommendations;
        },
        updateRecommendation: (state, action: PayloadAction<{ recommendation: Pick<Recommendation, 'id'> & Partial<Recommendation> }>) => {
            const rs = state.recommendation.reduce((arr, el) => {
                if (el.id !== action.payload.recommendation.id) {
                    return [...arr, el]
                }
                return [
                    ...arr,
                    {
                        ...el,
                        ...action.payload.recommendation
                    }
                ];
            }, [] as (Recommendation & { showRating?: boolean })[])
            state.recommendation = rs;
        },
        showRating: (state, action: PayloadAction<{ id: string }>) => {
            const recommendation = state.recommendation.find(o => o.id === action.payload.id);
            if (recommendation) {
                recommendation.showRating = true;
            }
        }

    }
});

export const { name, actions, reducer } = userSlice;