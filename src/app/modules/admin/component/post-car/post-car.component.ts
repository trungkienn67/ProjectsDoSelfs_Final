import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent implements OnInit {

isSpinning:boolean=false;
selectedFile: File | null = null;
imagePreview: string | ArrayBuffer | null = null ;
listOfOption: Array<{label: string; value:string}> = [];
listOfBrands = ["BMW","AUDI","FERRARI","TESLA","VOLVO","TOYOTA","HONDA","FORD","NISSAN","HYUNDAI","LEXUS","KIA"];
listOfType =["Petrol","Hybrid","Diesel","Electric","CNG"];
listOfColor=["Red","White","Blue","Black","Orange","Grey","Silver"];
listOfTranmission= ["Manual","Automatic"];

postCarForm! : FormGroup;


  constructor(private fb:FormBuilder,private adminService:AdminService,private msg:NzMessageService,private route:Router) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null,Validators.required],
      brand: [null,Validators.required],
      type : [null,Validators.required],
      color : [null,Validators.required],
      transmission:[null,Validators.required],
      price: [null,Validators.required],
      description: [null,Validators.required],
      year:[null,Validators.required],
      carOwner:[null,Validators.required]
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('brand', this.postCarForm.get('brand')?.value);
      formData.append('name',this.postCarForm.get('name')?.value);
      formData.append('color',this.postCarForm.get('color')?.value);
      formData.append('type', this.postCarForm.get('type')?.value);
      formData.append('transmission', this.postCarForm.get('transmission')?.value);
      formData.append('price', this.postCarForm.get('price')?.value);
      formData.append('description', this.postCarForm.get('description')?.value);
      formData.append('year', this.postCarForm.get('year')?.value);
      formData.append('carOwner', this.postCarForm.get('carOwner')?.value);

      // const formData = {
      //   name: this.postCarForm.value.name,
      //   brand: this.postCarForm.value.brand,
      //   color:this.postCarForm.value.color,
      //   type: this.postCarForm.value.type,
      //   transmission: this.postCarForm.value.transmission,
      //   price: this.postCarForm.value.price,
      //   description: this.postCarForm.value.description,
      //   year: this.postCarForm.value.year,
      //   image: this.postCarForm.value.image
      // }
      console.log(formData);
      this.adminService.postCar(formData).subscribe(
        (res) => {
          this.isSpinning = false;
          this.msg.success("Car posted successfully", { nzDuration: 5000 });
          this.route.navigateByUrl("/admin/dashboard");
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
