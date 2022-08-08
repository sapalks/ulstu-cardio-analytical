import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionnaireAnswer, QuestionnaireItem } from '../store/store.model';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.less']
})
export class QuestionnaireItemComponent implements OnInit {

  @Input()
  question: QuestionnaireItem;

  @Output()
  response: EventEmitter<QuestionnaireAnswer> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onResponse(data: QuestionnaireAnswer) {
    this.response.emit(data);
  }

}
