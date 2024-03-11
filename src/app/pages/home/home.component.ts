import { Component } from '@angular/core';
import { BoardComponent } from '../../components/board/board.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { EditNodesComponent } from 'src/app/components/edit-nodes/edit-nodes.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [BoardComponent, HeaderComponent, EditNodesComponent],
})
export class HomeComponent {

}
