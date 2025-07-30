import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-document',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './document.html',
  styleUrls: ['./document.css']
})
export class Document implements OnInit{
  versionId!: number;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.versionId = Number(this.route.snapshot.paramMap.get('versionId'));
  
  }
}
