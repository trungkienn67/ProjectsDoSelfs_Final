import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-show-payment',
  templateUrl: './show-payment.component.html',
  styleUrls: ['./show-payment.component.scss']
})
export class ShowPaymentComponent implements OnInit {


  carFixs:any;
  postForm!:FormGroup;
  carFixId:number = this.active.snapshot.params["carFixId"];
  constructor(private sv:AdminService,private active:ActivatedRoute,private fb:FormBuilder,private msg:NzMessageService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      payment:[null,[Validators.required]],
      content:[null,[Validators.required]],
      carFixId:[null,[Validators.required]],
      userId:[null,[Validators.required]]
    })
    this.getCarFixById();
  }

  getCarFixById(){
    this.sv.getCarFixById(this.carFixId).subscribe((res)=>{
      console.log(res);
      this.carFixs = res;
      this.carFixs.processedImg = 'data:image/jpeg;base64,' + this.carFixs.returnedImage;

    })
  }


  postPaymentCarFix(){
    const formData = new FormData();
    formData.append('payment',this.postForm.get('payment')?.value);
    formData.append('content',this.postForm.get('content')?.value);
    formData.append('carFixId',this.postForm.get('carFixId')?.value);
    formData.append('userId',this.postForm.get('userId')?.value);
    this.sv.postCarFix(this.carFixId,formData).subscribe((res)=>{
      console.log(res);
      this.msg.success('Success',{nzDuration:5000});
    },error=>{
      this.msg.error('Error',{nzDuration:5000});
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
