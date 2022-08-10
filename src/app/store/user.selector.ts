import { createSelector } from "@ngrx/store";
import { FullStore } from "./store.model";

export const current = ({ user }: FullStore) => user.current;
export const recommendation = ({ user }: FullStore) => user.recommendation;
export const loading = ({ user }: FullStore) => user.loading;
export const userId = ({ user }: FullStore) => user.id;
// export const userId = createSelector([current], current => current.id);