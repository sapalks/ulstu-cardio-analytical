import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { kop } from '../store/consts';
import { CommitmentEnum, QuestionnaireAnswer } from '../store/store.model';

@Component({
  selector: 'app-questionnaire-kop',
  templateUrl: './questionnaire-kop.component.html',
  styleUrls: ['./questionnaire-kop.component.less']
})
export class QuestionnaireKopComponent implements OnInit {


  userId: string;
  questionnaire = kop;
  answers: { [key: number]: QuestionnaireAnswer } = {}
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
    this.answers[this.currentQuestion] = data;
    if (this.haveNextQuestion()) {
      this.currentQuestion++;
    } else {
      this.resultHandler();
    }
  }

  resultHandler() {
    let commitment: CommitmentEnum = this.calc();
    let text = this.getMessageTest(commitment);
    this.api.update(this.userId, { commitment });
    this._snackBar.open(text, 'Хорошо');

    this.router.navigate(['user', this.userId, 'lifestyle'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

  getPc(indexes: number[]): number {
    const answers = indexes.reduce((sum, el) => {
      return sum + Number(this.answers[el]!.value);
    }, 0);
    return answers;
  }

  calc() {
    const md = this.getPc([2, 3, 4, 6, 14]);
    const mm = this.getPc([1, 5, 10, 11, 13]);
    const mc = this.getPc([7, 8, 9, 12, 15]);
    const gd = this.getPc([16, 17, 18, 20, 21]);
    const gm = this.getPc([16, 19, 20, 24, 25]);
    const gc = this.getPc([19, 22, 23, 24, 25]);

    const cd = 1 / (((30 / md) * (60 / gd)) / 2) * 100;
    const cm = 1 / (((30 / mm) * (60 / gm)) / 2) * 100;
    const cc = 1 / (((30 / mc) * (60 / gc)) / 2) * 100;

    const c = (cm + 2 * cc + 3 * cd) / 6;

    if (c > 76) {
      return CommitmentEnum.HIGTH;
    }
    if (c > 51) {
      return CommitmentEnum.MEDIUM
    }
    return CommitmentEnum.LOW
  }

  getMessageTest(result: CommitmentEnum) {
    switch (result) {
      case CommitmentEnum.HIGTH:
        return 'Медицинские рекомендации и основанные на них действия пациентами выполняться будут или скорее будут';
      case CommitmentEnum.MEDIUM:
        return 'Медицинские рекомендации и основанные на них действия пациентами выполняться скорее будут, чем не будут';
      case CommitmentEnum.LOW:
      default:
        return 'Медицинские рекомендации и основан ные на них действия пациентами выполняться не будут или скорее не будут';
    }
  }

}
