import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarsService } from '../../services/CarsService/Cars.service';

@Component({
  selector: 'app-cars-form',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent implements OnInit {
  carForm!: FormGroup;
  carsService = inject(CarsService);
  fb = inject(FormBuilder);
  router = inject(Router);
  commercialRegistrationNumber!: string;
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.commercialRegistrationNumber = this.route.snapshot.paramMap.get('commercialRegistrationNumber')!;
    this.carForm = this.fb.group({
      vin: ['', [Validators.required, Validators.maxLength(25)]],
      maker: ['', [Validators.required, Validators.maxLength(25)]],
      model: ['', [Validators.required, Validators.maxLength(25)]],
      modelYear: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const carData = {
        ...this.carForm.value,
        showroomCrn: this.commercialRegistrationNumber
      };
      this.carsService.createCar(carData).subscribe({
        next: () => {
          this.router.navigate([`/showroom/${this.commercialRegistrationNumber}`]);
        },
        error: (err) => {
          console.error('Error creating car:', err);
        }
      });
    }
  }
}