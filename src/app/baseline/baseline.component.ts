import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
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
  userId: string;
  loading$: Observable<boolean>;
  private unsubscribe$: Subject<void> = new Subject();

  form: FormGroup;
  imt: number | 'не определенно' = 'не определенно';

  riskOfCardiovascularEventsLoading = false;
  cardiovascularAgeLoading = false;

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
      weight: [0, [Validators.required, Validators.min(40), Validators.max(160)]],
      growth: [0, [Validators.required, Validators.min(145), Validators.max(260)]],
      waist: [0, [Validators.required, Validators.min(50), Validators.max(190)]],
      sex: [undefined, Validators.required],
      birthAt: [undefined, Validators.required],
      systolicBloodPressureLevel: [0, [Validators.required, Validators.min(80), Validators.max(250)]],
      isSmocking: [undefined, Validators.required],
      cholesterol: [0, [Validators.required, Validators.min(3), Validators.max(15.2)]],
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
    this.router.navigate(['user', this.userId, 'lifestyle'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

  getRiskOfCardiovascularEvents() {
    this.riskOfCardiovascularEventsLoading = true;
    this.api.getRiskOfCardiovascularEvents(this.userId).subscribe(() => {
      this.riskOfCardiovascularEventsLoading = false;
    });
  }

  getCardiovascularAge() {
    this.cardiovascularAgeLoading = true;
    this.api.getCardiovascularAge(this.userId).subscribe(() => {
      this.cardiovascularAgeLoading = false;
    });
  }

  setForm(user: UserFullModel) {
    console.log(user)
    const keys = Object.keys(this.form.controls);
    for (const key of keys) {
      this.form.controls[key].setValue((user as any)[key], {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false,
      });
    }
    if (this.form.controls['weight'].valid && this.form.controls['growth'].valid) {
      const growth = this.form.controls['growth'].value / 100;
      const weight = this.form.controls['weight'].value;
      this.imt = Math.pow(weight / growth, 2)
    }
  }

  sex = [
    {
      name: 'Мужской',
      value: SexEnum.MAN
    },
    {
      name: 'Женский',
      value: SexEnum.WOMAN
    }
  ];


  smocking = [
    {
      name: 'Курит',
      value: true
    },
    {
      name: 'Не курит',
      value: false
    }
  ];

}
