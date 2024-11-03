import { Routes } from '@angular/router';
import { ShowroomComponent } from './components/showroom/showroom.component';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    component: ShowroomComponent
    // loadComponent: ()=>{
    //     return import('./components/home/home.component').then(m => m.HomeComponent);
    // }
},
// {
//     path:'showroom',
//     canActivate: [AuthGuard],
//     component: ShowroomComponent
// },
{
    path: '**',
    redirectTo: '/'
},
];
