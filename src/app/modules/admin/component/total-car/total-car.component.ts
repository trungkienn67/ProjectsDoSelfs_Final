import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-total-car',
  templateUrl: './total-car.component.html',
  styleUrls: ['./total-car.component.scss']
})
export class TotalCarComponent implements OnInit {


  listOfName: any;
  cars:any[]=[];
  searchForm!:FormGroup;
  constructor(private sv:AdminService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCar();
    this.searchForm = this.fb.group({
      name:[null]
    })
    this.searchCarByName();
  }

  getAllCar(){
    this.sv.getAllCar().subscribe((res)=>{
      this.cars = res;
      console.log(res);
      this.cars = res.map((element: { processedImg: string; returnedImage: string; }) => ({
        ...element,
        processedImg: 'data:image/jpeg;base64,' + element.returnedImage
      }));
    })
  }


  searchCarByName(){
    this.sv.searchCarByName(this.searchForm.value).subscribe((res)=>{
      console.log(res);
      this.cars = res;
      res.carDtoList.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })
  }

}
