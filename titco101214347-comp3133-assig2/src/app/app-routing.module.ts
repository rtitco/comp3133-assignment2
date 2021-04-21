import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './forms/login/login.component';
import { RegistrationComponent } from './forms/registration/registration.component';
import { UserlistComponent } from './lists/userlist/userlist.component';
import { BookinglistComponent } from './lists/bookinglist/bookinglist.component';
import { HotellistComponent } from './lists/hotellist/hotellist.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatebookingformComponent } from './forms/createbookingform/createbookingform.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'users', component: UserlistComponent },
  { path: 'hotels', component: HotellistComponent },
  { path: 'bookings', component: BookinglistComponent },
  { path: 'bookings/add', component: CreatebookingformComponent },
  { path: 'profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
