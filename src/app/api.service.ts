import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getRandomUser } from "./mock/utils";
import { FullStore, UserBaseInfo } from "./store/store.model";
import { actions as adminActions } from './store/admin.slice';
import { delay, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ApiService {

    public constructor(
        private readonly store: Store<FullStore>,
    ) { }


    public loadList(): void {
        const users: UserBaseInfo[] = Array(10).fill(0).map(getRandomUser);
        of(users).pipe(delay(100)).subscribe(users => this.store.dispatch(adminActions.setUsers({ users })))
    }

    public addUser(user: UserBaseInfo): void {
        of(user).pipe(delay(100)).subscribe(user => this.store.dispatch(adminActions.addUser({ user })))
    }
}