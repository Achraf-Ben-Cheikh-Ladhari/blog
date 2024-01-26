import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit{
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  article:any={
   title:'',
   description:'',
   content:'',
   tags:[],
   timer:0
  }
id:any
  tag:any='';

  image:any;
  select(e:any){
    this.image=e.target.files[0];
  }

  constructor(private _article:ArticleService, private router:Router,private act:ActivatedRoute){}
  ngOnInit(): void {
    this.id=this.act.snapshot.paramMap.get('id');
    if (this.id != undefined){
      this._article.getArticleById(this.id).subscribe(res=>{
        this.article=res
      })
    }
  }

  updatearticle(){
    let fd=new FormData()
    fd.append('title',this.article.title)
    fd.append('content',this.article.content)
    fd.append('description',this.article.description)
    fd.append('tags',this.article.tags)
    fd.append('idAuthor',this._article.getAuthorDataFromToken()._id)
    fd.append('timer',this.article.timer)
    fd.append('image',this.image)
    this._article.update(this.id,fd).subscribe(res=>{
      this.router.navigate(['/article/'+this.id,this._article.getAuthorDataFromToken()._id]);
    })
  }


  createarticle(){
    let fd=new FormData()
    fd.append('title',this.article.title)
    fd.append('content',this.article.content)
    fd.append('description',this.article.description)
    fd.append('tags',this.article.tags)
    fd.append('idAuthor',this._article.getAuthorDataFromToken()._id)
    fd.append('timer',this.article.timer)
    fd.append('image',this.image)
    this._article.create(fd)
    .subscribe(
      res=>{
        this.router.navigate(['/author',this._article.getAuthorDataFromToken()._id]);
      }
    )
  }
}
