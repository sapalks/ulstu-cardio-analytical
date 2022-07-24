import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import * as adminStore from './store/admin.slice';
import * as userStore from './store/user.slice';
import * as components from './components';
import * as pipes from './pipe';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

@NgModule({
  declarations: [
    components.AppComponent,
    components.ListComponent,
    components.PnfComponent,
    components.AddUserDialogComponent,
    components.HeaderComponent,
    components.ProfileComponent,
    components.ApproveComponent,
    components.UserLeftColumnComponent,
    components.LoaderComponent,
    components.BaselineComponent,
    components.LifestyleComponent,
    components.AdditionalComponent,
    components.RecommendationComponent,


    pipes.UserSearchPipe,
    pipes.YesNoPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(adminStore.name, adminStore.reducer),
    StoreModule.forFeature(userStore.name, userStore.reducer),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [components.AppComponent]
})
export class AppModule { }
