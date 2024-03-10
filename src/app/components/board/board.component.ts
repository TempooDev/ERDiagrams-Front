import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, combineLatest, startWith } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';
import { BoardService } from 'src/app/services/board.service';
import { RelationShip } from 'src/app/entities/relationship';
import { EntityDB } from 'src/app/entities/entitydb';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  private _boardService = inject(BoardService);
  nodes$ = this._boardService.nodeDataArray$;
  links$ = this._boardService.linkDataArray$;
}
