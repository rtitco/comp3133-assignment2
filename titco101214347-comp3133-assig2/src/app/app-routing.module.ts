import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserlistComponent } from './dashboard/lists/userlist/userlist.component';
import { BookinglistComponent } from './dashboard/lists/bookinglist/bookinglist.component';
import { HotellistComponent } from './dashboard/lists/hotellist/hotellist.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CreatebookingformComponent } from './dashboard/createbookingform/createbookingform.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', redirectTo: 'hotels', pathMatch: 'full' },
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
