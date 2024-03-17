import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntityDB } from 'src/app/core/entities/entitydb';
import { BoardService } from 'src/app/core/services/board.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Features } from 'src/app/core/entities/features';
@Component({
  selector: 'app-edit-nodes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './edit-nodes.component.html',
  styleUrl: './edit-nodes.component.scss',
})
export class EditNodesComponent {
  private _formBuilder = inject(FormBuilder);
  private _boardService = inject(BoardService);
  nodes$ = this._boardService.nodeDataArray$;
  formGroup: FormGroup = this._formBuilder.group({
    key: [null, Validators.required],
    name: [null, Validators.required],
    figure: [null, Validators.required],
    color: [null, Validators.required],
  });

  node: EntityDB = {
    key: 'name',
    items: [],
  };
  item = {
    name: '',
    iskey: false,
    figure: '',
    color: '',
  };

  addItem(item) {
    const index = this._boardService.findNode(item.key);
    if (index != -1) {
      const itemf: Features = {
        name: item.name,
        iskey: false,
        figure: item.figure,
        color: item.color,
      };
      this._boardService.setItemToNode(itemf, item.key);
    } else {
      this.node = {
        key: item.key,
        items: [],
      };
      const itemf = {
        name: item.name,
        iskey: false,
        figure: item.figure,
        color: item.color,
      };
      this.node.items.push(itemf);
      this._boardService.setNode(this.node);
      this.node = null;
    }
  }

  addNode(item) {
    if (item.key) return;
    this.node = {
      key: this.node.key,
      items: this.node.items,
    };
    this._boardService.setNode(this.node);
    this.node = null;
  }
  cleanNode() {
    this._boardService.cleanNode();
  }
}
