import { Input } from "@angular/core";
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-inspector-row',
  templateUrl: './inspector-row.component.html',
  styleUrls: ['./inspector-row.component.scss'],
  imports: [FormsModule],
  standalone: true
})
export class InspectorRowComponent {

  @Input()
  public id: string

  @Input()
  public value: string

  @Output()
  public onInputChangeEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public onInputChange(e: any) {
    // when <input> is changed, emit an Object up, with what property changed, and to what new value
    this.onInputChangeEmitter.emit({ prop: this.id, newVal: e.target.value });
  }

}
