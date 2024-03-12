import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EntityDB } from 'src/app/entities/entitydb';
import { BoardService } from 'src/app/services/board.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'
@Component({
  selector: 'app-edit-nodes',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatSelectModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-nodes.component.html',
  styleUrl: './edit-nodes.component.scss'
})
export class EditNodesComponent {
  private _formBuilder = inject(FormBuilder)
  private _boardService = inject(BoardService);
  nodes$ = this._boardService.nodeDataArray$;
  formGroup: FormGroup = this._formBuilder.group({
    'key': [null],
    'name': [null],
    'figure': [null],
    'color': [null],
  });


  node: EntityDB = {
    key: 'name',
    items: [],
  };
  item = {
    name: "",
    iskey: false,
    figure: "",
    color: ""
  }

  addItem(item) {
    this.node = {
      key: item.key,
      items: []
    }
    const itemf = {
      name: item.name,
      iskey: false,
      figure: item.figure,
      color: item.color
    }
    this.node.items.push(itemf);

  }
  addNode() {
    this.node = {
      key: this.node.key,
      items: this.node.items
    }
    this._boardService.setNode(this.node);
    this.node = null
  }
  cleanNode() {
    this._boardService.cleanNode();
  }
}
