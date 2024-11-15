import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-rental-contract',
  templateUrl: './list-rental-contract.component.html',
  styleUrls: ['./list-rental-contract.component.scss']
})
export class ListRentalContractComponent implements OnInit {


  rentalContracts:any
  p: number = 1;
  isSpinning:boolean = false;
  constructor(private sv:CustomerService,private msg:NzMessageService) { }

  ngOnInit(): void {
    this.getAllRentalContract();
  }


  getAllRentalContract(){
    this.sv.getAllRentalContract().subscribe((res)=>{
      this.rentalContracts = res;
      console.log(res);
    })
  }

  changeStatus(rentalContractId:number,status:string){
    this.sv.changeRentalCarStatus(rentalContractId,status).subscribe((res)=>{
      this.msg.success("Change Success",{nzDuration:5000});
      this.rentalContracts = res;
      this.getAllRentalContract();
    },error=>{
      this.msg.error("Change Error",{nzDuration:5000});
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
