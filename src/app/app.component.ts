/**
 * Sample app showcasing gojs-angular components
 * For use with gojs-angular version 2.x
 */

import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import produce from "immer";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/share/sidebar/sidebar.component';
import { HeaderComponent } from './modules/share/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        HeaderComponent,
        SidebarComponent,
        RouterOutlet,
    ],
})
export class AppComponent {



}
