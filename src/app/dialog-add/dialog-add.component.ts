import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { Appservice } from '../app.service';
import { DialogData } from '../app.component';

interface Branch {
  value: string;
  checked: any;
  viewValue: string;
}
interface FruitInterface {
  name: string;
  checked: boolean;
}
const RADIO_LIST_FROM_DATABASE = [
  {
    name: "Angular",
    checked: false
  },
  {
    name: "ReactJs",
    checked: false
  },
  {
    name: "Python",
    checked: false
  }
];

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent implements OnInit {

  countriesName: any;
  stateName: any;
  cityName: any;
  requestOptions:any;
  addForm: any;
  submitted= false;
  addVal: any;
  country = 'IN';
  state = 'TN';
  city = 'Chennai';
  error: any;
  pattodo: any;
  getalltodo : any;
  DataSource: any;
  @Output() sendData = new EventEmitter<any>();
  tech: FruitInterface[] = [];
  result: {
    selectedFruit: FruitInterface[];
    user_gender: string;
  } = { selectedFruit: [], user_gender: '' };

  constructor(@Inject(MAT_DIALOG_DATA)  public data: DialogData, public dialogRef: MatDialogRef<DialogAddComponent>, private fb: FormBuilder, private appService: Appservice) { 
    //this.DialogData=12;
  }

  ngOnInit(): void {
    //this.addVal = this.data;
    this.tech =  RADIO_LIST_FROM_DATABASE;
    console.log(this.getallCountries());
    this.addForm = this.fb.group({
      userId: ['',[Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      job: ['',[Validators.required]],
      branch: ['',[Validators.required]],
      country: ['IN',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      tech: new FormArray([]),
      empstatus: ['', [Validators.required]]
    });
    this._patchValues();
  }
  branchname: Branch[] = [
    {value: 'chennai', checked:true, viewValue: 'Chennai'},
    {value: 'covai', checked:true, viewValue: 'Covai'},
    {value: 'madurai', checked:true, viewValue: 'Madurai'},
  ];
  get f() { 
    return this.addForm.controls; }

    private _patchValues(): void {
      // get array control
      const formArray = this.addForm.get('tech') as FormArray;
      // loop for each existing value
      this.tech.forEach((fruit) => {
        // add new control to FormArray
        formArray.push(
          // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
          new FormGroup({
            name: new FormControl(fruit.name),
            checked: new FormControl(fruit.checked),
          })
        );
      });
    }

    onSubmit(formVal: any){
      this.submitted=true;
      if(this.addForm.invalid){
        return;
      }
      const { value } = this.addForm;
      // get selected fruit from FormGroup value
      const selectedFruit =
        value?.tech?.filter((f: FruitInterface) => f.checked) || [];
      // form value binded
      console.log('current form value: ', value);
      console.log('only selected form value: ', selectedFruit);
      // original value from database not change
      console.log('original tech list: ', this.tech);
      this.result = {
        user_gender: value?.user_gender || '',
        selectedFruit,
      };
      console.log(this.addForm.value);
      this.addVal = this.addForm.value;
      this.data = this.addVal;
      console.log(this.data);
      this.dialogRef.close(this.data);
    }
    sendDatatoParent(){
      console.log('event emit');
      this.sendData.emit(this.data);
    }       
    
    getallCountries() {
      let headers = new Headers();
      headers.append("X-CSCAPI-KEY", "a3BZNFJaRlFhN245WmlBbmNQa0dpRVJ2dXBTRUJ4d1ZWcjd2QjNQcA==");

      this.requestOptions= {
         method: 'GET',
         headers: headers,
         redirect: 'follow',
      };

       fetch("https://api.countrystatecity.in/v1/countries", this.requestOptions)
      .then(response => response.text())
      .then(result =>{ console.log(result);
        this.countriesName = JSON.parse(result);  
        console.log(this.countriesName);
                      })
      .catch(error => console.log('error', error));
      console.log(this.country);
      this.getState(this.country);
      return this.countriesName;
      }

    getState(iso2:any){
      let headers = new Headers();
      headers.append("X-CSCAPI-KEY", "a3BZNFJaRlFhN245WmlBbmNQa0dpRVJ2dXBTRUJ4d1ZWcjd2QjNQcA==");

      let requestOptions: any;
      requestOptions = {
       method: 'GET',
       headers: headers,
       redirect: 'follow'
      };

      fetch(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, requestOptions)
      .then(response => response.text())
      .then(result =>{ console.log(result)
                        this.stateName = JSON.parse(result);
                        console.log(this.stateName)
                      })
      .catch(error => console.log('error', error));
      this.getcities(this.country, this.state);
      }

    getcities(iso2:any, stateiso2:any){
      console.log(iso2);
      console.log(stateiso2);
      let headers = new Headers();
      headers.append("X-CSCAPI-KEY", "a3BZNFJaRlFhN245WmlBbmNQa0dpRVJ2dXBTRUJ4d1ZWcjd2QjNQcA==");

      let requestOptions:any;
      requestOptions = {
       method: 'GET',
       headers: headers,
       redirect: 'follow'
      };

      fetch(`https://api.countrystatecity.in/v1/countries/${iso2}/states/${stateiso2}/cities`, requestOptions)
      .then(response => response.text())
      .then(result =>{ console.log(result);
                        this.cityName = JSON.parse(result);
                        console.log(this.cityName);
                      })
      .catch(error => console.log('error', error));
    }
    
}
