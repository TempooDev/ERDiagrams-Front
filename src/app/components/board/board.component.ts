import {
  Component,
  Input,
  IterableDiffers,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as go from 'gojs';
import { } from 'gojs-angular';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  nodeDataArray: Array<EntityDB> = [];

  linkDataArray: Array<RelationShip> = [];

  colors = {
    red: '#be4b15',
    green: '#52ce60',
    blue: '#6ea5f8',
    lightred: '#fd8852',
    lightblue: '#afd4fe',
    lightgreen: '#b9e986',
    pink: '#faadc1',
    purple: '#d689ff',
    orange: '#fdb400',
  };
  myDiagram: go.Diagram = new go.Diagram();
  constructor(public auth: AuthService) { }
  ngOnInit() {
    const $ = go.GraphObject.make;
    this.myDiagram = $(
      go.Diagram,
      'myDiagramDiv', // must name or refer to the DIV HTML element
      {
        allowDelete: false,
        allowCopy: false,
        layout: $(go.ForceDirectedLayout, {
          setsPortSpots: false,
        }),
        'undoManager.isEnabled': true,
      }
    );

    // the template for each attribute in a node's array of item data
    var itemTempl = $(
      go.Panel,
      'Horizontal',
      $(
        go.Shape,
        {
          desiredSize: new go.Size(15, 15),
          strokeJoin: 'round',
          strokeWidth: 1,
          stroke: null,
          margin: 2,
        },
        new go.Binding('figure', 'figure'),
        new go.Binding('fill', 'color'),
        new go.Binding('stroke', 'color')
      ),
      $(
        go.TextBlock,
        {
          stroke: '#333333',
          font: 'bold 14px sans-serif',
        },
        new go.Binding('text', 'name')
      )
    );

    // define the Node template, representing an entity
    this.myDiagram.nodeTemplate = $(
      go.Node,
      'Auto', // the whole node panel
      {
        selectionAdorned: true,
        resizable: true,
        layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        isShadowed: true,
        shadowOffset: new go.Point(3, 3),
        shadowColor: '#C5C1AA',
      },
      new go.Binding('location', 'location').makeTwoWay(),

      new go.Binding(
        'desiredSize',
        'visible',
        (v) => new go.Size(NaN, NaN)
      ).ofObject('LIST'),
      // define the node's outer shape, which will surround the Table
      $(go.Shape, 'RoundedRectangle', {
        fill: 'white',
        stroke: '#eeeeee',
        strokeWidth: 1,
      }),
      $(
        go.Panel,
        'Table',
        { margin: 8, stretch: go.GraphObject.Fill },
        $(go.RowColumnDefinition, {
          row: 0,
          sizing: go.RowColumnDefinition.None,
        }),
        // the table header
        $(
          go.TextBlock,
          {
            row: 0,
            alignment: go.Spot.Center,
            margin: new go.Margin(0, 24, 0, 2), // leave room for Button
            font: 'bold 16px sans-serif',
          },
          new go.Binding('text', 'key')
        ),
        // the collapse/expand button
        $(
          'PanelExpanderButton',
          'LIST', // the name of the element whose visibility this button toggles
          { row: 0, alignment: go.Spot.TopRight }
        ),
        // the list of Panels, each showing an attribute
        $(
          go.Panel,
          'Vertical',
          {
            name: 'LIST',
            row: 1,
            padding: 3,
            alignment: go.Spot.TopLeft,
            defaultAlignment: go.Spot.Left,
            stretch: go.GraphObject.Horizontal,
            itemTemplate: itemTempl,
          },
          new go.Binding('itemArray', 'items')
        )
      ) // end Table Panel
    ); // end Node

    // define the Link template, representing a relationship
    this.myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        selectionAdorned: true,
        layerName: 'Foreground',
        reshapable: true,
        routing: go.Link.AvoidsNodes,
        corner: 5,
        curve: go.Link.JumpOver,
      },
      $(
        go.Shape, // the link shape
        { stroke: '#303B45', strokeWidth: 2.5 }
      ),
      $(
        go.TextBlock, // the "from" label
        {
          textAlign: 'center',
          font: 'bold 14px sans-serif',
          stroke: '#1967B3',
          segmentIndex: 0,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright,
        },
        new go.Binding('text', 'text')
      ),
      $(
        go.TextBlock, // the "to" label
        {
          textAlign: 'center',
          font: 'bold 14px sans-serif',
          stroke: '#1967B3',
          segmentIndex: -1,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright,
        },
        new go.Binding('text', 'toText')
      )
    );

    this.myDiagram.model = new go.GraphLinksModel({
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: this.nodeDataArray,
      linkDataArray: this.linkDataArray,
    });
    this.createExample();
  }
  ngOnChanges(changes: SimpleChanges): void { }

  createExample() {
    // create the model for the E-R diagram
    this.nodeDataArray = [
      {
        key: 'Products',
        items: [
          {
            name: 'ProductID',
            iskey: true,
            figure: 'Decision',
            color: this.colors.red,
          },
          {
            name: 'ProductName',
            iskey: false,
            figure: 'Hexagon',
            color: this.colors.blue,
          },
          {
            name: 'SupplierID',
            iskey: false,
            figure: 'Decision',
            color: 'purple',
          },
          {
            name: 'CategoryID',
            iskey: false,
            figure: 'Decision',
            color: 'purple',
          },
        ],
      },
      {
        key: 'Vendedores',
        items: [
          {
            name: 'SupplierID',
            iskey: true,
            figure: 'Decision',
            color: this.colors.red,
          },
          {
            name: 'CompanyName',
            iskey: false,
            figure: 'Hexagon',
            color: this.colors.blue,
          },
          {
            name: 'ContactName',
            iskey: false,
            figure: 'Hexagon',
            color: this.colors.blue,
          },
          {
            name: 'Address',
            iskey: false,
            figure: 'Hexagon',
            color: this.colors.blue,
          },
        ],
      },
      {
        key: 'Categories',
        items: [
          {
            name: 'CategoryID',
            iskey: true,
            figure: 'Decision',
            color: this.colors.red,
          },
          {
            name: 'CategoryName',
            iskey: false,
            figure: 'Hexagon',
            color: this.colors.blue,
          },
          {
            name: 'Description',
            iskey: false,
            figure: 'Hexagon',
            color: this.colors.blue,
          },
          {
            name: 'Picture',
            iskey: false,
            figure: 'TriangleUp',
            color: this.colors.pink,
          },
        ],
      },
      {
        key: 'Order Details',
        items: [
          {
            name: 'OrderID',
            iskey: true,
            figure: 'Decision',
            color: this.colors.red,
          },
          {
            name: 'ProductID',
            iskey: true,
            figure: 'Decision',
            color: this.colors.red,
          },
          {
            name: 'UnitPrice',
            iskey: false,
            figure: 'Circle',
            color: this.colors.green,
          },
          {
            name: 'Quantity',
            iskey: false,
            figure: 'Circle',
            color: this.colors.green,
          },
          {
            name: 'Discount',
            iskey: false,
            figure: 'Circle',
            color: this.colors.green,
          },
        ],
      },
    ];

    this.linkDataArray = [
      {
        key: -1,
        from: 'Products',
        to: 'Vendedores',
        text: '0..N',
        toText: '1',
      },
      {
        key: -2,
        from: 'Products',
        to: 'Categories',
        text: '0..N',
        toText: '1',
      },
      {
        key: -3,
        from: 'Order Details',
        to: 'Products',
        text: '0..N',
        toText: '1',
      },
    ];

    // Actualizar datos de nodos
    this.nodeDataArray.forEach((nodeData) => {
      var node = this.myDiagram.model.findNodeDataForKey(nodeData.key);
      if (node !== null) {
        this.myDiagram.model.setDataProperty(node, 'items', nodeData.items);
      }
    });

    // Actualizar datos de enlaces
    this.linkDataArray.forEach((linkData) => {
      var link = this.myDiagram.model.findNodeDataForKey(linkData.key);
      if (link !== null) {
        this.myDiagram.model.setDataProperty(link, 'from', linkData.from);
        this.myDiagram.model.setDataProperty(link, 'to', linkData.to);
        this.myDiagram.model.setDataProperty(link, 'text', linkData.text);
        this.myDiagram.model.setDataProperty(link, 'toText', linkData.toText);
      }
    });

    // Asignar el modelo actualizado al diagrama
    this.myDiagram.model = new go.GraphLinksModel({
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: this.nodeDataArray,
      linkDataArray: this.linkDataArray,
    });
  }

  createEntity() {
    let entity: EntityDB = {
      key: 'Tienda',
      items: [
        {
          name: 'TiendaID',
          iskey: true,
          figure: '',
          color: this.colors.red,
        },
      ],
    };

    //add note to the node list
    this.nodeDataArray.push(entity);
    this.myDiagram.model.addNodeData(entity);

    //test addLink
    let relationship: RelationShip = {
      key: -4,
      from: 'Tienda',
      to: 'Products',
      toText: '1',
      text: '1',
    };
    //add link to the relationship array and update the model
    this.linkDataArray.push(relationship);
    this.updateModel();
  }
  updateModel(): void {
    // Actualizar datos de nodos
    this.nodeDataArray.forEach((nodeData) => {
      var node = this.myDiagram.model.findNodeDataForKey(nodeData.key);
      if (node !== null) {
        this.myDiagram.model.setDataProperty(node, 'items', nodeData.items);
      }
    });

    // Actualizar datos de enlaces
    this.linkDataArray.forEach((linkData) => {
      var link = this.myDiagram.model.findNodeDataForKey(linkData.key);
      if (link !== null) {
        this.myDiagram.model.setDataProperty(link, 'from', linkData.from);
        this.myDiagram.model.setDataProperty(link, 'to', linkData.to);
        this.myDiagram.model.setDataProperty(link, 'text', linkData.text);
        this.myDiagram.model.setDataProperty(link, 'toText', linkData.toText);
      }
    });

    // Asignar el modelo actualizado al diagrama
    this.myDiagram.model = new go.GraphLinksModel({
      copiesArrays: true,
      copiesArrayObjects: true,
      nodeDataArray: this.nodeDataArray,
      linkDataArray: this.linkDataArray,
    });
  }
}

interface RelationShip {
  key: number;
  from: string;
  to: string;
  text: string;
  toText: string;
}

interface EntityDB {
  key: string;
  items: Array<Features>;
}

interface Features {
  name: string;
  iskey: boolean;
  figure: string;
  color: string;
}
