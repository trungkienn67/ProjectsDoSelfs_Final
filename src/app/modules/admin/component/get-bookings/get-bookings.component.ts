import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss']
})
export class GetBookingsComponent implements OnInit {

  bookings : any;
  p: number = 1;
  isSpinning:boolean=false;
  constructor(private sv:AdminService,private msg:NzMessageService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings(){
    this.sv.getCarBookings().subscribe((res)=>{
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingStatus(bookingId: number,status: string){
    this.isSpinning = false;
    console.log(bookingId,status);
    this.sv.changeBookingsStatus(bookingId,status).subscribe((res)=>{
      this.isSpinning =false;
      console.log(res);
      this.getBookings();
      this.msg.success("Changed",{nzDuration:5000});
    }, error =>{
      this.msg.error("Error",{nzDuration:5000});
    })
  }


}
