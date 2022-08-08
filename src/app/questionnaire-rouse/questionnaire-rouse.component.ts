import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { rouse } from '../store/consts';
import { QuestionnaireAnswer, SymptomsOfAnginaPectorisEnum } from '../store/store.model';

@Component({
  selector: 'app-questionnaire-rouse',
  templateUrl: './questionnaire-rouse.component.html',
  styleUrls: ['./questionnaire-rouse.component.less']
})
export class QuestionnaireRouseComponent implements OnInit {

  userId: string;
  questionnaire = rouse;
  answers: QuestionnaireAnswer[] = [];
  currentQuestion = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
  }

  getCurrentQuestion() {
    const question = this.questionnaire.find(o => o.index === this.currentQuestion);

    return question!;
  }

  haveNextQuestion(): boolean {
    return !!this.questionnaire.find(o => o.index === this.currentQuestion + 1);
  }

  onResponse(data: QuestionnaireAnswer) {
    this.answers.push(data);
    if (this.haveNextQuestion()) {
      this.currentQuestion++;
    } else {
      this.resultHandler();
    }
  }

  resultHandler() {
    const importantAnswers = this.answers.filter(o => o.value === '!').length;
    let symptomsOfAnginaPectoris: SymptomsOfAnginaPectorisEnum = SymptomsOfAnginaPectorisEnum.NO_SYMPTOMS;
    let text = 'Все хорошо! Симптомов не обнаружено.';
    if (importantAnswers >= 2) {
      symptomsOfAnginaPectoris = SymptomsOfAnginaPectorisEnum.GOTO_CARDIOLOGIST;
      text = 'Необходимо записаться к кардиологу.';
    }
    this.api.update(this.userId, { symptomsOfAnginaPectoris });
    this._snackBar.open(text, 'Хорошо');

    this.router.navigate(['user', this.userId, 'lifestyle'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

}
