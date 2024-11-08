import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-rental-contract',
  templateUrl: './rental-contract.component.html',
  styleUrls: ['./rental-contract.component.scss']
})
export class RentalContractComponent implements OnInit {


  rentalContractId:number = this.active.snapshot.params["id"];
  rentalContracts:any[]=[];
  constructor(private active:ActivatedRoute,private sv:CustomerService,private msg:NzMessageService) { }

  ngOnInit(): void {
    this.getRentalContractById();
  }

  getRentalContractById(){
    this.sv.getContractById(this.rentalContractId).subscribe((res)=>{
      this.rentalContracts = res;
    })
  }

  changeStatus(status:string){
    this.sv.changeRentalCarStatus(this.rentalContractId,status).subscribe((res)=>{
      this.msg.success("Change Success",{nzDuration:5000});
      this.rentalContracts = res;
    },error=>{
      this.msg.error("Change Error",{nzDuration:5000});
    })
  }

}
