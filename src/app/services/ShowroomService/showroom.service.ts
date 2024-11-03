import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShowroomHomePage } from '../../model/Showroom/ShowroomType.type';
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
}
