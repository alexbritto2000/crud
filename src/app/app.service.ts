import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse,  HttpHeaders } from "@angular/common/http";
import  demo from '../assets/demo.json'; 
import { map, Observable } from 'rxjs';

@Injectable()
export class Appservice{
    todo : any | null;
    country:any;
    json = demo;
    requestOptions:any;
    products: any = (demo as any).default;
    httpService: any;
    
    constructor(private http: HttpClient){
      this.getJSON().subscribe(data => {
        //console.log(data);
      });
      }
      public getJSON(): Observable<any> {
        return this.http.get("./assets/demo.json");
      }
      getJsonServerData(){
        return this.http.get(`http://localhost:3000/profiles/`);
      }

      patchJsonTodoData(id:any, data:any){
        return this.http.patch(`http://localhost:3000/profiles/${id}`,data);
      }

      getallJsonTodoData(){
        return this.http.get(`http://localhost:3000/profiles/`);
      }

     /*  getallCountries(){
        let headers = new HttpHeaders()
        headers.append("X-CSCAPI-KEY", "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg==");
        return this.http.request('GET','https://api.countrystatecity.in/v1/countries',{ headers })
        .subscribe(Data => this.country = Data);
      } */

      getallCountries() : Observable<any> {
      let headers = new Headers();
      headers.append("X-CSCAPI-KEY", "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg==");

      this.requestOptions= {
        headers: new HttpHeaders({
          "X-CSCAPI-KEY": "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg=="
        })
      };
   
      //console.log(this.requestOptions);

      /* getCountries(): Observable<any>{
        const HTTP_OPTIONS={
          headers: new HttpHeaders({
            "X-CSCAPI-KEY": "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg=="
          })
        }
        return this.http.get("https://api.countrystatecity.in/v1/countries", HTTP_OPTIONS)
    
      } */

      return this.http.get(`https://api.countrystatecity.in/v1/countries`,this.requestOptions);
      //return result;
      }

      getallStates(iso2:any) : Observable<any> {
        let headers = new Headers();
        headers.append("X-CSCAPI-KEY", "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg==");
  
        this.requestOptions= {
          headers: new HttpHeaders({
            "X-CSCAPI-KEY": "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg=="
          })
        };
        return this.http.get(`https://api.countrystatecity.in/v1/countries/${iso2}/states`,this.requestOptions);
      }

      getallCities(iso2:any,stateiso2:any) : Observable<any> {
        let headers = new Headers();
        headers.append("X-CSCAPI-KEY", "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg==");
  
        this.requestOptions= {
          headers: new HttpHeaders({
            "X-CSCAPI-KEY": "OHZsckNibEUyZlN3WkNXblFnZzN0dDExR1FHNlRoWFQ5NXJ0bXVreg=="
          })
        };
        return this.http.get(`https://api.countrystatecity.in/v1/countries/${iso2}/states/${stateiso2}/cities`,this.requestOptions);
      }

      postJsonData(data: any){
        return this.http.post(`http://localhost:3000/profiles/`,data);
      }

      deleteJsonData(id: any){
        return this.http.delete(`http://localhost:3000/profiles/${id}`);
      }

      deleteAllJsonData(){
        return this.http.delete(`http://localhost:3000/profiles/`);
      }

      getTodoData(todoId: number=1){
        return this.http.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
      }

      getallTodoData(){
        return this.http.get(`https://jsonplaceholder.typicode.com/todos/`);
      }

      putTodoData(id:any,data: any){
        return this.http.put(`https://jsonplaceholder.typicode.com/todos/${id}`,data);
      }

      postData(data: any){
        return this.http.post<any>(`http://localhost:3000/post`,data).pipe(
          map(
            (res=>{
              return res;
            })))
      }
      /* const fs = require('fs');

      const saveData = (dog) =>{
        const finished = (error){
          if(error){
            console.error(error);
            return;
          }
        }
      }

      const jsonData = JSON.stringify(dog)
      fs.console.log('') */

      /* showUpdatedItem(newItem){
        let updateItem = this.itemArray.items.find(this.findIndexToUpdate, newItem.id);
        let index = this.itemArray.items.indexOf(updateItem);
        this.itemArray.items[index] = newItem;
      }

      findIndexToUpdate(newItem) { 
            return newItem.id === this;
      } */

      patchTdoData(id:any, data: any){
        return this.http.patch(`https://jsonplaceholder.typicode.com/todos/${id}`,data);
      }

      patchTodoData(id:any, data: any): Observable<any>{
        return this.http.patch(`./assets/demo.json/${id}`,data);
      }

      patchtodoData(id:any, data: any){
        //let index = this.json.indexOf(id);
        id--;
        this.json[id].title = data.title;
        this.json[id].userId = data.userId;
        this.json[id].completed = data.completed;
        console.log(demo);
        console.log(data);
        console.log(id);
        console.log(this.json[id].title);
      }

      postTodoData(data: any){
        return this.http.post(`https://jsonplaceholder.typicode.com/posts/`, data);
      }

      deleteTodoData(todoIds: any){
        return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${todoIds}`);
      }
      user = {
        name: 'Arthur',
        age: 21
       };
       
       patcTdoData(id:any, data: any){
       const options = {Headers, responseType: 'json' as 'demo'};
           this.http.put('./assets/demo.json', data).subscribe(
             Data => {
                console.log(data);
                data.title = 'stackoverflow';
       
             },
             (err: HttpErrorResponse) => {
               console.log (err.message);
             }
           );
      }

/*       this.appService.getTodoData(101)
      .subscribe(Data => {this.gettodo = Data; 
        console.log(this.gettodo);
      }); */
}


function getCountries() {
  throw new Error("Function not implemented.");
}

function HTTP_OPTIONS(arg0: string, HTTP_OPTIONS: any) {
  throw new Error("Function not implemented.");
}
     /*  let headers = new HttpHeaders()
      headers = headers.set('Authorization', 'Bearer Nn7Cm77Sh7lY0UrX5u0NsIjrqaZ05Ikma8rQGwElyv03b3DJV0OrJqHkV20PcglT8EgNpKGVcJdOv3t_9TXyz4PSg6uxF493PNMbFXh1v3Q5lidatWOU3ZrHAlhGX3Yx');
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Access-Control-Allow-Origin','*');
      this.http.request('GET', 'https://api.yelp.com/v3/businesses/search?location=alpharetta&term=icecream', { headers })
          .subscribe(
            res => {
              this.res = res;
              console.log('Result:', res)
            },
            err => {
              console.log('Error', err);
              this.err = err;
            },
          )
    } */
