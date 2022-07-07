import { Component, OnInit } from '@angular/core';

import { Appservice } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import  demo from '../assets/demo.json';
import { Subject } from 'rxjs';
import { DialogAddComponent } from './dialog-add/dialog-add.component';

// Import the functions you need from the SDKs you need
export interface DialogData {
  userId: any;
  id: any;
  job: any;
  branch:any;
}
interface TechInterface {
  name: string;
  checked: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title:any;
  id = 1;
  i = 0;
  userId:any;
  gettodo : any |null;
  getalltodo : any | null;
  puttodo : any |null; 
  pattodo : any | null;
  deletetodo : any |null;
  afterdeltodo : any | null;
  employee: any;
  employeeName: any;
  employeeAge: any;
  employeeAddress: any;
  displayedColumns = [ 'userId', 'id', 'job', 'branch', 'tech', 'empstatus', 'actions'];
  ELEMENT_DATA: any;
  json: any;
  addVal:any;
  products: any = (demo as any).default;
  private searchTerms = new Subject<string>();
  completed: any;
  Tech: any;
  dataSource: any;

  ngOnInit(){
    console.log(demo);
    this.appService.getJsonServerData().subscribe(Data => {this.pattodo = Data;
      //console.log(this.pattodo);
      this.dataSource=this.pattodo;
      //console.log(this.dataSource);
      let value = this.dataSource;
      /* console.log(value);
      console.log(value?.tech?.filter((f: TechInterface) => f.checked) || []); */
      /* const selectedFruit =
      result?.tech?.filter((f: TechInterface) => f.checked) || [];
      console.log(selectedFruit); */
      console.log('tech');
      //console.log(this.appService.getallCountries());
      /* console.log('countries');
      console.log(this.Tech);
      console.log(this.dataSource); */
      });
      const heroes = this.dataSource;
      let marvelHeroes =  heroes.filter(function(check:any) {
        return check.checked == true;
      });
      //console.log("sj");
      //console.log(marvelHeroes);
    //this.dataSource.push({id:10,userId:this.userId,title:this.title,completed:this.completed});
  }  
  constructor(private appService: Appservice, public dialog: MatDialog){

    //console.log(this.dataSource);
    this.appService.getTodoData(101)
    .subscribe(Data => {this.gettodo = Data; 
      //console.log(this.gettodo);
    });

    this.appService.putTodoData(101,{userId:101, id:4, title:'test', completed:'true'})
    .subscribe(Data => this.puttodo = Data);

    this.appService.patchTodoData(101,{title:'testing'})
    .subscribe(Data => this.pattodo = Data);

    this.appService.deleteTodoData(101)
    .subscribe(Data => this.deletetodo = Data);

    this.appService.getTodoData(101)
    .subscribe(Data => this.afterdeltodo = Data);

    let post ={
        title: 'foo',
        body: 'bar',
        id: 101,
        userId: 1,
        completed: 'false' 
    }

    this.appService.postTodoData(post)
    .subscribe(response => this.afterdeltodo =response);

    this.appService.patchTodoData(101,{title:'testing'})
    .subscribe(Data => this.pattodo = Data);

     //console.log('All data');
  }
  

  CreateRecord(){
    alert("form is submit");
  }

  openEditDialog(element: any){
    /* console.log('dialog start');
    console.log(this.dialog);
    console.log('dialog end');
    console.log(element); */
    let dialogRef = this.dialog.open(DialogEditComponent, {data: {val:element}});
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
        /* console.log(element);
        console.log(this.dataSource);
        console.log(element.title);
        console.log('Before element data',this.ELEMENT_DATA); */
        //this.DataSource = this.DataSource.filter(({ title }) => title !== element.val.title);  
        //this.myArray = this.myArray.filter(item => item !== obj);
        /* console.log(this.Tech);
        console.log(result.tech);
        console.log('Element Id:',element);
        console.log('after element data:',this.ELEMENT_DATA); */
        //this.dataSource.push({userId:this.userId,id:10,title:this.title,completed:this.completed});
        //this.dataSource=this.addVal;
        /* console.log("Result");
        console.log(result); */
        this.appService.patchJsonTodoData(result.id,{userId:result.userId,job:result.job,country:result.country,branch:result.branch,state:result.state,city:result.city,tech:result.tech,empstatus:result.empstatus})
        .subscribe(Data =>
           {this.pattodo = Data;
            console.log(this.pattodo)});
        
        this.ngOnInit();
        this.refresh();
        //this.dataSource.data.push({id:10,userId:this.userId,title:this.title,completed:this.completed});
        //this.DataSource = this.ELEMENT_DATA;
    });
  }
  delElement(element:any){
    //console.log(element);
    this.appService.deleteJsonData(element.id).subscribe(Data => {this.pattodo = Data;
      /* console.log(this.pattodo); */
      this.dataSource=this.pattodo;});
      
      this.appService.getJsonServerData().subscribe(Data => {this.pattodo = Data;
        console.log(this.pattodo);
        this.dataSource=this.pattodo;});
  }
  delAllElement(){  
    //console.log(this.dataSource.length);
    let id=this.dataSource.length;
    //let id=4;
    //console.log(id);
    for (let i = 0; i < id+1; i++)
    {    
      this.appService.deleteJsonData(i).subscribe(Data => {this.pattodo = Data;
      //console.log(this.pattodo);
      this.dataSource=this.pattodo;});
      }
      this.appService.getJsonServerData().subscribe(Data => {this.pattodo = Data;
        //console.log(this.pattodo);
        this.dataSource=this.pattodo;});
  }

  openAddDialog(){

    let dialogRef = this.dialog.open(DialogAddComponent);
    dialogRef.disableClose = true;
    //this.DataSource=demo;
    //console.log(element);
    dialogRef.afterClosed().subscribe(async (result:any) =>{
     //console.log(result);
     this.addVal = result;
     /* console.log(this.dataSource);
      console.log(this.addVal);
      console.log(result);
      console.log(result.userId); */
      if(!!result.userId){
        console.log('hii');
      }
      if(!!result.userId && !!result.job){
      this.appService.postJsonData(result)
        .subscribe(Data => {this.pattodo = Data;});
      console.log(this.dataSource);
      }

      this.appService.getJsonServerData().subscribe(Data => {this.pattodo = Data;
        console.log(this.pattodo);
        this.dataSource=this.pattodo;});
    });
    this.ngOnInit();
    //this.refresh();
  }
  refresh() {
    //return this.http.get(`http://localhost:3000/profiles/`);
    this.appService. getJsonServerData();
    this.dataSource =  this.appService.getJsonServerData();
    //console.log(this.dataSource);
  }

}


