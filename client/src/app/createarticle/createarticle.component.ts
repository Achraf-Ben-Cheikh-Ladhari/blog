import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit{
  article:any={
   title:'',
   description:'',
   content:'',
   tags:[]
  }

  tag:any='';

  image:any;
  select(e:any){
    this.image=e.target.files[0];
  }
  constructor(private _article:ArticleService, private router:Router){}
  ngOnInit(): void {
  }
  createarticle(){
    let fd=new FormData()
    fd.append('title',this.article.title)
    fd.append('content',this.article.content)
    fd.append('description',this.article.description)
    fd.append('tags',this.article.tags)
    fd.append('idAuthor',this._article.getAuthorDataFromToken()._id)
    fd.append('image',this.image)
    this._article.create(fd)
    .subscribe(
      res=>{
        this.router.navigate(['/author',this._article.getAuthorDataFromToken()._id]);
      }
    )
  }
}
