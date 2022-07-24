import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FullStore, SexEnum, UserFullModel } from '../store/store.model';
import { loading } from '../store/user.selector';

@Component({
  selector: 'app-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.less']
})
export class BaselineComponent implements OnInit {


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

  sex(value: SexEnum): string {
    switch (value) {
      case SexEnum.MAN:
        return 'м';
      case SexEnum.WOMAN:
        return 'ж';
      default:
        return 'не указано';
    }
  }

}
