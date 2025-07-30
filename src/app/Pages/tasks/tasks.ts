import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { AddTask } from '../add-task/add-task';
import { ApiService } from '../../api-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  message: string = "";
  tasks: any[] = [];
  searchText: string = "";


  private dialog = inject(Dialog);
  protected openModal (){
    const dialogRef = this.dialog.open(AddTask);
    dialogRef.closed.subscribe(() => {
      setTimeout(() => {
        this.GetAllTask();
      }, 500);
    });
  }
  
  constructor(private router: Router,
              private route : ActivatedRoute,
              private fb : FormBuilder,
              private apiService : ApiService,
              private formBuilder : FormBuilder
  ){}

  

  GetAllTask() : void{
    this.apiService.GetAllTasks().subscribe({
      next : (response : any)  =>{
        this.tasks = response;
        this.tasks.forEach((task) => {
          this.apiService.GetFirstUpdaterNameByIds(task.id).subscribe({
            next: (name: string) => {
              task.firstUpdaterName = name;
            },
            error: (err) => {
              task.firstUpdaterName = "bilinmiyor";
            }
          });
        });
      },
      error (err:any){
        if(err.status === 404){
          console.log("tasklar bulunamadı");
        }
      }
    })
  }; 
  
  openVersions(taskId: number) {
    this.router.navigate(['/tasks', taskId, 'versions']);
  }

  GetLastUpdaterNameByTaskId(taskId:any): void{
    this.apiService.GetLastUpdaterNameByIds(taskId).subscribe({
      next : (response : any) =>{
        console.log(response)
      },
      error (err:any){
        if(err.status === 404){
          console.log("task bulunamadı");
        }
      }
    });
  }

  GetTaskByTitle(title:any) : void{
    this.apiService.GetTaskByTitles(title).subscribe({
      next : (response : any) => {
        console.log(response)
      },
      error (err:any){
        if(err.status === 404){
          console.log("task bulunamadı")
        }
      }
    });
  }
  GetTaskById(taskId:any): void{
    this.apiService.GetTaskByIds(taskId).subscribe({
      next : (response : any) => {
        console.log(response)
      },
      error (err:any) {
        if (err.status ===404){
          console.log("task bulunamadı")
        }
      }
    });
  }
  GetFirstUpdaterNameById(id:any): void{
    this.apiService.GetFirstUpdaterNameByIds(id).subscribe({
      next : (name : string) => {
        console.log(name)
      },
      error (err:any){
        if (err.status === 404){
          console.log("task bulunamadı")
        }
      }
    });
  }

  ngOnInit(): void {
    this.GetAllTask();
  }
  logOut() {
    localStorage.removeItem("userId");
    this.message = "Başarıyla çıkış yapıldı";
    setTimeout(() => {
      this.goToLogin();
    }, 1000);
  }
  goToLogin() {
    this.router.navigate(["/login"]);
  }
confirmDelete(id:any){
  if (confirm("Silmek istediğinden emin misin?")){
    this.deleteTask(id);
    this.GetAllTask();
  }
}

  deleteTask(id: any) {
    this.apiService.DeleteTaskByIds(id).subscribe({
      next: (response: any) => {
        alert("Task başarıyla silindi");
        this.GetAllTask();
      },
      error: (err: any) => {
        if (err.status === 404) {
          console.log("Task bulunamadı");
        }
      }
    });
  }

  filteredItems(){
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
