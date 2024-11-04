import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

cars:any;
  carId:number = this.active.snapshot.params["carId"];

  constructor(private sv:HomeService,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCarById();
  }

  getCarById(){
    this.sv.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.cars =res;
      this.cars.processedImg = 'data:image/jpeg;base64,' + this.cars.returnedImage;
    })
  }

}
