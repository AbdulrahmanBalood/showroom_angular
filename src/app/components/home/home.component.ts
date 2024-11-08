import { Component, inject, OnInit, signal } from '@angular/core';
import { ShowroomService } from '../../services/ShowroomService/showroom.service';
import { ShowroomHomePage } from '../../model/Showroom/ShowroomType.type';
import { catchError } from 'rxjs';
import { Pageable } from '../../model/Pageable/Pageable.type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showRoomService = inject(ShowroomService);
  showroomItems = signal<Array<ShowroomHomePage>>([]);
  currentPage = signal(0);
  pageSize = signal(5);
  totalPages = signal(0);
  totalElements = signal(0);
  searchQuery = signal('');
  sortOrder = signal('desc');

  ngOnInit(): void {
    this.loadPage(this.currentPage());
  }

  loadPage(page: number) {
    this.showRoomService.getShowroomList(page, this.pageSize(), this.searchQuery(), 'updatedAt', this.sortOrder())
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery.set(filterValue.trim().toLowerCase());
    this.loadPage(0); // Reset to first page on filter
  }

  changeSortOrder(event: Event) {
    const sortOrder = (event.target as HTMLSelectElement).value;
    this.sortOrder.set(sortOrder);
    this.loadPage(0); // Reset to first page on sort
  }

  trackByCommercialRegistrationNumber(index: number, item: ShowroomHomePage): string {
    return item.commercialRegistrationNumber;
  }
}