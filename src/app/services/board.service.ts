import { Injectable } from '@angular/core';
import * as go from 'gojs';
import { RelationShip } from '../entities/relationship';
import { EntityDB } from '../entities/entitydb';
import { Colors } from '../utils/colors';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  nodeDataArray$: BehaviorSubject<Array<EntityDB>> = new BehaviorSubject([{
    key: 'name',
    items: []
  }]);

  linkDataArray$: BehaviorSubject<Array<RelationShip>> = new BehaviorSubject([]);

  setNode(node: EntityDB) {
    this.nodeDataArray$.pipe(map(nodes => {
      nodes.push(node)
    }),
      tap(nodes => console.log(nodes)))
  }

  setLink(link: RelationShip) {
    this.linkDataArray$.pipe(map(links => {
      link ? links = [...links, link] : links
    }))
  }




}
