import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {


  cars : any=[];
  p: number = 1;
  isSpinning:boolean = false;
  constructor(private sv:CustomerService) { }

  ngOnInit() {
    this.getAllCars();
  }
  getAllCars(): void {
    this.sv.getAllCars().subscribe((res) => {
      console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });

    });
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    const regex = new RegExp(searchValue, 'i'); // 'i' cho phép không phân biệt hoa thường
  }
  searchText: string = ''; // Thêm biến lưu giá trị ô tìm kiế

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
