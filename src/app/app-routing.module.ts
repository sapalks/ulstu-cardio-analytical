import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as components from './components';

export const routes: Routes = [
  { path: 'home', component: components.ListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: components.PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
