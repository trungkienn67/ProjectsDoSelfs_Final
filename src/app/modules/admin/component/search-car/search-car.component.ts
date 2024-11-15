import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {
  cars: any[] = []; // Đảm bảo là mảng
  isSpinning: boolean = false;
  searchCarForm!: FormGroup;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder, private sv: AdminService) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    });
  }

  ngOnInit() {
  }

  searchCar() {
    this.isSpinning = true; // Bắt đầu hiển thị spinner
    this.cars = []; // Đặt lại mảng cars để không bị trùng lặp

    console.log(this.searchCarForm.value);

    // Gọi API tìm kiếm xe
    this.sv.searchCar(this.searchCarForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.carDtoList) {
          res.carDtoList.forEach((element: { processedImg: string; returnedImage: string; }) => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
            this.cars.push(element);
          });
        }
        this.isSpinning = false; // Dừng hiển thị spinner
      },
      (error) => {
        console.error(error);
        this.isSpinning = false; // Dừng hiển thị spinner ngay cả khi có lỗi
      }
    );
  }

  
}
