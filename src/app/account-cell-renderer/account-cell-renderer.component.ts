import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

type AccountCellParams = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-account-cell',
  styleUrls: ['./account-cell-renderer.component.scss'],
  templateUrl: './account-cell-renderer.component.html',
})
export class AccountCellRendererComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  public id = 0;
  public name = '';

  agInit(params: ICellRendererParams & AccountCellParams): void {
    const { data } = params;

    this.id = data.id;
    this.name = data.name;

    this.params = params;
  }

  onDragStart(dragEvent: DragEvent) {
    const userAgent = window.navigator.userAgent;

    dragEvent.dataTransfer!.setData(
      'text/plain',
      'Dragged item with ID: ' + this.params.node.data.id
    );
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
