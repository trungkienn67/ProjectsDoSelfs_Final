import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-car-comment',
  templateUrl: './car-comment.component.html',
  styleUrls: ['./car-comment.component.scss']
})
export class CarCommentComponent implements OnInit {


  cars :any = [] ;
  constructor(private sv:CustomerService) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(){
    this.sv.getAllCars().subscribe((res)=>{
      console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })
  }
  
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
