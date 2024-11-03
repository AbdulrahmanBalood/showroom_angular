import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShowroomDetails, ShowroomForm, ShowroomHomePage } from '../../model/Showroom/ShowroomType.type';
import { environment } from '../../environment/environment';
import { Pageable } from '../../model/Pageable/Pageable.type';
import { Car, CarCreation } from '../../model/Cars/Car.type';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  http = inject(HttpClient);
  getShowroomList(page: number = 0, size: number = 5) {
    return this.http.get<Pageable<Car>>(`${environment.apiUrl}/public/car`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        sort: 'updatedAt,desc'
      }
    });
  }
  createCar(body:CarCreation) {
    return this.http.post<Car>(`${environment.apiUrl}/private/car`,body);
  }
}
