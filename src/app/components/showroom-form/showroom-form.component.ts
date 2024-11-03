import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShowroomService } from '../../services/ShowroomService/showroom.service';

@Component({
  selector: 'app-showroom-form',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './showroom-form.component.html',
  styleUrls: ['./showroom-form.component.css']
})
export class ShowroomFormComponent implements OnInit {
  showroomForm!: FormGroup;
  showRoomService = inject(ShowroomService);
  fb = inject(FormBuilder);
  router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    this.showroomForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      commercialRegistrationNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      managerName: ['', Validators.maxLength(100)],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{1,15}$/)]],
      address: ['', Validators.maxLength(255)]
    });
  }

  onSubmit(): void {
    if (this.showroomForm.valid) {
      this.showRoomService.createShowRoom(this.showroomForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating showroom:', err);
        }
      });
    }
  }
}