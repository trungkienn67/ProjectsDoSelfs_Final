import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.scss']
})
export class DataDashboardComponent implements OnInit {


  public chartData: any = { labels: [], values: [] };


  AllData:any;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getRevenue();
  }

  getAllData(){
    this.sv.getALL().subscribe((res)=>{
      this.AllData = res;
      console.log(res);
    })
  }

  

  getRevenue(){
    this.sv.getRevenue().subscribe((res)=>{
      console.log(res);
      this.chartData = res;
    })
  }



  createChart(): void {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    
    // Nếu chart đã tồn tại thì hủy nó để vẽ lại
    if (this.chartData) {
      this.chartData.destroy();
    }

    // Tạo một đối tượng chart mới
    this.chartData = new Chart(canvas, {
      type: 'bar',  // Loại chart (cột)
      data: {
        labels: this.chartData.labels,  // Nhãn năm hoặc tháng
        datasets: [{
          label: 'Revenue',
          data: this.chartData.values,  // Dữ liệu doanh thu
          backgroundColor: '#4CAF50',  // Màu sắc cột
          borderColor: '#388E3C',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,  // Cho phép thay đổi kích thước biểu đồ
        scales: {
          y: {
            beginAtZero: true,  // Đảm bảo trục Y bắt đầu từ 0
            ticks: {
              stepSize: 10  // Điều chỉnh độ chia trên trục Y
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',  // Vị trí của legend (chú thích)
          }
        }
      } 
    });
  }
}
