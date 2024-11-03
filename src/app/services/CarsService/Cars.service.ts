import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShowroomDetails, ShowroomForm, ShowroomHomePage } from '../../model/Showroom/ShowroomType.type';
import { environment } from '../../environment/environment';
import { Pageable } from '../../model/Pageable/Pageable.type';
import { Car, CarCreation, CarTable } from '../../model/Cars/Car.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  http = inject(HttpClient);
  getCarList(page: number, size: number, searchQuery: string = '', sortField: string = 'updatedAt', sortOrder: string = 'desc'): Observable<Pageable<CarTable>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', searchQuery)
      .set('sort', `${sortField},${sortOrder}`);

    return this.http.get<Pageable<CarTable>>(`${environment.apiUrl}/public/car`, { params });
  }
  createCar(body:CarCreation) {
    return this.http.post<Car>(`${environment.apiUrl}/private/car`,body);
  }
}
