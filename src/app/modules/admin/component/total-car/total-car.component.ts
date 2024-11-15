import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-total-car',
  templateUrl: './total-car.component.html',
  styleUrls: ['./total-car.component.scss']
})
export class TotalCarComponent implements OnInit {


  name: string = '';   // Lưu trữ tên xe muốn tìm kiếm

  listOfName: any;
  cars:any[]=[];
  p: number = 1;
  constructor(private sv:AdminService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCar();

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


  searchCarByName(name: string) {
    if (!name || name.trim() === '') {
      this.getAllCar(); // Hiển thị toàn bộ danh sách nếu input trống
      return;
    }
  
    this.sv.searchCarByName(name).subscribe(
      (res) => {
        this.cars = res.map((element: { processedImg: string; returnedImage: string; }) => ({
          ...element,
          processedImg: 'data:image/jpeg;base64,' + element.returnedImage
        }));
      },
      (error) => {
        console.error('Lỗi khi tìm kiếm:', error);
      }
    );
  }
}  
