import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-get-all-comment',
  templateUrl: './get-all-comment.component.html',
  styleUrls: ['./get-all-comment.component.scss']
})
export class GetALlCommentComponent implements OnInit {


  isSpinning:boolean = false;
  comments:any;
  p: number = 1;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllComment();
  }

  getAllComment(){
    this.sv.getAllComment().subscribe((res)=>{
      console.log(res);
      this.comments = res;
    })
  }



}
