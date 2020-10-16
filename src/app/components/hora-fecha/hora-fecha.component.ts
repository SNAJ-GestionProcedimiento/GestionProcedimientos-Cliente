import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-hora-fecha',
  templateUrl: './hora-fecha.component.html',
  styleUrls: ['./hora-fecha.component.css']
})
export class HoraFechaComponent implements OnInit {

  public horafechaForm:FormGroup;

  constructor(private formBuilder:FormBuilder) { 
    this.buildHorafechaForm();
  }

  ngOnInit(): void {
  }

  public buildHorafechaForm(){
    this.horafechaForm = this.formBuilder.group({
      date:['',[Validators.required]],
      hour:['',[Validators.required]],
      state:['',[]],
      room:['',[Validators.required]],
      stateromm:['',[]]
    });
    this.horafechaForm.get('date').valueChanges
    .subscribe(value =>{
      console.log(value);
    });
  }

}
