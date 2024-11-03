import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShowroomDetails, ShowroomForm, ShowroomHomePage } from '../../model/Showroom/ShowroomType.type';
import { environment } from '../../environment/environment';
import { Pageable } from '../../model/Pageable/Pageable.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowroomService {
  http = inject(HttpClient);

  getShowroomList(page: number, size: number, searchQuery: string = '', sortField: string = 'updatedAt', sortOrder: string = 'desc'): Observable<Pageable<ShowroomHomePage>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', searchQuery)
      .set('sort', `${sortField},${sortOrder}`);

    return this.http.get<Pageable<ShowroomHomePage>>(`${environment.apiUrl}/public/showroom`, { params });
  }

  createShowRoom(body: ShowroomForm) {
    return this.http.post<ShowroomHomePage>(`${environment.apiUrl}/private/showroom`, body);
  }

  getShowroomByCommercialRegistrationNumber(commercialRegistrationNumber: string) {
    return this.http.get<ShowroomDetails>(`${environment.apiUrl}/public/showroom/${commercialRegistrationNumber}`);
  }
}