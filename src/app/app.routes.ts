import { Routes } from '@angular/router';
import { ShowroomComponent } from './components/showroom/showroom.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/AuthGuard/AuthGuard';
import { ShowroomFormComponent } from './components/showroom-form/showroom-form.component';
import { ShowroomDetailComponent } from './components/showroom-detail/showroom-detail.component';
import { CarsFormComponent } from './components/cars-form/cars-form.component';
import { CarsTableComponent } from './components/cars-table/cars-table.component';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
},
{
    path:'showroom-form',
    canActivate: [AuthGuard],
    component: ShowroomFormComponent
},
{
    path:'cars-form/:commercialRegistrationNumber',
    canActivate: [AuthGuard],
    component: CarsFormComponent
},
{
    path:'cars',
    component: CarsTableComponent
},
{ path: 'showroom/:commercialRegistrationNumber',
     component: ShowroomDetailComponent },
{
    path: '**',
    redirectTo: '/'
},
];
