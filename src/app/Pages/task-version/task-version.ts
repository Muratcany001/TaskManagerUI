import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api-service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-version',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './task-version.html',
  styleUrl: './task-version.css'
})
export class TaskVersion implements OnInit {
  taskId! : number;
  taskName: string = "";
  lastUpdater: string ="";
  selectedStatus: string = "";
  versions: any[] = [];
  searchText: string = "";
  constructor(private route: ActivatedRoute,
              private router : Router,
              private apiService : ApiService,
               private fb : FormBuilder
            ) {}
  openDocuments(versionId: number, taskId:number) {
    this.router.navigate(['/document', taskId, 'version', versionId, 'documents']);
  }
  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    console.log("TaskId from route:", taskId); 
    if (taskId) {
      this.taskId = Number(taskId);
      this.GetAllVersionsByTaskId(this.taskId);
      this.GetTaskTitle(this.taskId);
    } else {
      console.error("taskId bulunamadı");
    }
  }
  GetAllVersionsByTaskId(taskId: number){
    this.apiService.GetAllVersionsByTaskIds(taskId).subscribe({
      next : (response:any) =>{
        console.log(response);
        this.versions = response;
      },
      error (err:any){
        if(err.status === 404){
          console.log("task bulunamadı")
        }
      }
    });
  }
  GetTaskTitle(taskId: number) {
    this.apiService.GetTaskByIds(taskId).subscribe({
      next: (response: any) => {
        console.log("Task bilgisi:", response);
        this.taskName = response.title || `Task ${taskId}`;
        this.lastUpdater = response.lastUpdater;
      },
      error: (err: any) => {
        console.log("Task bilgisi yükleme hatası:", err);
        this.taskName = `Task ${taskId}`;
      }
    });
  }
  
  filteredItems(){
    return this.versions.filter(version =>
      (version.title && version.title.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (version.versionNumber && version.versionNumber.toString().toLowerCase().includes(this.searchText.toLowerCase())) ||
      (version.status && version.status.toLowerCase().includes(this.searchText.toLowerCase()))
    )
    if (this.versions.length == 0){
      console.log("versiyon bulunamadı");
    }
  }

    GetNewVersion(taskId : number, lastUpdaterId : number, status : string){
    if (!status) {
      alert("Lütfen bir durum seçin");
      return;
    }
    this.apiService.GetNewVersions(taskId, lastUpdaterId, this.selectedStatus).subscribe({
      next : (response : any)=> {
        console.log(response);
        alert("Yeni versiyon başarıyla oluşturuldu");
        this.GetAllVersionsByTaskId(this.taskId);
      },
      error(err:any){
          if(err.status === 500)
            console.error("Versiyon güncellenemedi")
          alert("Versiyon oluşturulurken hata oluştu");
      }
    });
  }
  ChangeStatusByTaskId(versionId:number, status :string){
    this.apiService.ChangeVersionStatus(versionId, status).subscribe({
      next : (response:any) => {
        console.log(response);
        console.log("istek başarılı");
      },
      error(err:any){
        if(err.status === 500){
          console.log("geçersiz api isteği")
        }
      }
    })
  }
  confirmDelete(id:any){
    if (confirm("Silmek istediğinden emin misin?")){
      this.DeleteLatestVersion(this.taskId);
    }}

  DeleteLatestVersion(taskId:number){
    this.apiService.DeleteLatestVersions(this.taskId).subscribe({
      next : (response:any) => {
        console.log(response);
        alert("En son versiyon başarıyla silindi");
        this.GetAllVersionsByTaskId(this.taskId);
      },
      error(err:any){
        console.log(err);
      }
    })
  }
}