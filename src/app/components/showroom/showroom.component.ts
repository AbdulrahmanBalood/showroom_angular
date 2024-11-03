import { Component, inject, OnInit, signal } from '@angular/core';
import { ShowroomService } from '../../services/ShowroomService/showroom.service';
import { ShowroomHomePage } from '../../model/Showroom/ShowroomType.type';
import { catchError } from 'rxjs';
import { Pageable } from '../../model/Pageable/Pageable.type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-showroom',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './showroom.component.html',
  styleUrl: './showroom.component.css'
})
export class ShowroomComponent  implements OnInit{
  showRoomService = inject(ShowroomService);
  showroomItems = signal<Array<ShowroomHomePage>>([]);
  currentPage = signal(0);
  pageSize = signal(5);
  totalPages = signal(0);
  totalElements = signal(0);
  ngOnInit(): void {
    this.loadPage(this.currentPage());
  }

  loadPage(page: number) {
    this.showRoomService.getShowroomList(page, this.pageSize())
      .pipe(catchError((error) => {
        console.error(error);
        return [];
      }))
      .subscribe((data: Pageable<ShowroomHomePage>) => {
        this.showroomItems.set(data.content);
        this.totalPages.set(data.totalPages);
        this.totalElements.set(data.totalElements);
      });
  }

  changePage(newPage: number) {
    this.currentPage.set(newPage);
    this.loadPage(newPage);
  }
  trackByCommercialRegistrationNumber(index: number, item: ShowroomHomePage): string {
    return item.commercialRegistrationNumber;
  }

}
