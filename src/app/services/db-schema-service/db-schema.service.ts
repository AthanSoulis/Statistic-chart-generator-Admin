import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { catchError, finalize, map, retry } from 'rxjs/operators';
import { UrlProviderService } from '../url-provider-service/url-provider.service';
import { Profile, MappingProfilesService } from '../mapping-profiles-service/mapping-profiles.service';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

export class bEntityNode
{
  fields: FieldNode[];
  relations?: bEntityNode[];
  name: string;
}

export class EntityNode {
  fields: FieldNode[];
  relations: EntityNode[];
  name: string;
}
export class FieldNode {
  name: string;
  type: string;
}

export class DynamicDataSource implements MatTreeNestedDataSource<bEntityNode> 
{
  // Showing we are loading data
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // The source of our data
  _data = new BehaviorSubject<bEntityNode[]>([]);
  
  // The database data
  private dbdata: bEntityNode[];

  constructor(private _treeControl: NestedTreeControl<bEntityNode>, private dbService: DbSchemaService, entity: string, profile: Profile)
  {
    this.dbService.getbEntityNode(entity, profile)
    .subscribe((entityNode: bEntityNode) => 
    {
      // The whole dbdata
      this.dbdata = [entityNode];

      // Simulate fetching the root node from the DB
      const initialNode = entityNode;
      initialNode.relations = undefined;

      this._data.next([initialNode]);
    
    });
  }

  get data(): bEntityNode[] { return this._data.value; }
  set data(value: bEntityNode[])
  {
    this._treeControl.dataNodes = value;
    this._data.next(value);
  }

  loadEntityNode(entity: string, profile : Profile)
  {
    this.loadingSubject.next(true);

    this.dbService.getbEntityNode(entity, profile)
    .pipe(finalize(()=> this.loadingSubject.next(false)))
    .subscribe((entityNode: bEntityNode) => 
    {
      // The whole dbdata
      this.dbdata = [entityNode];

      // Simulate fetching the root node from the DB
      const initialNode = entityNode;
      initialNode.relations = undefined;

      this._data.next([initialNode]);
    
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<bEntityNode[]> 
  {
    this._treeControl.expansionModel.changed.subscribe(
      (change: SelectionChange<bEntityNode> ) => {
        if(change.added || change.removed)
          this.handleTreeControl(change);
      });

    return merge(collectionViewer.viewChange, this._data).pipe(map(() => this.data));
  }

  disconnect(): void 
  {
    this.loadingSubject.complete();
    this._data.complete();
    this._treeControl.expansionModel.changed.complete();
  }

  handleTreeControl(change: SelectionChange<bEntityNode>)
  {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  toggleNode(node: bEntityNode, expand: boolean)
  {
    const childrenData : bEntityNode[] = node.relations;

    if(expand)
    {

    }
    else
    {

    }

  }
}

export class EntityTreeNode {
  fields: FieldNode[];
  relations: EntityTreeNode[];
  name: string;
  parent: EntityTreeNode;

  constructor(fields?: FieldNode[], relations?: EntityTreeNode[], name?: string, parent?: EntityTreeNode ) {
    this.fields = fields;
    this.relations = relations;
    this.name = name;
    this.parent = parent;
  }
}

@Injectable()
export class DbSchemaService {

  constructor(private http: HttpClient, private urlProvider: UrlProviderService,
    private profileMappingService: MappingProfilesService, private errorHandler: ErrorHandlerService) {}

  getAvailableEntities(profile: Profile|null|undefined): Observable<Array<string>> {

    if (profile === undefined || profile === null) {
      // return this.getAvailableEntitiesNoMapping();
      return of([]);
    }

    const entitiesUrl = this.urlProvider.serviceURL + '/schema/' + profile.name + '/entities';
    return this.http.get< Array<string> >(entitiesUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getAvailableEntitiesNoMapping(): Observable<Array<string>> {

    const entitiesUrl = this.urlProvider.serviceURL + '/schema/entities';
    return this.http.get< Array<string> >(entitiesUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getEntityFields(entity: string, profile?: Profile) {

    if (profile === undefined || profile === null) { return this.getEntityFieldsNoMapping(entity); }

    const entityFieldsUrl = this.urlProvider.serviceURL + '/schema/' + profile.name + '/entities/' + entity;
    return this.http.get<EntityNode>(entityFieldsUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getbEntityNode(entity: string, profile?: Profile) {

    if (profile === undefined || profile === null) { return this.getEntityFieldsNoMapping(entity); }

    const entityFieldsUrl = this.urlProvider.serviceURL + '/schema/' + profile.name + '/entities/' + entity;
    return this.http.get<bEntityNode>(entityFieldsUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getEntityFieldsNoMapping(entity: string): Observable<EntityNode> {

    const entityFieldsUrl = this.urlProvider.serviceURL + '/schema/entities/' + entity;
    return this.http.get<EntityNode>(entityFieldsUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getEntityTree(rootNode: EntityNode): EntityTreeNode {
    return this.createEntityLinkedTree(null, rootNode);
  }

  private createEntityLinkedTree(parentNode: EntityTreeNode, recreatedNode: EntityNode): EntityTreeNode {

    const newEntityTreeNode = new EntityTreeNode(recreatedNode.fields, new Array<EntityTreeNode>(), recreatedNode.name, parentNode);

    if (recreatedNode.relations) {
      recreatedNode.relations.forEach(element => {
        newEntityTreeNode.relations.push(this.createEntityLinkedTree(newEntityTreeNode, element));
      });
      return newEntityTreeNode;
    }
    return null;
  }
}
