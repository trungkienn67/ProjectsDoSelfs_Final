import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './component/post-car/post-car.component';
import { UpdateCarComponent } from './component/update-car/update-car.component';
import { GetBookingsComponent } from './component/get-bookings/get-bookings.component';
import { SearchCarComponent } from './component/search-car/search-car.component';
import { GetALlCommentComponent } from './component/get-all-comment/get-all-comment.component';
import { CarStatusComponent } from './component/car-status/car-status.component';
import { CarFixComponent } from './component/car-fix/car-fix.component';
import { ContractComponent } from './component/contract/contract.component';
import { PostContractComponent } from './component/post-contract/post-contract.component';
import { PostRentalContractComponent } from './component/post-rental-contract/post-rental-contract.component';
import { RentalContractComponent } from './component/rental-contract/rental-contract.component';
import { ShowPaymentComponent } from './component/show-payment/show-payment.component';

const routes: Routes = [
  {path:"dashboard",component:AdminDashboardComponent},
  {path:"car",component:PostCarComponent},
  {path:"cars/:id",component:UpdateCarComponent},
  {path:"bookings",component:GetBookingsComponent},
  {path:"search",component:SearchCarComponent},
  {path:'all-comment',component:GetALlCommentComponent},
  {path:'car-status',component:CarStatusComponent},
  {path:'car-fix',component:CarFixComponent},
  {path:'contract',component:ContractComponent},
  {path:'post-contract/:carId', component: PostContractComponent },
  {path:'rental-contract/:rentalContractId',component:PostRentalContractComponent},
  {path:'rental-contract',component:RentalContractComponent},
  {path:"show-payment/:carFixId",component:ShowPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
