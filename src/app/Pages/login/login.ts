import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginForm : FormGroup;
  errorMessage : string = "";
  returnUrl:string="/";
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route : ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ){
    this.loginForm= this.formBuilder.group({
      email: ["", Validators.required],
      password: ["",Validators.required]
    });
  }


ngOnInit(): void {
  
  this.route.queryParams.subscribe(params=> {
    if (params["returnUrl"]){
      this.returnUrl = params["returnUrl"];
    }
  });
}
  onLogin(): void {
    if(this.loginForm.invalid){
      return;
    }
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log("login denemesi",user);

    this.apiService.login(user).subscribe({
      next: (response: any) => {
        console.log("Login yanıtı", response);
        this.errorMessage = "Giriş başarılı" 
        this.router.navigate([this.returnUrl]);
      },
      error: (error: any) => {
        console.log("login hatası", error)
        if(error.status === 0){
          this.errorMessage = "Api sunucusuna bağlanılamıyor"
        }
        else if (error.status === 401){
          this.errorMessage = "Kullanıcı adı veya şifre hatalı";
        }
        else {
          this.errorMessage = "giriş yapılırken bir hata oluştu";
        }
      }
    });
  }

  get f(){
    return this.loginForm.controls;
  }
}
