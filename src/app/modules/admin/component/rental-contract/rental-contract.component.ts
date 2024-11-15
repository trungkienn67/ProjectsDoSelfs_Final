import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental-contract',
  templateUrl: './rental-contract.component.html',
  styleUrls: ['./rental-contract.component.scss']
})
export class RentalContractComponent implements OnInit {

rentalContractId:number = this.active.snapshot.params["rentalContractId"];
  rentalContracts:any;
  constructor(private sv:AdminService,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRentalCarById();
  }

  getRentalCarById(){
    this.sv.getRentalContractById(this.rentalContractId).subscribe((res)=>{
      this.rentalContracts = res;
      console.log(res);
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