import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import * as go from 'gojs';
import { InspectorRowComponent } from './inspector-row.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GojsAngularModule } from 'gojs-angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
  imports: [InspectorRowComponent,
    FormsModule,
    GojsAngularModule, CommonModule],
  standalone: true,
})
export class InspectorComponent {

  @Input()
  public nodeData: go.ObjectData;

  @Output()
  public onInspectorChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public onInputChange(propAndValObj: any) {
    this.onInspectorChange.emit(propAndValObj);
  }

}