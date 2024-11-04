import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-car-fix',
  templateUrl: './car-fix.component.html',
  styleUrls: ['./car-fix.component.scss']
})
export class CarFixComponent implements OnInit {


  isSpinning:boolean = false;
  listOfCars:any=[];
  CarFixForm!:FormGroup;
  selectedFile: File | null = null;
imagePreview: string | ArrayBuffer | null = null ;
  constructor(private sv:CustomerService,private route:Router,private fb:FormBuilder,private msg:NzMessageService,private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.CarFixForm = this.fb.group({
      description:[null,[Validators.required]],
      carId:['',[Validators.required]],
      userId:['',[Validators.required]]
    })
    this.getAllCar();
  }


  getAllCar(){
    this.sv.getAllCars().subscribe((res)=>{
      this.listOfCars = res;
      console.log(res);
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }


  postCarFix(){
    this.isSpinning = true;
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append("description",this.CarFixForm.get('description')?.value);
      formData.append("carId",this.CarFixForm.get('carId')?.value);
      formData.append("userId",this.CarFixForm.get('userId')?.value);
      this.sv.postCarFix(formData).subscribe(
        (res) => {
          this.isSpinning = false;
          this.msg.success("CarFix posted successfully", { nzDuration: 5000 });
          this.route.navigateByUrl("/customer/dashboard");
          console.log(res);
        },
        (error) => {
          this.isSpinning = false;
          this.msg.error("Error", { nzDuration: 5000 });
          console.error(error);
        }
      );
    } else {
      this.isSpinning = false;
      this.msg.error("Please select an image", { nzDuration: 5000 });
    }
  }



  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imagePreview = null;
    }
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
