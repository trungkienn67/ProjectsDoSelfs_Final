import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-post-rental-contract',
  templateUrl: './post-rental-contract.component.html',
  styleUrls: ['./post-rental-contract.component.scss']
})
export class PostRentalContractComponent implements OnInit {


  postForm!:FormGroup;
  constructor(private sv:AdminService,private fb:FormBuilder,private msg:NzMessageService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      bookACarId:[null,[Validators.required]],
      maintenanceTerms:[null,[Validators.required]],
      usageTerms:[null,[Validators.required]],
      terminationTerms:[null,[Validators.required]]
    })
  }
  

  postRentalContract(){
    this.sv.postRentalContract(this.postForm.value).subscribe((res)=>{
      this.msg.success("Success",{nzDuration:5000})
    },error=>{
      this.msg.error("Error",{nzDuration:5000})
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
