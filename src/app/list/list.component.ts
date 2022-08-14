import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { users } from '../store/admin.selector';
import { FullStore, UserBaseInfo } from '../store/store.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  users$: Observable<UserBaseInfo[]>
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly api: ApiService,
    private readonly dialog: MatDialog,
  ) {
    this.users$ = this.api.users();
  }

  ngOnInit(): void {
  }


  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(model => {
      if (model) {
        this.api.addUser(model);
      }
    })
  }

  open(id: string) {
    this.router.navigate(['user', id, 'profile'], {
      queryParams: this.route.snapshot.queryParams
    });
  }

}
