import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primaryoverviewn',
  templateUrl: './primaryoverviewn.component.html',
  styleUrls: ['./primaryoverviewn.component.css']
})
export class PrimaryoverviewnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isDropdownVisible: boolean = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
    console.log('Dropdown visibility:', this.isDropdownVisible);
  }
  
}
