import { IRowNode } from 'ag-grid-community';

export function arePathsEqual(path1: string[], path2: string[]) {
  if (path1.length !== path2.length) {
    return false;
  }

  let equal = true;

  path1.forEach(function (item, index) {
    if (path2[index] !== item) {
      equal = false;
    }
  });

  return equal;
}

export function moveToPath(
  newParentPath: string[],
  node: IRowNode,
  allUpdatedNodes: any[]
) {
  const oldPath = node.data.groupHierarchy;
  const fileName = oldPath[oldPath.length - 1];
  const newChildPath = newParentPath.slice();

  newChildPath.push(fileName);
  node.data.groupHierarchy = newChildPath;
  allUpdatedNodes.push(node.data);

  if (node.childrenAfterGroup) {
    node.childrenAfterGroup.forEach(function (childNode) {
      moveToPath(newChildPath, childNode, allUpdatedNodes);
    });
  }
}

export function isSelectionParentOfTarget(
  selectedNode: IRowNode,
  targetNode: IRowNode | null
) {
  let children = [...(selectedNode.childrenAfterGroup || [])];

  if (!targetNode) {
    return false;
  }

  while (children.length) {
    const node = children.shift();
    if (!node) {
      continue;
    }

    if (node.key === targetNode.key) {
      return true;
    }

    if (node.childrenAfterGroup && node.childrenAfterGroup.length) {
      children.push(...node.childrenAfterGroup);
    }
  }

  return false;
}

export function getRowsToRemove(node: IRowNode) {
  var res: any[] = [];
  const children = node.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    res = res.concat(getRowsToRemove(children[i]));
  }
  // ignore nodes that have no data, i.e. 'filler groups'
  return node.data ? res.concat([node.data]) : res;
}

export function getRowsToUpdate(node: IRowNode, parentPath: string[]) {
  var res: any[] = [];
  var newPath = parentPath.concat([node.key!]);
  if (node.data) {
    // groups without data, i.e. 'filler groups' don't need path updated
    node.data.groupHierarchy = newPath;
  }
  var children = node.childrenAfterGroup || [];
  for (var i = 0; i < children.length; i++) {
    var updatedChildRowData = getRowsToUpdate(children[i], newPath);
    res = res.concat(updatedChildRowData);
  }
  // ignore nodes that have no data, i.e. 'filler groups'
  return node.data ? res.concat([node.data]) : res;
}
