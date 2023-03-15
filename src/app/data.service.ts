import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export type Account = {
  id: number;
  name: string;
};

export type Group = {
  id: number | string;
  name: string;
  groupHierarchy: string[];
  type: string;
};

@Injectable({ providedIn: 'root' })
export class DataService {
  generateAccounts$(): Observable<Account[]> {
    return of(
      Array.from({ length: 30000 }).map((_, index) => ({
        id: index,
        name: this.generateName(),
      }))
    );
  }

  public generateGroups(): Group[] {
    return Array.from({ length: 5000 }).map((_, index) => {
      const name = index === 0 ? 'Penguin' : this.generateName();

      return {
        id: index,
        name: name,
        groupHierarchy: [name],
        type: '',
      };
    });
  }

  public generateGroupsWithPaths(): Group[] {
    const groups = this.generateGroups();

    return groups.map((group, index, array) => {
      if (index === 0) {
        group.type = 'folder';
        return group;
      }

      if ((index + 1) % 10 === 0) {
        group.type = 'folder';
        return group;
      }

      const prev = array[index - 1];

      group.groupHierarchy = [prev.groupHierarchy[0], this.generateName()];

      /* if (index === 1) {
        group = {
          id: 999666,
          groupHierarchy: ['Penguin', 'Distros', 'Arch btw'],
          name: 'Arch btw',
          type: 'folder',
        };
      } */

      return group;
    });
  }

  private generateName(): string {
    return uniqueNamesGenerator({
      dictionaries: [colors, animals, adjectives],
    });
  }
}
