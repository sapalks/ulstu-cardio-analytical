import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { users } from '../store/admin.selector';
import { FullStore, UserBaseInfo } from '../store/store.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  users$: Observable<UserBaseInfo[]>
  query: string = '';

  constructor(
    private readonly store: Store<FullStore>,
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

}
