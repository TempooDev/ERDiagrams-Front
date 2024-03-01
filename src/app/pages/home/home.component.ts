import { Component } from '@angular/core';
import { BoardComponent } from '../../components/board/board.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [BoardComponent],
})
export class HomeComponent {

}
