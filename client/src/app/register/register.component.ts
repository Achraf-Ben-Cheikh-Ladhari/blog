import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  err=undefined;
  author:any={
    name:'',
    lastname:'',
    email:'',
    password:'',
    about:''
  }
  image:any=undefined;
  nameAuthor:any='';
  select(e:any){
    this.image=e.target.files[0];
  }
  id:any;
  constructor(private _auth:AuthService, private router:Router,private act:ActivatedRoute){}

  ngOnInit(): void {

    this.id=this.act.snapshot.paramMap.get('id');
    if (this.id != undefined){
      this._auth.getById(this.id).subscribe(res=>{
        this.author=res;
        this.author.password='';
        this.author.image;
        this.nameAuthor=this.author.name;
      })
    }

    
      
  }
  modify(){
    let fd=new FormData()
    fd.append('name',this.author.name)
    fd.append('lastname',this.author.lastname)
    fd.append('email',this.author.email)
    if (this.author.password!=''){
      fd.append('password',this.author.password)
    }
    if (this.image!=undefined){
      fd.append('image',this.image)
    }
    fd.append('about',this.author.about)
    this._auth.update(this.id,fd).subscribe(res=>{
      this.router.navigate(['author/'+this.id]);
    })
  }
  register(){
    let fd=new FormData()
    fd.append('name',this.author.name)
    fd.append('lastname',this.author.lastname)
    fd.append('email',this.author.email)
    fd.append('password',this.author.password)
    fd.append('about',this.author.about)
    fd.append('image',this.image)
    this._auth.register(fd)
    .subscribe(
      res=>{
        this.router.navigate(['/login']);
      },err=> {
        this.err=err;
      }
    )
  }
}
