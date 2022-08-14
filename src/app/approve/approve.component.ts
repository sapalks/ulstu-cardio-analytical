import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.less']
})
export class ApproveComponent implements OnInit {
  @Output()
  approved = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.approved.emit(true);
  }

}
