import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-document',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './document.html',
  styleUrls: ['./document.css']
})
export class Document implements OnInit{


  ngOnInit(): void {
    
  }
}
