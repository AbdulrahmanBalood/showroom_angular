import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShowroomService } from '../../services/ShowroomService/showroom.service';

@Component({
  selector: 'app-showroom-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './showroom-detail.component.html',
  styleUrl: './showroom-detail.component.css'
})
export class ShowroomDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  showroomService = inject(ShowroomService)
  commercialRegistrationNumber!: string;
  showroom!: any;

  ngOnInit(): void {
    this.commercialRegistrationNumber = this.route.snapshot.paramMap.get('commercialRegistrationNumber')!;
    this.showroomService.getShowroomByCommercialRegistrationNumber(this.commercialRegistrationNumber).subscribe(showroom => {
      this.showroom = showroom;
    });
  }

}
