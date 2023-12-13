import {  OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-complaint-filter',
  templateUrl: './complaint-filter.component.html',
  styleUrls: ['./complaint-filter.component.css']
})
export class ComplaintFilterComponent  {
  selectedStatus: string = '';
  @Output() filterApplied = new EventEmitter<string>();
  constructor() { }

 
  applyFilter(): void {
    this.filterApplied.emit(this.selectedStatus);
  }

}
