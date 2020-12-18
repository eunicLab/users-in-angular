import { Component, OnInit} from '@angular/core';
import { UsersList } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { Config } from 'src/app/models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myselectedRead: any;
  title = 'users-angular';
  agreed = 'noDisplay';
  users: UsersList[] = [];
  update = ['Update'];
  editable = ['false'];
  updateError = '';

  constructor(private usersService: UsersService) { }


  ngOnInit(): void{
      this.usersService.getUsers().subscribe((info: Config) =>  {
        this.users = info.data;
        this.update = new Array(this.users.length).fill('Update');
        this.editable = new Array(this.users.length).fill('false')
           console.log(this.update);
      });
  
  
  }

  onAddGetAll() {
    this.usersService.getUsers().subscribe((info: Config) =>  {
        this.users = info.data;
      this.update = [...this.update, 'Update']
      this.editable = [...this.editable, 'false']
           console.log(this.update);
      });
  
  }

  changeUpdateError(errorMessage:string) {
    this.updateError = errorMessage;
  }


  onVoted(myvote: boolean) {
    myvote ? this.agreed = 'container' : this.agreed = 'noDisplay';
  }

  onRead(selectedRead: any) {
    this.myselectedRead = selectedRead;
}
 


}
