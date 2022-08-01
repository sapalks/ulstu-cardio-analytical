import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getRandomFullUserInfo, getRandomUser } from "./mock/utils";
import { FullStore, UserBaseInfo, UserFullModel, UserStore } from "./store/store.model";
import { actions as adminActions } from './store/admin.slice';
import { actions as userActions } from './store/user.slice';
import { catchError, delay, map, Observable, of } from "rxjs";
import { users } from "./store/admin.selector";
import { current, userId } from "./store/user.selector";
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({ providedIn: 'root' })
export class ApiService {
    lastUserId: string = '';
    public constructor(
        private readonly store: Store<FullStore>,
        private _snackBar: MatSnackBar
    ) {
        this.store.select(userId).subscribe(userId => {
            if (userId && this.lastUserId !== userId) {
                this.getFullUserInfo(userId);
            }
        });
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

    public update(id: string, data: Partial<UserFullModel>): void {
        console.log('update user info', {
            id, ...data
        })
        this.store.dispatch(userActions.updateUser({
            user: {
                id,
                ...data
            }
        }));
        this.updateUser(id, data).subscribe(res => {
            if (!res) {
                this._snackBar.open('Не удалось сохранить данные, перезагрузите страницу или обратитесь к разработчикам', 'ок')
            }
        });
    }

    public getRiskOfCardiovascularEvents(id: string): Observable<void> {
        return this.getRiskOfCardiovascularEventsApiCall(id).pipe(catchError(err => {
            this._snackBar.open('Не удалось получить данные, возможно не указаны все необходимые данные', 'ок')
            return of(undefined);
        }), map(res => {
            this.store.dispatch(userActions.updateUser({
                user: {
                    id,
                    riskOfCardiovascularEvents: res
                }
            }))
        }));
    }

    public getCardiovascularAge(id: string): Observable<void> {
        return this.getCardiovascularAgeApiCall(id).pipe(catchError(err => {
            this._snackBar.open('Не удалось получить данные, возможно не указаны все необходимые данные', 'ок')
            return of(undefined);
        }), map(res => {
            this.store.dispatch(userActions.updateUser({
                user: {
                    id,
                    cardiovascularAge: res
                }
            }))
        }));

    }


    private loadList(): void {
        const users: UserBaseInfo[] = Array(10).fill(0).map((o, i) => getRandomUser(i));
        of(users).pipe(delay(100)).subscribe(users => this.store.dispatch(adminActions.setUsers({ users })));
    }

    private getFullUserInfo(id: string) {
        const user: UserFullModel = getRandomFullUserInfo(id);
        this.store.dispatch(userActions.startUserLoading({ id }));
        of(user).pipe(delay(100)).subscribe(user => this.store.dispatch(userActions.setUser({ user: { ...user, id } })));
    }

    private updateUser(id: string, data: Partial<UserFullModel>): Observable<boolean> {
        return of(true).pipe(delay(300));
    }

    private getRiskOfCardiovascularEventsApiCall(id: string): Observable<number> {
        return of(10).pipe(delay(300));
    }
    private getCardiovascularAgeApiCall(id: string): Observable<number> {
        return of(10).pipe(delay(300));
    }
}