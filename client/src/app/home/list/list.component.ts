import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  article:any=[];
  users:any=[];
  constructor(private _article:ArticleService, private _auth:AuthService){}
  
  ngOnInit(): void { 
    this._article.getAllArticle().subscribe(res=>{
      this.article=res;      
    })

    this._auth.getAll().subscribe(res=>{
      this.users=res;
    })
   
    
    
  }

}
