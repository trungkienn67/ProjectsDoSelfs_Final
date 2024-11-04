import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-fix',
  templateUrl: './car-fix.component.html',
  styleUrls: ['./car-fix.component.scss']
})
export class CarFixComponent implements OnInit {


  carFix:any = [];
  isSpinning:boolean = false;
  postBodyForm!:FormGroup;
  carFixId:number = this.active.snapshot.params["carFixId"];
  constructor(private sv:AdminService,private msg:NzMessageService,private active:ActivatedRoute,private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.carFixId = this.active.snapshot.params["carFixId"];
    console.log('CarFix ID:', this.carFixId); // Kiểm tra giá trị của carFixId

    this.postBodyForm = this.fb.group({
      content:[null,[Validators.required]]
    })
    this.getAllCarFix();
    
  }

  getAllCarFix(){
    this.sv.getAllCarFix().subscribe((res)=>{
      this.carFix = res;
      console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        // this.carFix.push(element);
      });
    })
  }


  changeCarFixStatus(carFixId:number,status:string){
    this.sv.changeStatusCarFix(carFixId,status).subscribe((res)=>{
      console.log(res);
      this.getAllCarFix();
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
