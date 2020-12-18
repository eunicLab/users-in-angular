import { Component, OnInit, EventEmitter,Output, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Config } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import {UsersList} from 'src/app/models/User';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @Output() onAddGetAll: EventEmitter<any> = new EventEmitter();
   @Input() users: UsersList[]=[]; 


  username = '';
  email = '';
  phone = '';
  error = { errorMessage: '', errorType: '' };
  allusers: Config = {
    data: []
, status: '', message: ''};

  constructor(private usersService: UsersService) { }


  ngOnInit(): void {
    this.usersService.getUsers();
    console.log(this.usersService);

  }

  // Email validation
validateEmail(emailInput: any){
    const emailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailInput.match(emailformat)) {
      return true;
    } else {
      return false;
    }
  };

  // Number validation
 validateNumber(phoneInput: any){
    const numbers = /^[0-9]+$/;
    if (phoneInput.match(numbers)) {
      return true;
    } else {
      return false;
    }
 }
  
  addoneuser(oneitem: any) {
   this.usersService.addUsers(oneitem).subscribe(async data => {
     console.log(data);
    await this.onAddGetAll.emit();
   });
    
  }
   
    addItem() {
     if (this.username !== '') {
      if (this.validateEmail(this.email)) {
      if (this.validateNumber(this.phone)) {
      const newItem = {
        name: this.username,
        email: this.email,
        phone: this.phone,
      };
         this.addoneuser(newItem);
      this.username = '';
      this.email = '';
      this.phone = '';
      this.error = {errorMessage: '', errorType: ''};
      console.log(this.users);
            } else {
        this.error = {
          errorMessage: 'Please enter only numberical characters for mobile number!',
          errorType: 'phone'
        };
      }
      } else {
        this.error = {
          errorMessage: 'Please enter a valid email address!',
          errorType: 'email'
        };
    }
    }
   }

}
