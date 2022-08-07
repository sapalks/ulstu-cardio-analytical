import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
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
      highDensityCholesterol: [0, [Validators.required, Validators.min(0.5), Validators.max(5.5)]],
      lowDensityCholesterol: [0, [Validators.required, Validators.min(0.5), Validators.max(8.5)]],
      triglycerides: [0, [Validators.required, Validators.min(0.2), Validators.max(8.5)]],
      lipoprotein: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      ecg: [undefined, [Validators.required,]],
      protein: [0, [Validators.required, Validators.min(0.1), Validators.max(12)]],
      atherogenicCoefficient: [0, [Validators.required, Validators.min(0.1), Validators.max(8)]],
      creatinine: [0, [Validators.required, Validators.min(20), Validators.max(500)]],
      havePlaques: [false, [Validators.required,]],
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
  }

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

}
