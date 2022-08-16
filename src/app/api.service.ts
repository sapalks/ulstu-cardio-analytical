import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getRandomFullUserInfo, getRandomRecommendation, getRandomUser } from "./mock/utils";
import { FullStore, Recommendation, StatusRecommndationEnum, UserBaseInfo, UserFullModel, UserStore } from "./store/store.model";
import { actions as adminActions } from './store/admin.slice';
import { actions, actions as userActions } from './store/user.slice';
import { catchError, delay, map, Observable, of } from "rxjs";
import { users } from "./store/admin.selector";
import { current, userId } from "./store/user.selector";
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient, HttpHeaders } from "@angular/common/http";

export const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({ providedIn: 'root' })
export class ApiService {
    lastUserId: string = '';
    public constructor(
        private readonly store: Store<FullStore>,
        private _snackBar: MatSnackBar,
        private http: HttpClient,
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

    public loadRecommendation(userId: string): Observable<Recommendation[]> {
        return this.getRecommendations(userId)
    }

    public sendtToDoctor(recommendationId: string): Observable<boolean> {
        return this.setToDoctorApi(recommendationId);
    }
    public saveRecommendation(recommendation: Recommendation): Observable<boolean> {
        return of(true).pipe(delay(300));
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

    private getRecommendations(userId: string): Observable<Recommendation[]> {
        const recommendations = [
            getRandomRecommendation(1, null, null),
            getRandomRecommendation(2, StatusRecommndationEnum.APPROVED, 5),
            getRandomRecommendation(3, null, null),
            getRandomRecommendation(4, StatusRecommndationEnum.SAVED, 3),
        ]
        return of(recommendations).pipe(delay(300));
    }

    private setToDoctorApi(recommendationId: string): Observable<boolean> {
        return of(true).pipe(delay(300));
    }

    private exampleGet(id: string) {
        return this.http.get(`https://some.url/tasks/session/order/update`, { headers, params: { id } })
            .pipe(
                map((response: any) => {
                    return response;
                }),
                catchError(_err => {
                    const defaultValue = {};
                    this._snackBar.open('Произошла ошибка при обращении на сервер, попробуйте обновить страницу или обратиться к разработчикам', 'ок')
                    return of(defaultValue)
                }),
            );
    }
    private examplePost(body: any) {
        return this.http.post(`https://some.url/tasks/session/order/update`, body, { headers })
            .pipe(
                map((response: any) => {
                    return response;
                }),
                catchError(_err => {
                    const defaultValue = {};
                    this._snackBar.open('Произошла ошибка при обращении на сервер, попробуйте обновить страницу или обратиться к разработчикам', 'ок')
                    return of(defaultValue)
                }),
            );
    }
}