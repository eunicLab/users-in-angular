import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { myUser } from 'src/app/models/User';
import {UsersList} from 'src/app/models/User';


@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent {
  @Output() voted = new EventEmitter<boolean>();
  @Output() selectedRead = new EventEmitter<object>();
  @Output() changeUpdateError = new EventEmitter<string>();
  @Input() users: UsersList[]=[]; 
  @Input() update = ['Update'];  
  @Input() editable=['false'];  

  updateSaveButton = 'Update';
  selectedUser = { id: '', name: '', email: '', phone: '' };
  userReference = `${this.selectedUser.id}${this.selectedUser.name}`;
  highlighted:myUser={ id: '', name: '', email: '', phone: '' };
  constructor(private usersService: UsersService) { }

  highlight(myhighlighted: myUser) {
    
    this.highlighted = myhighlighted
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

  read(populateDetail: any, event: any) {
    event.stopPropagation();
    this.voted.emit(true);
    this.selectedRead.emit(populateDetail);
  }
  deleteUser(user: myUser) {
    this.usersService.deleteUser(user).subscribe();
    this.users = this.users.filter(t => t.id !== user.id);
  }

  updateClicked = (user: myUser, index: number, event: any) => {
    event.stopPropagation();
    if (this.update[index] === 'Update') {
      this.update[index] = 'Save';
      this.editable[index] = 'true';
    }
    else {
      let userName = document.getElementById(`userName${index}`);
          let email = document.getElementById(`email${index}`);
          let phone = document.getElementById(`phone${index}`);
      if (this.validateEmail(email?.innerHTML)) {
        if (this.validateNumber(phone?.innerHTML)) {
          this.update[index] = 'Update';
          this.editable[index] = 'false';
          let item = { id: user.id, name: userName?.innerHTML, email: email?.innerHTML, phone: phone?.innerHTML }
          this.usersService.patchUser(item).subscribe();
          this.users[index] = item;
          this.changeUpdateError.emit('')
        }
         else {
          this.changeUpdateError.emit('Please enter only numberical characters for mobile number!')
          }

      }     else {
          this.changeUpdateError.emit('Please Enter a valid Email Address!')
          }
    }
    
  }
  
}


