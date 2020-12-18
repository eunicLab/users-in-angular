import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Output() voted = new EventEmitter<boolean>();
  @Input() selectedRead: any;


  vote(agreed:boolean){
    this.voted.emit(agreed);
  }


  ngOnInit(): void {
  }

}
