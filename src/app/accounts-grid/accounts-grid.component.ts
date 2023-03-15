import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AccountCellRendererComponent } from '../account-cell-renderer/account-cell-renderer.component';
import { Account, DataService } from '../data.service';

@Component({
  selector: 'app-accounts-grid',
  templateUrl: './accounts-grid.component.html',
  styleUrls: ['./accounts-grid.component.scss'],
})
export class AccountsGridComponent {
  public rowData$: Observable<Account[]>;
  private gridApi!: GridApi;

  constructor(private readonly dataService: DataService) {
    this.rowData$ = this.dataService.generateAccounts$();
  }

  columnDefs: ColDef[] = [
    {
      rowDrag: true,
      field: 'account',
      cellRenderer: AccountCellRendererComponent,
      checkboxSelection: true,
      width: 400,
      getQuickFilterText: function (params) {
        return params.data.id;
      },
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  public onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('search-text-box') as any).value
    );
  }
}
