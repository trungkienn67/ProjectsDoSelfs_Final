import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Chart, ChartType, Color } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.scss']
})
export class DataDashboardComponent implements OnInit {


  public chartData: any = { labels: [], values: [] };

  public revenueChart: any;// Khai báo revenueChart như một thuộc tính kiểu Chart | null


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
      this.pieChartLabels = data.labels; 
      console.log(data);

      this.pieChartData = {
        datasets: [{
          data: data.values,  
          backgroundColor: this.pieChartColors.slice(0, data.labels.length),  
        }]
        
      };
    });
  }


  getColorsForTypes(labels: string[]): string[] {
    const colors: string[] = [];
    
    const colorMap: { [key: string]: string } = {
      'Hybrid': 'green',  
      'Electric': 'blue', 
      'SUV': 'purple',    
      'Sedan': 'orange',  
      'Petrol': 'red',    
      'Diesel': 'gray',   
      'CNG': 'yellow',    
      
    };
  
    labels.forEach(label => {
      colors.push(colorMap[label] || 'black'); 
    });
  
    return colors;
  }
  

  getAllData(){
    this.sv.getALL().subscribe((res)=>{
      this.AllData = res;
      console.log(res);
      this.createChart(); 
    })
  }

  

  getRevenue(){
    this.sv.getRevenue().subscribe((res)=>{
      console.log(res);
      this.chartData = res;
      const maxRevenue = Math.max(...this.chartData.values); 
      const normalizedData = this.chartData.values.map((value: number) => (value / maxRevenue) * 100); 

      this.chartData.values = normalizedData;
    })
  }



  
  createChart(): void {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;

    if (this.revenueChart) {
      this.revenueChart.destroy();
    }

    this.revenueChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.chartData.labels,  
        datasets: [{
          label: 'Revenue',
          data: this.chartData.values,  
          backgroundColor: '#4CAF50',
          borderColor: '#388E3C',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          datalabels: {
            display: true,
            color: 'white',
            formatter: (value: number, context: any) => {
              const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
              let percentage = Math.round((value / total) * 100);
              return percentage + '%';
            }
          }
        }
      },
      plugins: [ChartDataLabels] 
    });
  }
}
  