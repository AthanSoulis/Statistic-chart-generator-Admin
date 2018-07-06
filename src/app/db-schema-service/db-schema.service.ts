import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, of as observableOf } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UrlProviderService } from '../url-provider-service/url-provider.service';
import { Profile } from '../mapping-profiles-service/mapping-profiles.service';

export class EntityNode {
  fields: FieldNode[];
  relations: EntityNode[];
  name: string;
}
export class FieldNode {
  name: string;
  type: string;
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

  constructor(private http: HttpClient, private urlProvider: UrlProviderService) {}

  getAvailableEntities(profile: Profile): Observable<Array<string>> {

    if (profile === null) { return this.getAvailableEntitiesNoMapping(); }

    const entitiesUrl = this.urlProvider.getUrl() + '/schema/' + profile.name + '/entities';
    return this.http.get< Array<string> >(entitiesUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  getAvailableEntitiesNoMapping(): Observable<Array<string>> {

    const entitiesUrl = this.urlProvider.getUrl() + '/schema/entities';
    return this.http.get< Array<string> >(entitiesUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  getEntityFields(entity: string): Observable<EntityNode> {

    const entityFieldsUrl = this.urlProvider.getUrl() + '/schema/entities/' + entity;
    return this.http.get<EntityNode>(entityFieldsUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
  }

  getEntityTree(rootNode: EntityNode): Observable<EntityTreeNode> {

    // console.log('RootNode:');
    // console.log(rootNode);
    const entityTree = this.createEntityLinkedTree(null, rootNode);
    // console.log(entityTree);

    return observableOf(entityTree);
  }

  private createEntityLinkedTree(parentNode: EntityTreeNode, recreatedNode: EntityNode): EntityTreeNode {

    const newEntityTreeNode = new EntityTreeNode(recreatedNode.fields, new Array<EntityTreeNode>(), recreatedNode.name, parentNode);
    recreatedNode.relations.forEach(element => {
      newEntityTreeNode.relations.push(this.createEntityLinkedTree(newEntityTreeNode, element));
    });
    return newEntityTreeNode;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
