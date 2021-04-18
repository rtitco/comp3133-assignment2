import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createbookingform',
  templateUrl: './createbookingform.component.html',
  styleUrls: ['./createbookingform.component.css']
})
export class CreatebookingformComponent implements OnInit {

  message = ""

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.message = "Booking Success"
  }

}
