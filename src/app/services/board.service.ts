import { Injectable } from '@angular/core';
import * as go from 'gojs';
import { RelationShip } from '../entities/relationship';
import { EntityDB } from '../entities/entitydb';
import { Colors } from '../utils/colors';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Features } from '../entities/features';

@Injectable({
  providedIn: 'root',
})
export class BoardService {


  private _nodeDataArray: EntityDB[] = []

  private _linkDataArray: RelationShip[] = [];
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
  cleanLinks() {
    this._linkDataArray = []
    this.linkDataArray$.next(this._linkDataArray)
  }
  setItemToNode(itemf: Features, key: string) {
    const index = this._nodeDataArray.findIndex(e => e.key === key)
    const node = this._nodeDataArray[index]
    this._nodeDataArray.filter((ele, ind) => ind !== index)
    console.log(node)
    node.items.push(itemf)
    this._nodeDataArray.push(node);
    this.nodeDataArray$.next(this._nodeDataArray)
  }

  findNode(key: string): number {
    return this._nodeDataArray.findIndex(e => e.key === key)
  }
}
