import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-version',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './task-version.html',
  styleUrl: './task-version.css'
})
export class TaskVersion implements OnInit {

  constructor(private route: ActivatedRoute,
              private router : Router,
              private apiService : ApiService,
               private fb : FormBuilder
            ) {}


  openDocuments(taskId: number) {
    this.router.navigate(['/version', taskId, 'documents']);
  }
  
  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    console.log(taskId);
  }
}
