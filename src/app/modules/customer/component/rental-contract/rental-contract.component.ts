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


  id:number = this.active.snapshot.params["id"];
  rentalContracts:any;
  constructor(private active:ActivatedRoute,private sv:CustomerService,private msg:NzMessageService) { }

  ngOnInit(): void {
    this.getRentalContractById();
    console.log("Rental Contract ID from route: ", this.active.snapshot.params["id"]);

  }

  getRentalContractById(){
    this.sv.getContractById(this.id).subscribe((res)=>{
      this.rentalContracts = res;
      console.log(res);
    })
  }




}
