import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: any[] = [];
  filteredCars: any[] = []; // Biến giữ danh sách đã lọc
  p: number = 1;

  constructor(private sv: HomeService) { }

  ngOnInit(): void {
    this.getAllCar();
  }

  getAllCar(): void {
    this.sv.getAllCar().subscribe((res) => {
      console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
      this.filteredCars = [...this.cars]; // Sao chép danh sách xe ban đầu vào danh sách đã lọc
    });
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    const regex = new RegExp(searchValue, 'i'); // 'i' cho phép không phân biệt hoa thường

    if (!searchValue.trim()) {
      // Nếu ô tìm kiếm trống, hiển thị lại danh sách ban đầu
      this.filteredCars = [...this.cars];
      return;
    }
  
    this.filteredCars = this.cars.filter(car =>
      regex.test(car.name)
    );
  }
  searchText: string = ''; // Thêm biến lưu giá trị ô tìm kiếm
  
}
