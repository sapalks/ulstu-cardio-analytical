import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CommitmentEnum, ECGEnum, FamilyStatusEnum, FullStore, InSocialEventsEnum, PhysicalActivityEnum, SexEnum, SymptomsOfAnginaPectorisEnum, UserFullModel, WorkStatusEnum } from '../store/store.model';
import { loading } from '../store/user.selector';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.less']
})
export class LifestyleComponent implements OnInit {

  user$: Observable<UserFullModel | null>;
  userId: string;
  loading$: Observable<boolean>;
  private unsubscribe$: Subject<void> = new Subject();

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private store: Store<FullStore>,
    private readonly fb: FormBuilder,
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.user$ = this.api.getUser();
    this.loading$ = this.store.select(loading);

    this.form = this.fb.group({
      familyStatus: [undefined, Validators.required],
      inSocialEvents: [undefined, Validators.required],
      physicalActivity: [undefined, Validators.required],
      workStatus: [undefined, Validators.required],
      valuation1: [undefined, Validators.required],
      valuation2: [undefined, Validators.required],
      valuation3: [undefined, Validators.required],
    });

    for (const key of Object.keys(this.form.controls)) {
      this.form.controls[key].valueChanges.pipe(debounceTime(500))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(value => {
          this.api.update(this.userId, { [key]: value })
        });
    }

    this.api.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe(user => user && this.setForm(user));

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
  next() {
    this.router.navigate(['user', this.userId, 'baseline'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

  rouse() {
    this.router.navigate(['user', this.userId, 'questionnaire-rouse'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

  kop() {
    this.router.navigate(['user', this.userId, 'questionnaire-kop'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

  setForm(user: UserFullModel) {
    const keys = Object.keys(this.form.controls);
    for (const key of keys) {
      this.form.controls[key].setValue((user as any)[key], {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false,
      });
    }
  }

  fsMan = [
    {
      name: 'Не определено',
      value: undefined
    },
    {
      name: 'Женат',
      value: FamilyStatusEnum.MARRIED
    },
    {
      name: 'Разведен',
      value: FamilyStatusEnum.DIVORCED
    },
    {
      name: 'Вдовец',
      value: FamilyStatusEnum.WIDOWER
    },
  ];

  fsWoman = [
    {
      name: 'Не определено',
      value: undefined
    },
    {
      name: 'Замужем',
      value: FamilyStatusEnum.MARRIED
    },
    {
      name: 'Разведена',
      value: FamilyStatusEnum.DIVORCED
    },
    {
      name: 'Вдова',
      value: FamilyStatusEnum.WIDOWER
    },
  ];

  se = [
    {
      name: 'Да',
      value: InSocialEventsEnum.YES,
    },
    {
      name: 'Нет',
      value: InSocialEventsEnum.NO,
    },
  ];

  pa = [
    {
      name: 'Тренировка один раз в неделю',
      value: PhysicalActivityEnum.ONE
    },
    {
      name: 'Тренировка более одного раза в неделю',
      value: PhysicalActivityEnum.MORE
    },
    {
      name: 'Повседневная',
      value: PhysicalActivityEnum.DAILY
    },
  ];

  w = [
    {
      name: 'Не определенно',
      value: undefined
    },
    {
      name: 'Работает',
      value: WorkStatusEnum.WORKERD
    },
    {
      name: 'На пенсии',
      value: WorkStatusEnum.RETIRED
    },
  ];

  sap = [
    {
      name: 'Выявлены, рекомендуется записаться к кардиологу',
      value: SymptomsOfAnginaPectorisEnum.GOTO_CARDIOLOGIST
    },
    {
      name: 'Не выявлены',
      value: SymptomsOfAnginaPectorisEnum.NO_SYMPTOMS
    },
  ];

  c = [
    {
      name: 'Низкий',
      value: CommitmentEnum.LOW,
    },
    {
      name: 'Средний',
      value: CommitmentEnum.MEDIUM,
    },
    {
      name: 'Высокий',
      value: CommitmentEnum.HIGTH,
    },
  ];

  v = [
    'активная деятельная жизнь',
    'жизненная мудрость',
    'здоровье',
    'интересная работа',
    'красота природы и искусства',
    'любовь',
    'материально обеспеченная жизнь',
    'наличие хороших и верных друзей',
    'общественное призвание',
    'познание и интеллектуальное развитие',
    'продуктивная жизнь',
    'развлечения',
    'свобода, самостоятельность, независимость',
    'счастливая семейная жизнь',
    'творчество',
    'уверенность в себе',
  ]

}
