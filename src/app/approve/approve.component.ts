import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getCookie, setCookie } from '../utils';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.less']
})
export class ApproveComponent implements OnInit {
  private readonly cookiesKey = 'ulstu-cardio-analytical-information-confirm';
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userId = this.route.snapshot.params['userId'];
    const isApproved = getCookie(this.cookiesKey);
    if (!isApproved) {
      return;
    }
    this.gotoProfile();
  }

  ngOnInit(): void {
  }

  submit() {
    setCookie(this.cookiesKey, '1', 100);
    this.gotoProfile();
  }

  gotoProfile() {
    this.router.navigate(['user', this.userId, 'profile'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

}
