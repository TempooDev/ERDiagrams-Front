import { Injectable } from '@angular/core';
import * as go from 'gojs';
import { RelationShip } from '../entities/relationship';
import { EntityDB } from '../entities/entitydb';
import { Colors } from '../utils/colors';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private _nodeDataArray: EntityDB[] = [
    {
      key: 'name',
      items: [],
    },
  ];
  private _linkDataArray: RelationShip[] = [{
    key: -1,
    from: "",
    to: "",
    text: "",
    toText: ""
  }];
  nodeDataArray$: BehaviorSubject<EntityDB[]> = new BehaviorSubject(
    this._nodeDataArray
  );

  linkDataArray$: BehaviorSubject<RelationShip[]> = new BehaviorSubject(
    this._linkDataArray
  );

  setNode(node: EntityDB) {
    this._nodeDataArray.push(node);
    this.nodeDataArray$.next(this._nodeDataArray);
  }

  setLink(link: RelationShip) {
    this._linkDataArray.push(link);
    this.linkDataArray$.next(this._linkDataArray);
  }
  cleanNode() {
    this._nodeDataArray = [];
    this.nodeDataArray$.next(this._nodeDataArray);
  }
}
