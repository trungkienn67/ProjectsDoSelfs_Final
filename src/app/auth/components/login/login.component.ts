import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  isSpinning:boolean=false;
  loginForm! : FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService,private msg:NzMessageService,private route: Router) { }

  ngOnInit() {
    this.loginForm =this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required]]
    })
  }


  login(){
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe((res)=>{
      console.log(res);
      if(res.userId !=null){
        const user ={
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if(StorageService.isAdminLoggedIn()){
          this.route.navigateByUrl("/admin/data-dashboard");
        } else if(StorageService.isCustomerLoggedIn()){
          this.route.navigateByUrl("/customer/dashboard");
        }else{
          this.msg.error("Bad Credential",{nzDuration:5000})
        }
      }
    })
  }
  //loại bỏ navbar đi đến luôn phần content

  ngAfterViewInit(): void {
    // Cuộn đến phần nội dung khi component được khởi tạo
    this.scrollToContent();
  }

  scrollToContent(): void {
    setTimeout(() => {
      const content = document.getElementById('content');
      if (content) {
        content.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 500); // Thay đổi thời gian tùy theo độ trễ của trang
  }
}
