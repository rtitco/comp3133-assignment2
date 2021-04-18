//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotellistComponent } from './dashboard/lists/hotellist/hotellist.component';
import { UserlistComponent } from './dashboard/lists/userlist/userlist.component';
import { BookinglistComponent } from './dashboard/lists/bookinglist/bookinglist.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CreatebookingformComponent } from './dashboard/createbookingform/createbookingform.component';

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
    CreatebookingformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
