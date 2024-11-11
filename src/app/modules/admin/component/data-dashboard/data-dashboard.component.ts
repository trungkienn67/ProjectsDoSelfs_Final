import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.scss']
})
export class DataDashboardComponent implements OnInit {


  AllData:any;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this.sv.getALL().subscribe((res)=>{
      this.AllData = res;
      console.log(res);
    })
  }

}
