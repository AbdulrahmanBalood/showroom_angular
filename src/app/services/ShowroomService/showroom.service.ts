import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShowroomDetails, ShowroomForm, ShowroomHomePage } from '../../model/Showroom/ShowroomType.type';
import { environment } from '../../environment/environment';
import { Pageable } from '../../model/Pageable/Pageable.type';

@Injectable({
  providedIn: 'root'
})
export class ShowroomService {
  http = inject(HttpClient);
  getShowroomList(page: number = 0, size: number = 5) {
    return this.http.get<Pageable<ShowroomHomePage>>(`${environment.apiUrl}/public/showroom`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        sort: 'updatedAt,desc'
      }
    });
  }
  createShowRoom(body:ShowroomForm) {
    return this.http.post<ShowroomHomePage>(`${environment.apiUrl}/private/showroom`,body);
  }
  getShowroomByCommercialRegistrationNumber(commercialRegistrationNumber: string) {
    return this.http.get<ShowroomDetails>(`${environment.apiUrl}/public/showroom/${commercialRegistrationNumber}`);
  }
}
