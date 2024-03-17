import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RelationShip } from 'src/app/core/entities/relationship';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-edit-links',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatSelectModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-links.component.html',
  styleUrl: './edit-links.component.scss'
})
export class EditLinksComponent {
  private _formBuilder = inject(FormBuilder)
  private _boardService = inject(BoardService);
  links$ = this._boardService.linkDataArray$;
  formGroup: FormGroup = this._formBuilder.group({
    'key': [null],
    'from': [null],
    'to': [null],
    'text': [null],
    'toText': [null],
  });

  addLink(item) {
    const link: RelationShip = {
      key: item.key,
      from: item.from,
      text: item.text,
      to: item.to,
      toText: item.toText
    }
    this._boardService.setLink(link)
  }

  cleanLinks() {
    this._boardService.cleanLinks()
  }
}
