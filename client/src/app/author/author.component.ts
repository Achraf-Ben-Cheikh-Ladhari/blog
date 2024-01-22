import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit{
  id:any;
  author:any;
  articles:any=[];
  
  constructor(public _auth:AuthService,private act:ActivatedRoute,private _article:ArticleService){}  
  ngOnInit(): void { 
    
    this.id=this.act.snapshot.paramMap.get('id');
    this._auth.getById(this.id)
    .subscribe(
      res=>{
        this.author=res;      
        this.author.count=0;

      }
    )
    this._article.getArticleByIdAuthor(this.id)
    .subscribe(res=>{
      this.articles=res;
      this.author.count=this.articles.length;
    })
    
    
  }

}
