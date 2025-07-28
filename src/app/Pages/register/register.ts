import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
  registerForm : FormGroup;
  errorMessage : string ="";
  returnUrl:string = "/";

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private apiService : ApiService,
    private formBuilder : FormBuilder
  ){
    this.registerForm = this.formBuilder.group({
      name : ["", Validators.required],
      email : ["", Validators.required],
      password : ["", Validators.required]
    });
  }

  ngOnInit(): void {
   this.route.queryParams.subscribe(params=> {
    if (params["returnUrl"]){
      this.returnUrl = params["returnUrl"];
    }
   }); 
  }

  onRegister():void{
    
    if(this.registerForm.invalid){
      return;
    }
    const user = {
      name : this.registerForm.value.name,
      email : this.registerForm.value.email,
      password : this.registerForm.value.password
    }
    console.log("register denemesi", user)

    this.apiService.CreateUsers(user).subscribe({
      next : (response :any)=> {
        console.log("register yanıtı", response);
        this.errorMessage = "kayıt başarılı"
        this.router.navigate([this.returnUrl]);
        const userId = response.id;
        localStorage.setItem("userId", userId.toString());
        console.log(userId);
        this.errorMessage = ""
      },
      error: (error:any)=> {
        console.log("login hatası", error)
        if(error.status === 0){
          this.errorMessage = "Api sunucusuna bağlanılamıyor"
        }
        else if (error.status === 401){
          this.errorMessage = "Geçersiz kullanıcı bilgileri"
        }
        else if (error.status === 400){
          this.errorMessage = "Kullanıcı zaten mevcut"
        }
        else{
          this.errorMessage = "kayıt yapılırken bir hata oluştu"
        }
      }
    });
  }
  get f(){
    return this.registerForm.controls;
  }
}
