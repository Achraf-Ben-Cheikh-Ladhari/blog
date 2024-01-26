import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  idA:any=0;
  
  constructor(public _auth:AuthService,private act:ActivatedRoute,private _article:ArticleService,private router:Router){}  
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

  delete(idA:Number){
    this.idA=''
    this.idA=idA
    this._article.delete(this.idA).subscribe(res=>{
      this.ngOnInit()
    })
    //console.log(this.idA);
    
  }
  update(idA:Number){
    this.idA=''
    this.idA=idA
    this.router.navigate(["update/article/"+idA])
  }

}
