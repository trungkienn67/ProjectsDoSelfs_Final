import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import{NzMessageService} from 'ng-zorro-antd/message'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  isSpinning :boolean=false;
  signupForm! : FormGroup;
  constructor(private fb:FormBuilder,private auth: AuthService,private msg: NzMessageService,private route: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null,[Validators.required]],
      email:[null,[Validators.required]],
      password:[null,[Validators.required]],
      checkPassword:[null,[Validators.required,this.confirmationValide]],
    })
  }

  confirmationValide = (control: FormControl): {[s: string] : boolean}=>{
    if(!control.value){
      return {required: true};
    } else if(control.value !== this.signupForm.controls['password'].value){
      return {confirm: true, error: true}
    }
    return {};
  }

  register(){
    console.log(this.signupForm.value);
    this.auth.register(this.signupForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id !=null){
        this.msg.success("Done",{nzDuration:5000});
        this.route.navigateByUrl('/login');
      }else{
        this.msg.error("Error",{nzDuration:5000});
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
