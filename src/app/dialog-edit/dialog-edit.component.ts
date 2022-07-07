import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup } from '@angular/forms';
import { Appservice } from '../app.service';
import  demo from '../../assets/demo.json';

interface Branch {
  value: string;
  checked: any;
  viewValue: string;
}

interface FruitInterface {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {

  countriesName: any;
  allCountries: any;
  stateName: any;
  cityName: any;
  editForm: any;
  submitted= false;
  editVal: any;
  error: any;
  pattodo: any;
  getalltodo : any;
  requestOptions: any;
  DataSource: any;
  countryVal:any;
  products: any = (demo as any).default;
  countries: Array<any> = [
    { name: 'Angular', checked:'true', value: 'Angular' },
    { name: 'ReactJs', checked:'true', value: 'ReactJs' },
    { name: 'Python', checked:'true', value: 'Python' }
  ];
  tech: FruitInterface[] = [];
  result: {
    selectedFruit: FruitInterface[];
    user_gender: string;
  } = { selectedFruit: [], user_gender: '' };

  constructor(@Inject(MAT_DIALOG_DATA)  public data: any, public dialogRef: MatDialogRef<DialogEditComponent>,  private fb: FormBuilder, private appService: Appservice) { 
    //this.getallCountries();
    
  }

  ngOnInit(): void {
    this.editVal = this.data;
    console.log("API key");
    this.appService.getallCountries()
    .subscribe(response => {this.allCountries =response;
                            console.log(this.allCountries);});
                            console.log(this.allCountries);
    // console.log()
    this.getallCountries();
    console.log(this.getallCountries());
    // console.log(this.getState(this.editVal.val.state))
    /* this.getState(this.editVal.val.country); */
    // console.log(this.getState(this.editVal.val.state));
    this.getState(this.editVal.val.state);
    this.getcities(this.editVal.val.state,this.editVal.val.city);
    /* console.log(this.editVal.val.state);
    console.log(this.editVal);
    console.log(this.data.action); */
    this.tech = this.editVal.val.tech;
    // console.log(this.appService.getallCountries());
    /* console.log(this.countriesName); */

    //console.log(ELE)
    this.editForm = this.fb.group({
      userId: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      job: ['',[Validators.required]],
      branch: ['',[Validators.required]],
      country: [this.editVal.val.country,[Validators.required]],
      state: [this.editVal.val.state,[Validators.required]],
      city: [this.editVal.val.city,[Validators.required]],
      tech: new FormArray([]),
      empstatus: [this.editVal.val.empstatus, [Validators.required]]
    });
    this._patchValues();
    
  }
  branchname: Branch[] = [
    {value: 'chennai', checked:true, viewValue: 'Chennai'},
    {value: 'covai', checked:true, viewValue: 'Covai'},
    {value: 'madurai', checked:true, viewValue: 'Madurai'},
  ];
  get f() { 
    //console.log(this.registrationForm.controls);
    return this.editForm.controls; }

    private _patchValues(): void {
      // get array control
      const formArray = this.editForm.get('tech') as FormArray;
     /*  console.log(this.editForm.get('tech') as FormArray); */
      // loop for each existing value
      this.tech.forEach((tech) => {
        // add new control to FormArray
        formArray.push(
          // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
          new FormGroup({
            name: new FormControl(tech.name),
            checked: new FormControl(tech.checked),
          })
        );
      });
    }

