import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getRandomUser } from "./mock/utils";
import { FullStore, UserBaseInfo, UserFullModel, UserStore } from "./store/store.model";
import { actions as adminActions } from './store/admin.slice';
import { actions as userActions } from './store/user.slice';
import { delay, map, Observable, of } from "rxjs";
import { users } from "./store/admin.selector";
import { current, userId } from "./store/user.selector";
import { ActivatedRoute } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ApiService {
    lastUserId: string = '';
    public constructor(
        private readonly store: Store<FullStore>,
        private route: ActivatedRoute,
    ) {
        this.store.select(userId).subscribe(userId => {
            if (userId && this.lastUserId !== userId) {
                this.getFullUserInfo(userId);
            }
        })
    }

    public users(): Observable<UserBaseInfo[]> {

        return this.store.select(users).pipe(
            map(list => {
                if (!list.length) {
                    this.loadList();
                }
                return list;
            })
        );
    }

    public getUser(): Observable<UserFullModel | null> {
        return this.store.select(current)
    }


    public addUser(user: UserBaseInfo): void {
        of(user).pipe(delay(100)).subscribe(user => this.store.dispatch(adminActions.addUser({ user })));
    }


    private loadList(): void {
        const users: UserBaseInfo[] = Array(10).fill(0).map((o, i) => getRandomUser(i));
        of(users).pipe(delay(100)).subscribe(users => this.store.dispatch(adminActions.setUsers({ users })));
    }

    private getFullUserInfo(id: string) {
        const user: UserFullModel = getRandomUser();
        this.store.dispatch(userActions.startUserLoading({ id }));
        of(user).pipe(delay(100)).subscribe(user => this.store.dispatch(userActions.serUser({ user: { ...user, id } })));

    }
}