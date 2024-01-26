import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  url='https://blog-app-pzh6.onrender.com/article/';

  create(article:any){
    return this.http.post(this.url+'ajout',article);
  }

  delete(id:any){
    return this.http.delete(this.url+'supprimer/'+id)
  }

  update(id:any,article:any){
    return this.http.put(this.url+'update/'+id,article)
  }

  getAllArticle(){
    return this.http.get(this.url+'get');
  }

  getArticleById(id:any){
    return this.http.get(this.url+'get/'+id);
  }

  getArticleByIdAuthor(id:any){
    return this.http.get(this.url+'getarticlebyauthor/'+id);
  }

  getAuthorDataFromToken(){
    let token=localStorage.getItem('token');
    if(token){
      let data=JSON.parse(window.atob(token.split('.')[1]))
      return data;
    }
  }
  
}
