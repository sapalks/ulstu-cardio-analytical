import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as components from './components';

export const routes: Routes = [
  { path: 'home', component: components.ListComponent },
  { path: 'user/:userId', component: components.ApproveComponent },
  { path: 'user/:userId/profile', component: components.ProfileComponent },
  { path: 'user/:userId/baseline', component: components.BaselineComponent },
  { path: 'user/:userId/lifestyle', component: components.LifestyleComponent },
  { path: 'user/:userId/additional', component: components.AdditionalComponent },
  { path: 'user/:userId/recommendation', component: components.RecommendationComponent },
  { path: 'user/:userId/questionnaire-rouse', component: components.QuestionnaireRouseComponent },
  { path: 'user/:userId/questionnaire-kop', component: components.QuestionnaireKopComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: components.PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