    onSubmit(formVal: any){
      this.submitted=true;
      if(this.editForm.invalid){
        return;
      }
      const { value } = this.editForm;
      // get selected fruit from FormGroup value
      console.log(value);
      const selectedFruit =
        value?.tech?.filter((f: FruitInterface) => f.checked) || [];
      // form value binded
      //console.log('current form value: ', value);
      //console.log('only selected form value: ', selectedFruit);
      this.editForm.value.technology = selectedFruit.map((obj:any) => obj.name);
      //console.log(this.editForm.value.technology);
      // original value from databasex not change
      //console.log('original tech list: ', this.tech);
      this.result = {
        user_gender: value?.user_gender || '',
        selectedFruit,
      };
      this.editForm.value.id=this.data.val.id;
      //console.log(this.editForm.value);
      //console.log(this.editVal.val);
      //this.dialogRef.close(this.editForm.value);
        console.log(this.data.val.id);
        console.log(this.editForm.value);
      this.dialogRef.close(this.editForm.value);
    }

    async getallCountries1() {
      //console.log(this.editForm);
      console.log(1);
      //this.appService.getallCountries();
      //console.log(this.appService.getallCountries());
      this.appService.getallCountries()
    .subscribe(response => {this.allCountries =response;
                            console.log(this.allCountries);});
      let headers = new Headers();
      headers.append("X-CSCAPI-KEY", "a3BZNFJaRlFhN245WmlBbmNQa0dpRVJ2dXBTRUJ4d1ZWcjd2QjNQcA==");

      this.requestOptions= {
         method: 'GET',
         headers: headers,
         redirect: 'follow',
      };

      await fetch("https://api.countrystatecity.in/v1/countries", this.requestOptions)
      .then(response => response.text())
      .then(result =>{ //console.log(result);
        this.countriesName = JSON.parse(result);  
        //console.log(this.countriesName);
                      })
      .catch(error => console.log('error', error));
      //console.log(this.editVal.val.country);
      this.getState(this.editVal.val.country);
      //return this.countriesName;
      }

      async getallCountries(){
        await this.appService.getallCountries()
    .subscribe(response => {this.allCountries =response;
                            this.countriesName =response});
                            this.getState(this.editVal.val.country);
      }

      async getState(iso2:any){
       await this.appService.getallStates(iso2)
    .subscribe(response => {this.stateName =response});
      if(iso2==this.editVal.val.country){
      this.getcities(this.editVal.val.country, this.editVal.val.state);
      }
       else{
        this.getcities(iso2, null);
      } 
      }

      async getcities(iso2:any, stateiso2:any){
        await this.appService.getallCities(iso2,stateiso2)
    .subscribe(response => {this.cityName =response;});
      }

    async getState1(iso2:any){
      console.log(2);
      //console.log('get state');
      console.log(iso2);
      //console.log(iso2.value);
      //console.log(iso2);
      let headers = new Headers();
      headers.append("X-CSCAPI-KEY", "a3BZNFJaRlFhN245WmlBbmNQa0dpRVJ2dXBTRUJ4d1ZWcjd2QjNQcA==");

      let requestOptions: any;
      requestOptions = {
       method: 'GET',
       headers: headers,
       redirect: 'follow'
      };

      await fetch(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, requestOptions)
      .then(response => response.text())
      .then(result =>{ //console.log(result)
                        this.stateName = JSON.parse(result);
                        console.log(this.stateName)
                      })
      .catch(error => console.log('error', error));
      if(iso2==this.editVal.val.country){
      this.getcities(this.editVal.val.country, this.editVal.val.state);
      }
       else{
        this.getcities(iso2, null);
      } 
      //this.getcities(this.editVal.val.country, this.editVal.val.state);
      //sreturn this.stateName;
      }

    async getcities1(iso2:any, stateiso2:any){
      console.log(3);
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
      .then(result =>{ //console.log(result);
                        this.cityName = JSON.parse(result);
                        console.log(this.cityName);
                      })
      .catch(error => console.log('error', error));
    }
    
  /* onCheckboxChange(name: string, event: any) {
    console.log(name);
    console.log(event);
    const tech = (this.editForm.controls.tech as FormArray);
    if (event.checked) {
      tech.push(new FormControl(name));
    } else {
      const index = tech.controls.findIndex(x => x.value === name);
      tech.removeAt(index);
    }
  } */

}

