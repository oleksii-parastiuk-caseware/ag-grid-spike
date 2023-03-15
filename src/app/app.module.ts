import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { AccountsGridComponent } from './accounts-grid/accounts-grid.component';
import { GroupsGridComponent } from './groups-grid/groups-grid.component';
import { AccountCellRendererComponent } from './account-cell-renderer/account-cell-renderer.component';

@NgModule({
  declarations: [AppComponent, AccountsGridComponent, GroupsGridComponent, AccountCellRendererComponent],
  imports: [BrowserModule, HttpClientModule, AgGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
