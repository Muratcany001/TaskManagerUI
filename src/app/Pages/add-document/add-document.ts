import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, TaskDocument } from '../../api-service';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-document',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-document.html',
  styleUrl: './add-document.css'
})
export class AddDocument implements OnInit{
versionId : any = ""
  AddDocumentForm : FormGroup;
  errorMessage : string = "";
  document: any[] = [];
  filePath : string = "";
  returnUrl :string="/"
  taskId : number = 0;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb : FormBuilder,
    private apiService : ApiService,
    public dialogRef: DialogRef<AddDocument>,
    @Inject(DIALOG_DATA) public data: { taskId: number, versionId: number } 
  ) {
    this.taskId = data.taskId;
    this.versionId = data.versionId;
    console.log("AddDocument diyaloğu bu taskId ile açıldı:", this.taskId);
    this.AddDocumentForm = this.fb.group({
      title: ["", Validators.required],
      filePath: ['', Validators.required]
    });
    }
  ngOnInit(): void {
    console.log("AddDocument diyaloğu bu taskId ile açıldı:", this.taskId);
    this.AddDocumentForm = this.fb.group({
      title: ["", Validators.required],
      filePath: ['', Validators.required]
  })
  }
  addDocument() : void {
    if(this.AddDocumentForm.invalid){
      return;
    }    
    const docs : TaskDocument = {
      title: this.AddDocumentForm.value.title,
      filePath : this.AddDocumentForm.value.filePath,
      taskId : this.taskId
    };
    console.log(this.taskId);
    this.apiService.CreateDocument(this.taskId, docs).subscribe({
      next: (response: AddDocument) => {
        console.log("Doküman başarıyla oluşturuldu:", response);
        this.dialogRef.close(response);
      },
      error: (err: any) => {
        console.error("Doküman oluşturulurken hata:", err);
        this.errorMessage = "Doküman oluşturulamadı. Lütfen tekrar deneyin.";
      }
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
