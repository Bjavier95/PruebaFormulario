import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DatauserComponent } from './pages/datauser/datauser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import{ MatTabsModule } from '@angular/material/tabs'
import{ MatStepperModule } from '@angular/material/stepper'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DatauserComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatStepperModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
