import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {

  carId: number = this.activated.snapshot.params["id"];
  isSpinning: boolean = false;
  existingImage: string | null = null;
  imgChanged: boolean | undefined;
  selectedFile:any;
  imagePreview: string|ArrayBuffer|null = null;
  listOfOption: Array<{label: string; value:string}> = [];
  listOfBrands = ["BMW","AUDI","FERRARI","TESLA","VOLVO","TOYOTA","HONDA","FORD","NISSAN","HYUNDAI","LEXUS","KIA"];
  listOfType =["Petrol","Hybrid","Diesel","Electric","CNG"];
  listOfColor=["Red","White","Blue","Black","Orange","Grey","Silver"];
  listOfTranmission= ["Manual","Automatic"];
  updateForm!:FormGroup;

  constructor(private admin: AdminService,private activated: ActivatedRoute,private fb:FormBuilder,private msg: NzMessageService,private route:Router) { }

  ngOnInit() {
    this.getCarById();
    this.updateForm = this.fb.group({
      name: [null,Validators.required],
      brand:[null,Validators.required],
      type:[null,Validators.required],
      color:[null,Validators.required],
      transmission:[null,Validators.required],
      price: [null,Validators.required],
      description:[null,Validators.required],
      year:[null,Validators.required],
      carOwner:[null,Validators.required]
    })
  }


  getCarById(){
    this.isSpinning = true;
    this.admin.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    })
  }

  updateCar(){
    console.log(this.updateForm.value);
    this.isSpinning = true;
    if (this.selectedFile && this.imgChanged) {
      const formData: FormData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('brand', this.updateForm.get('brand')?.value);
      formData.append('name',this.updateForm.get('name')?.value);
      formData.append('color',this.updateForm.get('color')?.value);
      formData.append('type', this.updateForm.get('type')?.value);
      formData.append('transmission', this.updateForm.get('transmission')?.value);
      formData.append('price', this.updateForm.get('price')?.value);
      formData.append('description', this.updateForm.get('description')?.value);
      formData.append('year', this.updateForm.get('year')?.value);
      formData.append('carOwner', this.updateForm.get('carOwner')?.value);

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
      this.admin.updateCar(this.carId,formData).subscribe(
        (res) => {
          this.isSpinning = false;
          this.msg.success("Car updated successfully", { nzDuration: 5000 });
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

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
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
