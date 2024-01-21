import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{

  article:any;
  id:any;
  users:any=[];
  user:any;
  constructor(private _art:ArticleService,private act:ActivatedRoute,private _auth:AuthService){}

  ngOnInit(): void {
    this.id=this.act.snapshot.paramMap.get('id');
    this._art.getArticleById(this.id)
    .subscribe(res=>{
      this.article=res;      
    })
    this._auth.getAll()
    .subscribe(res=>{
      this.users=res;
      for(let i=0;i<this.users.length;i++){
        if (this.article.idAuthor==this.users[i]._id){
          this.user=this.users[i];
          break;
        }
      }
    }
    )

  }

}
