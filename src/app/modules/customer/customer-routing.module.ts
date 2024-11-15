import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { BookCarComponent } from './component/book-car/book-car.component';
import { MyBookingsComponent } from './component/my-bookings/my-bookings.component';
import { SearchCarComponent } from './component/search-car/search-car.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { PostCommentComponent } from './component/post-comment/post-comment.component';
import { CarCommentComponent } from './component/car-comment/car-comment.component';
import { MyCommentComponent } from './component/my-comment/my-comment.component';
import { RentalContractComponent } from './component/rental-contract/rental-contract.component';
import { ListRentalContractComponent } from './list-rental-contract/list-rental-contract.component';

const routes: Routes = [
  {path:'dashboard',component: CustomerComponent},
  {path:'book/:id',component:BookCarComponent},
  {path:'rental/:id',component:RentalContractComponent},
  {path:'rental',component:ListRentalContractComponent},
  {path:"my_bookings",component:MyBookingsComponent},
  {path:"cars/search",component:SearchCarComponent},
  {path:'car-detail/:carId',component:CarDetailsComponent},
  {path:'comment/:carId',component:PostCommentComponent},
  {path:'comments',component:CarCommentComponent},
  {path:'my-comment',component:MyCommentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
