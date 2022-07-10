import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    exports: [
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class MaterialModule { }