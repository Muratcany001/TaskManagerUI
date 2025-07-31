import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api-service';
import { AddDocument } from '../add-document/add-document';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-document',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './document.html',
  styleUrls: ['./document.css']
})
export class Document implements OnInit {
  currentVersionId: any;
  versionId!: any;
  taskId!: number;
  versions: any[] = [];
  documents: any[] = [];
  taskName: string = "";
  lastUpdater: any;
  versionNumber: any;
  searchText: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    const versionId = this.route.snapshot.paramMap.get('versionId');
    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (versionId) {
      this.versionId = Number(versionId);
      this.GetVersionByVersionId(this.versionId);
    } else {
      console.error("versionId bulunamadı");
    }
    if (taskId) {
      this.taskId = Number(taskId);
      console.log("Component'te taskId set edildi:", this.taskId);
    } else {
      console.error("taskId bulunamadı");
    }
  }
  GetVersionByVersionId(versionId: number) {
    this.apiService.GetVersionByVersionId(versionId).subscribe({
      next: (response: any) => {
        this.documents = response.documents;
        this.versionNumber = response.versionNumber;
      },
      error(err: any) {
        if (err.status === 404) {
          console.log("task bulunamadı");
        }
      }
    });
  }
  openAddDocuments(versionId: number, taskId:number) {
    this.router.navigate(['/document', taskId, 'version', versionId, 'documents' , taskId , 'addDocument']);
  
  
  }


 

  private dialog = inject(Dialog);
  protected openModal() {
    const dialogRef = this.dialog.open(AddDocument, {
      data: { 
        taskId: this.taskId,
        versionId: this.versionId
      }
    });
    dialogRef.closed.subscribe((result) => {
      console.log('Diyalog kapatıldı. Sonuç:', result);
      if (result) {
        this.GetVersionByVersionId(this.versionId);
      }
    });
  }

  filteredItems() {
    return this.documents.filter(docs =>
      docs.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}