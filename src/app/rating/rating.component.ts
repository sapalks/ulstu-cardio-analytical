import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.less']
})
export class RatingComponent implements OnInit {

  @Input('rating')
  lastRating: number | null = 1;
  rating = 1;

  @Input('disabled')
  disabled: boolean = false

  @Output('change')
  change = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  set(value: number) {
    this.rating = value;
  }

  save(value: number) {
    this.rating = this.lastRating = value;
    this.change.emit(value);
  }
  leave() {
    this.rating = this.lastRating ?? 0;
  }

}
