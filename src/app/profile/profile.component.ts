import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CardiovascularDiseasePredispositionEnum, FullStore, InfarctionOrInsultEnum, UserFullModel, UserStore } from '../store/store.model';
import { loading } from '../store/user.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

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

  cdp(value: CardiovascularDiseasePredispositionEnum): string {
    switch (value) {
      case CardiovascularDiseasePredispositionEnum.HAVE_DISEASE_IN_FAMILY:
        return 'были СС заболевания у ближайших родственников в возрасте до 70 лет';
      case CardiovascularDiseasePredispositionEnum.GENETIC_PREDISPOSITION:
        return 'генетическая предрасположенность';
      case CardiovascularDiseasePredispositionEnum.NO:
      default:
        return 'нет';
    }
  }

  ii(value: InfarctionOrInsultEnum): string {
    switch (value) {
      case InfarctionOrInsultEnum.INFARCTION:
        return 'инфаркт';
      case InfarctionOrInsultEnum.INSULT:
        return 'инсульт';
      case InfarctionOrInsultEnum.NO:
      default:
        return 'нет';
    }
  }

}
