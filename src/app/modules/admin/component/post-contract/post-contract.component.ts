import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-post-contract',
  templateUrl: './post-contract.component.html',
  styleUrls: ['./post-contract.component.scss']
})
export class PostContractComponent implements OnInit {


  postForm!:FormGroup;
  constructor(private sv:AdminService,private fb:FormBuilder,private msg:NzMessageService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      lessorName:[null,[Validators.required]],
      lesseeName:[null,[Validators.required]],
      lesseeIdCard:[null,[Validators.required]],
      lesseeAddress:[null,[Validators.required]],
      lesseePhone:[null,[Validators.required]],
      carId:[null,[Validators.required]],
      carName:[null,[Validators.required]],
      rentalStartDate:[null,[Validators.required]],
      rentalEndDate:[null,[Validators.required]],
      pickupLocation:[null,[Validators.required]],
      returnLocation:[null,[Validators.required]],
      rentalPricePerDay:[null,[Validators.required]],
      deposit:[null,[Validators.required]],
      paymentMethod:[null,[Validators.required]],
      isPaid:[null,[Validators.required]],
      insuranceDetails:[null,[Validators.required]],
      cancellationPolicy:[null,[Validators.required]]
    })
  }

  postContracts(carId:number){
    this.sv.postContract(this.postForm.value,carId).subscribe((res)=>{
      this.msg.success("Success",{nzDuration:5000});
    },error=>{
      this.msg.error("Error",{nzDuration:5000});
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
