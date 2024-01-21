import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private url='http://127.0.0.1:3000/author/';
  register(author:any){
    return this.http.post(this.url+'register',author);
  }


  login(author:any){
    return this.http.post(this.url+'login',author);
  }

  getAll(){
    return this.http.get(this.url+'all');
  }
  
 
  isLoggedIn(){
    let token=localStorage.getItem('token');
    if(token){
      return true;
    }else{
      return false;
    }
  }

  getById(id:any){
    return this.http.get(this.url+'get/'+id);
  }

  
  getAuthorDataFromToken(){
    let token=localStorage.getItem('token');
    if(token){
      let data=JSON.parse(window.atob(token.split('.')[1]))
      return data;
    }
  }
  
}
