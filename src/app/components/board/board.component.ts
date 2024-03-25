import { Component, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { BoardService } from 'src/app/core/services/board.service';
import { FormsModule } from '@angular/forms';
import { CollabService } from 'src/app/core/services/collab.service';
import * as go from 'gojs';
import { combineLatest } from 'rxjs';
import { DataSyncService } from 'gojs-angular';
import produce from 'immer';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [CommonModule, JsonPipe, FormsModule],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BoardComponent {
  private _collabService = inject(CollabService);
  private _boardService = inject(BoardService);
  nodes$ = this._boardService.nodeDataArray$;
  links$ = this._boardService.linkDataArray$;
  roomName = this._collabService.getRoomName();
  public state = {
    // Diagram state props
    diagramNodeData: [
      { id: 'Alpha', text: 'Alpha', color: 'lightblue', loc: '0 0' },
      { id: 'Beta', text: 'Beta', color: 'orange', loc: '100 0' },
      { id: 'Gamma', text: 'Gamma', color: 'lightgreen', loc: '0 100' },
      { id: 'Delta', text: 'Delta', color: 'pink', loc: '100 100' },
    ],
    diagramLinkData: [
      { key: -1, from: 'Alpha', to: 'Beta', fromPort: 'r', toPort: '1' },
      { key: -2, from: 'Alpha', to: 'Gamma', fromPort: 'b', toPort: 't' },
      { key: -3, from: 'Beta', to: 'Beta' },
      { key: -4, from: 'Gamma', to: 'Delta', fromPort: 'r', toPort: 'l' },
      { key: -5, from: 'Delta', to: 'Alpha', fromPort: 't', toPort: 'r' },
    ],
    diagramModelData: { prop: 'value' },
    skipsDiagramUpdate: false,
    selectedNodeData: null, // used by InspectorComponent

    // Palette state props
    paletteNodeData: [
      { key: 'Epsilon', text: 'Epsilon', color: 'red' },
      { key: 'Kappa', text: 'Kappa', color: 'purple' },
    ],
    paletteModelData: { prop: 'val' },
  };
  diagramDivClassName: string = 'myDiagramDiv';
  paletteDivClassName = 'myPaletteDiv';
  diagramModelChange = function (changes: go.IncrementalData) {
    if (!changes) return;
    const appComp = this;
    this.state = produce(this.state, (draft) => {
      // set skipsDiagramUpdate: true since GoJS already has this update
      // this way, we don't log an unneeded transaction in the Diagram's undoManager history
      draft.skipsDiagramUpdate = true;
      draft.diagramNodeData = DataSyncService.syncNodeData(
        changes,
        draft.diagramNodeData,
        appComp.observedDiagram.model
      );
      draft.diagramLinkData = DataSyncService.syncLinkData(
        changes,
        draft.diagramLinkData,
        appComp.observedDiagram.model
      );
      draft.diagramModelData = DataSyncService.syncModelData(
        changes,
        draft.diagramModelData
      );
      // If one of the modified nodes was the selected node used by the inspector, update the inspector selectedNodeData object
      const modifiedNodeDatas = changes.modifiedNodeData;
      if (modifiedNodeDatas && draft.selectedNodeData) {
        for (let i = 0; i < modifiedNodeDatas.length; i++) {
          const mn = modifiedNodeDatas[i];
          const nodeKeyProperty = appComp.myDiagramComponent.diagram.model
            .nodeKeyProperty as string;
          if (mn[nodeKeyProperty] === draft.selectedNodeData[nodeKeyProperty]) {
            draft.selectedNodeData = mn;
          }
        }
      }
    });
  };

  public initPalette(): go.Palette {
    const $ = go.GraphObject.make;
    const palette = $(go.Palette);

    // define the Node template
    palette.nodeTemplate = $(
      go.Node,
      'Auto',
      $(
        go.Shape,
        'RoundedRectangle',
        {
          stroke: null,
        },
        new go.Binding('fill', 'color')
      ),
      $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key'))
    );

    palette.model = $(go.GraphLinksModel);
    return palette;
  }

  // Overview Component testing
  public oDivClassName = 'myOverviewDiv';
  public initOverview(): go.Overview {
    const $ = go.GraphObject.make;
    const overview = $(go.Overview);
    return overview;
  }
  public observedDiagram = null;

  // currently selected node; for inspector
  public selectedNodeData: go.ObjectData = null;

  vm$ = combineLatest([this.nodes$, this.links$]);
  initDiagram() {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key', // this should always be set when using a GraphLinksModel
      }),
    });

    diagram.nodeTemplate = $(
      go.Node,
      'Auto', // the Shape will go around the TextBlock
      $(
        go.Shape,
        'RoundedRectangle',
        { strokeWidth: 0, fill: 'white' },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')
      ),
      $(
        go.TextBlock,
        { margin: 8 }, // some room around the text
        // TextBlock.text is bound to Node.data.key
        new go.Binding('text', 'key')
      )
    );

    return diagram;
  }
}
