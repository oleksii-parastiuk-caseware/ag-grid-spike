import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-enterprise';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    console.log('DATA', this.dataService.generateGroupsWithPaths());
  }
}
