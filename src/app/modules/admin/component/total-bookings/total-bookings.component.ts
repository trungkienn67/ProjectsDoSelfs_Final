import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-total-bookings',
  templateUrl: './total-bookings.component.html',
  styleUrls: ['./total-bookings.component.scss']
})
export class TotalBookingsComponent implements OnInit {


  bookACar:any;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllBookACar();
  }

  getAllBookACar(){
    this.sv.getCarBookings().subscribe((res)=>{
      console.log(res);
      this.bookACar = res;
    })
  }

}
