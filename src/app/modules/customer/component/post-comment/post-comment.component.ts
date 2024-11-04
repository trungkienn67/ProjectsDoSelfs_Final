import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {

  commentForm!:FormGroup;
  cars:any;
  carId: number = this.active.snapshot.params["carId"];
  constructor(private sv:CustomerService,private fb:FormBuilder,private active:ActivatedRoute,private notice:NzMessageService,private route:Router) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      body:[null,[Validators.required]],
      rating:[null,[Validators.required]]
    })
    this.getCarById();
  }


  getCarById(){
    this.sv.getCarById(this.carId).subscribe((res)=>{
      this.cars = res;
      this.cars.processedImg = 'data:image/jpeg;base64,' + this.cars.returnedImage;
    })
  }

  // getCarById() {
  //   this.sv.getCarById(this.carId).subscribe((res) => {
  //     // Nếu res là đối tượng duy nhất, không phải mảng
  //     this.cars = [res]; // Chuyển đổi thành mảng để dùng với *ngFor
  //     this.cars[0].processedImg = 'data:image/jpeg;base64,' + this.cars[0].returnedImage;
  //     this.commentForm.patchValue(res);
  //   });
  // }

  postComment(){
    const formData = {
      body: this.commentForm.value.body,
      rating:this.commentForm.value.rating
    }
    this.sv.postComment(formData,this.carId).subscribe((res)=>{
      console.log(res);
      this.getCarById();
      this.notice.success("Success",{nzDuration:5000})
      this.route.navigateByUrl("/customer/my-comment");
    },error=>{
      this.notice.error("Error",{nzDuration:5000});
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
