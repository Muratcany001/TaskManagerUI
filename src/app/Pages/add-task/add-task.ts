import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService, UserTask } from '../../api-service';
import { Tasks } from '../tasks/tasks';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask implements OnInit{

  AddTaskForm : FormGroup;
  errorMessage : string ="";
  returnUrl :string="/"
  task: any[] = [];
 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private fb: FormBuilder,
  private apiService: ApiService,
  private formBuilder: FormBuilder
) {
  this.AddTaskForm = this.formBuilder.group({
    title: ["", Validators.required],
    description: ["", Validators.required]
  });
}
 ngOnInit(): void {
  this.route.queryParams.subscribe(params=> {
    if (params["returnUrl"]){
      this.returnUrl = params["returnUrl"];
    }
  });
}

addTask(): void {
  if(this.AddTaskForm.invalid){
    return;
  }
  const task: UserTask = {
  title: this.AddTaskForm.value.title,
  description: this.AddTaskForm.value.description,
  firstUpdater: Number(localStorage.getItem("userId")),
  lastUpdater: Number(localStorage.getItem("userId"))
};
  const userId = Number(localStorage.getItem("userId"));
  console.log(task);
  this.apiService.CreateTask(task,userId).subscribe({
    next: (response:any) => {
      console.log(response);
      alert("Task başarıyla eklendi")
      const createdTaskId = response.id;
      this.router.navigate(['/tasks', createdTaskId, 'documents']);
    },
    error: (error:any) =>{
      console.log("task ekleme hatası",error);
    }
  });}
}
