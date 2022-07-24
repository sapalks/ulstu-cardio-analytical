import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CommitmentEnum, FamilyStatusEnum, FullStore, InSocialEventsEnum, PhysicalActivityEnum, SexEnum, SymptomsOfAnginaPectorisEnum, UserFullModel, WorkStatusEnum } from '../store/store.model';
import { loading } from '../store/user.selector';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.less']
})
export class LifestyleComponent implements OnInit {

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

  fs(value: FamilyStatusEnum | undefined, sex: SexEnum): string {
    switch (value) {
      case FamilyStatusEnum.MARRIED:
        return sex === SexEnum.MAN ? 'женат' : 'замужем';
      case FamilyStatusEnum.DIVORCED:
        return sex === SexEnum.MAN ? 'разведен' : 'разведена';
      case FamilyStatusEnum.WIDOWER:
        return sex === SexEnum.MAN ? 'вдовец' : 'дова';
      default:
        return 'не указано';
    }
  }

  se(value: InSocialEventsEnum | undefined): string {
    switch (value) {
      case InSocialEventsEnum.ONE:
        return 'один раз в неделю';
      case InSocialEventsEnum.MORE:
        return 'Более одного раза в неделю';
      default:
        return 'не указано';
    }
  }

  pa(value: PhysicalActivityEnum | undefined): string {
    switch (value) {
      case PhysicalActivityEnum.ONE:
        return 'тренировка один раз в неделю';
      case PhysicalActivityEnum.MORE:
        return 'Тренировка более одного раза в неделю';
      case PhysicalActivityEnum.DAILY:
        return 'повседневная';
      default:
        return 'не указано';
    }
  }

  w(value: WorkStatusEnum | undefined): string {
    switch (value) {
      case WorkStatusEnum.WORKERD:
        return 'Работает';
      case WorkStatusEnum.RETIRED:
        return 'на пенсии';
      case WorkStatusEnum.UNEMPLOYED:
        return 'безработный';
      case WorkStatusEnum.LOOKING:
        return 'в поиске работы';
      default:
        return 'не указано';
    }
  }

  sap(value: SymptomsOfAnginaPectorisEnum | undefined): string {
    switch (value) {
      case SymptomsOfAnginaPectorisEnum.GOTO_CARDIOLOGIST:
        return 'необходимо записаться к кардиологу';
      case SymptomsOfAnginaPectorisEnum.NO_SYMPTOMS:
        return 'Нет симптомов';
      default:
        return 'не указано';
    }
  }

  c(value: CommitmentEnum | undefined): string {
    switch (value) {
      case CommitmentEnum.LOW:
        return 'Низкий';
      case CommitmentEnum.MEDIUM:
        return 'Средний';
      case CommitmentEnum.HIGTH:
        return 'Высокий';
      default:
        return 'не указано';
    }
  }

}
