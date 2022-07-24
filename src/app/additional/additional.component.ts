import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FullStore, UserFullModel } from '../store/store.model';
import { loading } from '../store/user.selector';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.less']
})
export class AdditionalComponent implements OnInit {

  user$: Observable<UserFullModel | null>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private store: Store<FullStore>
  ) {
    this.user$ = this.api.getUser();
    this.loading$ = this.store.select(loading);
  }

  ngOnInit(): void {
  }

}
