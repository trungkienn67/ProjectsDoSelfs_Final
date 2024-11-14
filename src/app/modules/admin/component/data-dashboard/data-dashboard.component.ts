import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Chart, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.scss']
})
export class DataDashboardComponent implements OnInit {


  public chartData: any = { labels: [], values: [] };


  pieChartLabels: string[] = [];
  pieChartColors: string[] = [
    'red',      // Màu cho xe loại Petrol
    'green',    // Màu cho xe loại Hybrid
    'blue',     // Màu cho xe loại Electric
    'yellow',   // Màu cho xe loại CNG
    'orange',   // Màu cho xe loại Diesel
    'purple',   // Màu cho xe loại SUV
    'pink',     // Màu cho xe loại Sedan
    'brown',    // Màu cho xe loại Truck
    'grey',     // Màu cho xe loại Van
    'lightblue' // Màu cho xe loại Coupe
  ];
  
  pieChartData: any = {};
  pieChartType: ChartType = 'pie';
  pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          fontSize: 14,
          fontColor: '#000',
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            return tooltipItem.label + ': ' + tooltipItem.raw + '%';  // Hiển thị tỷ lệ phần trăm trong tooltip
          }
        }
      },
      datalabels: {  // Sử dụng plugin Chart.js để vẽ nhãn vào trong các phần của biểu đồ
        display: true,
        color: 'white',  // Màu chữ trong nhãn
        formatter: (value: any, context: any) => {
          let percentage = Math.round((value / this.pieChartData.reduce((a: any, b: any) => a + b, 0)) * 100);
          return percentage + '%';  // Hiển thị tỷ lệ phần trăm
        }
      }
    }
  };
  AllData:any;
  
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getRevenue();
    this.getPieChart();
  }



  getPieChart(): void {
    this.sv.getPieChartCar().subscribe((data: any) => {
      this.pieChartLabels = data.labels;  // Lấy nhãn từ backend (loại xe)
      console.log(data);

      this.pieChartData = {
        datasets: [{
          data: data.values,  // Số lượng xe
          backgroundColor: this.pieChartColors.slice(0, data.labels.length),  // Lấy màu sắc tương ứng với số lượng loại xe
        }]
        
      };
    });
  }


  getColorsForTypes(labels: string[]): string[] {
    const colors: string[] = [];
    
    // Mở rộng colorMap với các loại xe mới
    const colorMap: { [key: string]: string } = {
      'Hybrid': 'green',  // Màu cho Hybrid
      'Electric': 'blue', // Màu cho Electric
      'SUV': 'purple',    // Màu cho SUV
      'Sedan': 'orange',  // Màu cho Sedan
      'Petrol': 'red',    // Màu cho Petrol
      'Diesel': 'gray',   // Màu cho Diesel
      'CNG': 'yellow',    // Màu cho CNG
      // Thêm các loại xe khác tại đây nếu cần
    };
  
    labels.forEach(label => {
      colors.push(colorMap[label] || 'black'); // Nếu không có trong colorMap, dùng màu 'black' mặc định
    });
  
    return colors;
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
