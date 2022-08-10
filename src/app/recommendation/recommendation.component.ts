import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from '../api.service';
import { FullStore, Recommendation, StatusRecommndationEnum } from '../store/store.model';
import { actions as userActions } from '../store/user.slice';
import { recommendation } from '../store/user.selector';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.less']
})
export class RecommendationComponent implements OnInit {
  userId: string;
  global = true;
  loading: boolean = false;
  recommendations$: Observable<(Recommendation & { showRating?: boolean })[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private store: Store<FullStore>,
    private _snackBar: MatSnackBar) {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.recommendations$ = this.store.select(recommendation);
  }

  ngOnInit(): void {
    this.loading = true;
    this.store.dispatch(userActions.setRecommendation({ recommendations: [] }));
    this.api.loadRecommendation(this.userId).subscribe(recommendations => {
      this.store.dispatch(userActions.setRecommendation({
        recommendations
      }));
      this.loading = false;
    })
  }
  nope() {

  }

  getStatusDiscription(status: StatusRecommndationEnum) {
    switch (status) {
      case StatusRecommndationEnum.APPROVED:
        return 'Cогласовано с врачом';
      case StatusRecommndationEnum.SAVED:
        return 'Сохранено';
      case StatusRecommndationEnum.SENDED_TO_DOCTOR:
        return 'Отправлено врачу';
      default:
        return '';
    }
  }

  showRating(id: string) {
    this.store.dispatch(userActions.showRating({ id }))
  }
  setRating(id: string, rating: number) {
    this.store.dispatch(userActions.updateRecommendation({ recommendation: { id, rating } }));
  }

  sendToDoctor(id: string) {
    this.loading = true;
    this.api.sendtToDoctor(id).subscribe(res => {
      if (res) {
        this._snackBar.open('Рекомендация отправлена ответственному врачу')
        this.store.dispatch(userActions.updateRecommendation({ recommendation: { id, canSendToDoctor: false } }));
      } else {

      }
      this.loading = false;
    });
  }

  save(recommendation: Recommendation) {
    this.loading = true;
    this.api.saveRecommendation(recommendation).subscribe(res => {
      if (res) {
        this._snackBar.open('Рекомендация сохраненна')
        this.store.dispatch(userActions.updateRecommendation({ recommendation: { id: recommendation.id, status: StatusRecommndationEnum.SAVED } }));
      } else {

      }
      this.loading = false;
    });

  }

}
