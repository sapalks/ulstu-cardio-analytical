import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { getRandomUser } from '../mock/utils';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.less']
})
export class AddUserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const user = getRandomUser();
    this.dialogRef.close(user);
  }

}
