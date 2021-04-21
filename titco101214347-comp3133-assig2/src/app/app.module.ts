//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Apollo
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

//Components
import { AppComponent } from './app.component';
import { RegistrationComponent } from './forms/registration/registration.component';
import { LoginComponent } from './forms/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotellistComponent } from './lists/hotellist/hotellist.component';
import { UserlistComponent } from './lists/userlist/userlist.component';
import { BookinglistComponent } from './lists/bookinglist/bookinglist.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatebookingformComponent } from './forms/createbookingform/createbookingform.component';
import { GraphqlService } from './services/graphql.service';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    HotellistComponent,
    UserlistComponent,
    BookinglistComponent,
    ProfileComponent,
    CreatebookingformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
    GraphqlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
