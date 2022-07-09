import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PnfComponent } from './pnf/pnf.component';

const routes: Routes = [
  { path: 'home', component: ListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
