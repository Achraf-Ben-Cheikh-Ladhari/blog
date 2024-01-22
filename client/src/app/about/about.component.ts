import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  users:any=[];
  article:any=[];
  constructor(private _auth:AuthService,private _articles:ArticleService){}

  ngOnInit(): void {
      this._articles.getAllArticle()
      .subscribe(res=>{
        this.article=res;
      })
      this._auth.getAll()
      .subscribe(res=>{
        this.users=res;
        for(let i=0;i<this.users.length;i++){
          this.users[i].count=0;
          for (let j=0;j<this.article.length;j++){
            if (this.users[i]._id == this.article[j].idAuthor){
              this.users[i].count=this.users[i].count+1;
            }
          }
        }
      })
  }
  update() {
    this.ngOnInit();
}  
}
