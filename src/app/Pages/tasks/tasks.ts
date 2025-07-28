import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  message: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    localStorage.removeItem("userId");
    this.message = "Başarıyla çıkış yapıldı";
    setTimeout(() => {
      this.goToLogin();
    }, 2000);
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
