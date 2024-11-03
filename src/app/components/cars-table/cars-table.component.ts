import { Component, inject, OnInit, signal } from '@angular/core';
import { CarTable } from '../../model/Cars/Car.type';
import { catchError } from 'rxjs';
import { Pageable } from '../../model/Pageable/Pageable.type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../services/CarsService/Cars.service';

@Component({
  selector: 'app-cars-table',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.css']
})
export class CarsTableComponent implements OnInit {
  carService = inject(CarsService);
  carItems = signal<Array<CarTable>>([]);
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
    this.carService.getCarList(page, this.pageSize(), this.searchQuery(), 'updatedAt', this.sortOrder())
      .pipe(catchError((error) => {
        console.error(error);
        return [];
      }))
      .subscribe((data: Pageable<CarTable>) => {
        this.carItems.set(data.content);
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

  trackByUuid(index: number, item: CarTable): string {
    return item.uuid;
  }
}