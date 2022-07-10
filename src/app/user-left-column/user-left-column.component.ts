import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FullStore, UserFullModel, UserStore } from '../store/store.model';
import { loading } from '../store/user.selector';
import { actions as userActions } from '../store/user.slice';

@Component({
  selector: 'app-user-left-column',
  templateUrl: './user-left-column.component.html',
  styleUrls: ['./user-left-column.component.less']
})
export class UserLeftColumnComponent implements OnInit {

  user$: Observable<UserFullModel | null>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private store: Store<FullStore>) {
    this.user$ = this.api.getUser();
    this.loading$ = this.store.select(loading);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      if (userId) {
        this.store.dispatch(userActions.serUserId({ userId }))
      }
    })
  }

  open(subPath: string) {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.router.navigate(['user', userId, subPath], {
      queryParams: this.route.snapshot.queryParams
    });
  }

  isActive(subPath: string) {
    const userId = this.route.snapshot.paramMap.get('userId');
    const path = `user/${userId}/${subPath}`;
    return location.pathname.includes(path);
  }

}
