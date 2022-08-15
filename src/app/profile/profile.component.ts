import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CardiovascularDiseasePredispositionEnum, FullStore, InfarctionOrInsultEnum, UserFullModel } from '../store/store.model';
import { loading } from '../store/user.selector';
import { getCookie, setCookie } from '../utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  private readonly cookiesKey = 'ulstu-cardio-analytical-information-confirm';

  user$: Observable<UserFullModel | null>;
  userId: string;
  loading$: Observable<boolean>;
  isApproved = false;
  private unsubscribe$: Subject<void> = new Subject();

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private store: Store<FullStore>,
    private readonly fb: FormBuilder,
  ) {
    this.isApproved = !!getCookie(this.cookiesKey);
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.user$ = this.api.getUser();
    this.loading$ = this.store.select(loading);

    this.form = this.fb.group({
      login: ['', Validators.required],
      fio: ['', Validators.required],
      region: ['', Validators.required],
      doctorFio: ['', Validators.required],
      doctorEmail: ['', [Validators.required, Validators.email]],
      cardiovascularDiseasePredisposition: [CardiovascularDiseasePredispositionEnum.NO, Validators.required],
      statinsTaking: [false, Validators.required],
      chronicKidneyDisease: [false, Validators.required],
      arterialHypertension: [false, Validators.required],
      cardiacIschemia: [false, Validators.required],
      diabetesType2: [false, Validators.required],
      infarctionOrInsult: [InfarctionOrInsultEnum.NO, Validators.required],
      atherosclerosis: [false, Validators.required],
      otherCardiovascularSystemDiseases: [false, Validators.required],
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

  onApprove() {
    setCookie(this.cookiesKey, '1', 100);
    this.isApproved = true;
  }

  setForm(user: UserFullModel) {
    const keys = Object.keys(this.form.controls);
    for (const key of keys) {
      this.form.controls[key].setValue((user as any)[key], {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false,
      })
    }
  }

  cdpFields = [
    {
      name: 'У мужчин до 55 лет (у женщин до 65 лет)',
      value: CardiovascularDiseasePredispositionEnum.HAVE_DISEASE_IN_FAMILY
    },
    {
      name: 'Да',
      value: CardiovascularDiseasePredispositionEnum.GENETIC_PREDISPOSITION
    },
    {
      name: 'Нет',
      value: CardiovascularDiseasePredispositionEnum.NO
    }
  ];

  yn = [
    {
      name: 'Да',
      value: true
    },
    {
      name: 'Нет',
      value: false
    },
  ]

  ii = [
    {
      name: 'Инфаркт',
      value: InfarctionOrInsultEnum.INFARCTION
    },
    {
      name: 'Инсульт',
      value: InfarctionOrInsultEnum.INSULT
    },
    {
      name: 'Нет',
      value: InfarctionOrInsultEnum.NO
    },
  ];

  next() {
    this.router.navigate(['user', this.userId, 'lifestyle'], {
      queryParams: this.route.snapshot.queryParams
    });
  }
}
