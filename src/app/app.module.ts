import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';


@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(
      {
        position: {
          horizontal: {
            position: 'right',
            distance: 12
          },
          vertical: {
            position: 'top',
            distance: 12,
            gap: 10
          }
        }
      }
    )
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
