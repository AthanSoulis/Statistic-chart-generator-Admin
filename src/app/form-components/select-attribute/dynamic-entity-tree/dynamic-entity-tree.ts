import { first, map } from 'rxjs/operators';
import { NestedTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { MappingProfilesService } from './../../../services/mapping-profiles-service/mapping-profiles.service';
import { HttpClient } from '@angular/common/http';
import { UrlProviderService } from './../../../services/url-provider-service/url-provider.service';
import { EntityNode, DynamicEntityNode } from './entity-tree-nodes.types';
import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';


export class DynamicDataSource implements DataSource<DynamicEntityNode> {
    dataChange = new BehaviorSubject<DynamicEntityNode[]>([]);
  
    get data(): DynamicEntityNode[] {
      return this.dataChange.value;
    }
    set data(value: DynamicEntityNode[]) {
      this._treeControl.dataNodes = value;
      this.dataChange.next(value);
    }
  
    constructor(private _treeControl: NestedTreeControl<DynamicEntityNode>, private _database: DynamicTreeDatabase ) {}
  
    connect(collectionViewer: CollectionViewer): Observable<DynamicEntityNode[]> {
      this._treeControl.expansionModel.changed.subscribe(
        (change: SelectionChange<DynamicEntityNode>) => {
          if (change.added || change.removed) this.handleTreeControl(change);
        }
      );
  
      return merge(collectionViewer.viewChange, this.dataChange).pipe(
        map(() => { console.log(this.data); return this.data;})
      );
    }
  
    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<DynamicEntityNode>) {
      if (change.added) {
        change.added.forEach(node => this.toggleNode(node, true));
      }
      if (change.removed) {
        change.removed
          .slice()
          .reverse()
          .forEach(node => this.toggleNode(node, false));
      }
    }
  
    /**
     * Toggle the node, remove from display list
     */
    toggleNode(node: DynamicEntityNode, expand: boolean) {
      if (expand) {
        node.loading = true;

        // Emulate the http call to get children
        setTimeout(() => {
          var children = this._database.getChildren(node);

          if (children != null)
            children.subscribe(data => { if (node.relations != null) node.relations.next(data); });

          node.loading = false;
        }, 1000);
      } 
      else {
        if (node.relations != null)
          node.relations.next([]);
      }

      this.dataChange.next(this.data);
    }
  
    disconnect(collectionViewer: CollectionViewer): void { this._database.initialData.complete(); }
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
 @Injectable({ providedIn: 'root' })
 export class DynamicTreeDatabase {
   
  public loading = false;
  
  // The cached data of all the Entity Tree as it comes from the back-end
  dbdata: EntityNode[];

  // Initial data for the Dynamic Trefrom database
  initialData: BehaviorSubject<DynamicEntityNode[]> = new BehaviorSubject<DynamicEntityNode[]>([]);
 
   constructor(private http: HttpClient, private urlProvider: UrlProviderService, private profileMappingService: MappingProfilesService) {}

   initCache(entity: string) : void
   {
    const entityFieldsUrl = this.urlProvider.serviceURL + '/schema/' + this.profileMappingService.activeProfile.name + '/entities/' + entity;
    
    this.http.get<EntityNode>(entityFieldsUrl).pipe(first())
    .subscribe((entityNode: EntityNode) => {
      
      // Cache the result
      this.dbdata = [entityNode];
      console.log("DbData: ",this.dbdata);
      
      // Populate the head of the Dynamic Tree
      this.initialData.next(
        this.dbdata.map(node => new DynamicEntityNode(node.fields, node.name, (node.relations != null && node.relations.length > 0), []))
      );
      console.log("InitialData: ",this.initialData.value);
    });
   }
 
   getChildren( entityNode: DynamicEntityNode ): BehaviorSubject<DynamicEntityNode[]> | undefined {
    
    var nodes: EntityNode[] | undefined = this.dbdata;
  
    // Traverse the path field of the given entityNode, get the relations by checking the cached data.
    entityNode.path.forEach(nodeName => {
      if (nodes != null) {
        var pathNode = nodes.find(node => node.name === nodeName);
        if (pathNode != null) nodes = pathNode.relations;
      }
    });

    // No child nodes
    if (nodes == null) return undefined;

    var newNodes: DynamicEntityNode[] = [];

    newNodes = nodes.map(node => {
      var path = new Array<string>();
      entityNode.path.map(node => path.push(node));

      return new DynamicEntityNode( node.fields, node.name, (node.relations != null && node.relations.length > 0), path, undefined, entityNode);
    });
    
    // console.log("Children: ", newNodes);
    
    return new BehaviorSubject<DynamicEntityNode[]>(newNodes);
   }
 }