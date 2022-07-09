import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import * as adminStore from './store/admin.slice';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ListComponent } from './list/list.component';
import { PnfComponent } from './pnf/pnf.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    ListComponent,
    PnfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(adminStore.name, adminStore.reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
