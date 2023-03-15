import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowDragEndEvent,
} from 'ag-grid-community';

import { DataService, Group } from '../data.service';
import {
  arePathsEqual,
  getRowsToRemove,
  getRowsToUpdate,
  isSelectionParentOfTarget,
  moveToPath,
} from '../functions';

@Component({
  selector: 'app-groups-grid',
  templateUrl: './groups-grid.component.html',
  styleUrls: ['./groups-grid.component.scss'],
})
export class GroupsGridComponent {
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [];

  public autoGroupColumnDef: ColDef = {
    rowDrag: true,
    headerName: 'Financial groups',
    minWidth: 392,
    cellRendererParams: {
      checkbox: true,
      suppressCount: true,
    },
  };

  public rowData: Group[];

  constructor(private readonly dataService: DataService) {
    this.rowData = this.dataService.generateGroupsWithPaths();
  }

  public getDataPath(data: Group) {
    return data.groupHierarchy;
  }

  public gridOptions = {
    getDataPath: this.getDataPath,
  };

  public onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as any).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onRowDragEnd(event: RowDragEndEvent) {
    const overNode = event.overNode;

    console.log('OVER_NODE', overNode);

    if (!overNode) {
      return;
    }

    // folder to drop into is where we are going to move the file/folder to
    const folderToDropInto =
      overNode.data.type === 'folder'
        ? // if over a folder, we take the immediate row
          overNode
        : // if over a file, we take the parent row (which will be a folder)
          overNode.parent;

    const movingData = event.node.data;

    // take new parent path from parent, if data is missing, means it's the root node,
    // which has no data.
    const newParentPath = folderToDropInto!.data
      ? folderToDropInto!.data.groupHierarchy
      : [];

    const needToChangeParent = !arePathsEqual(
      newParentPath,
      movingData.groupHierarchy
    );

    // check we are not moving a folder into a child folder
    const invalidMode = isSelectionParentOfTarget(event.node, folderToDropInto);

    if (invalidMode) {
      console.log('invalid move');
    }

    if (needToChangeParent && !invalidMode) {
      const updatedRows: any[] = [];

      moveToPath(newParentPath, event.node, updatedRows);

      this.gridApi.applyTransaction({
        update: updatedRows,
      });
      this.gridApi.clearFocusedCell();
    }
  }

  addNewGroup() {
    const newGroupData: Group[] = [
      {
        id: 999999,
        groupHierarchy: ['Penguin', 'Gentoo'],
        name: 'Gentoo',
        type: '',
      },
    ];
    this.gridApi.applyTransaction({ add: newGroupData });
  }

  removeSelected() {
    var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    this.gridApi.applyTransaction({ remove: getRowsToRemove(selectedNode) });
  }

  moveSelectedNodeToTarget(targetRowId: string) {
    var selectedNode = this.gridApi.getSelectedNodes()[0]; // single selection

    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }

    var targetNode = this.gridApi.getRowNode(targetRowId)!;

    var invalidMove =
      selectedNode.key === targetNode.key ||
      isSelectionParentOfTarget(selectedNode, targetNode);

    if (invalidMove) {
      console.warn('Invalid selection - must not be parent or same as target!');
      return;
    }

    var rowsToUpdate = getRowsToUpdate(
      selectedNode,
      targetNode.data.groupHierarchy
    );

    this.gridApi.applyTransaction({ update: rowsToUpdate });
  }
}
