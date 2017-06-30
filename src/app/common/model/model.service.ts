import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DjangoClientService } from '../django-client';

interface IModel {
  id?: number;
}

/**
 * Model Service.
 *
 * This service provides a generic way of communicating with the API's endpoint.
 *
 * @export
 * @class ModelService<T>
 */
@Injectable()
export class ModelService<T extends IModel> {

  /**
   * Creates an instance of the ModelService
   *
   * @param {string} modelUrl
   * @param {DjangoClientService} apiHttp
   */
  constructor(private modelUrl: string, private apiHttp: DjangoClientService) {
  }

  /**
   * Look up a model by id
   *
   * @param {string} [id] id of the object to be retrieved
   * @returns {Observable<T>}
   */
  public get(id: number | string): Observable<T> {
    return this.apiHttp.get(this.modelUrl + id);
  }

  /**
   * Search for a collection of models, pass null to get all.
   *
   * @param {object} query
   * @returns {Observable<T[]>}
   */
  public find(query: object): Observable<T[]> {
    const params: URLSearchParams = new URLSearchParams();
    if (query && typeof query === 'object') {
      Object.entries(query).forEach(([key, value]) => params.set(key, value));
    }
    const options = new RequestOptions({ params });
    return this.apiHttp.get(this.modelUrl, options);
  }

  /**
   * Persist a model back to the API.
   *
   * @param {T} model
   * @returns {Observable<T>}
   */
  public save(model: T): Observable<T> {
    const options = new RequestOptions({body: model});
    if (model.id) {
      return this.apiHttp.put(this.modelUrl + model.id, options);
    } else {
      return this.apiHttp.post(this.modelUrl, options);
    }
  }

  /**
   * Delete a model from the API.
   *
   * @param {T} model
   * @returns {Observable<T>}
   */
  public delete(model: T): Observable<T> {
    return this.apiHttp.delete(this.modelUrl + model.id);
  }

  /**
   * Go through all the pages and get all model data
   *
   * @param {object} query - query parameters to be appended
   * @returns {Observable<T[]>} - returns an observable with all items from all pages as a single event
   */
  public getAllPages(query?: object): Observable<any[]> {
    return this.find(query)
      .switchMap(({ results, next }: any) => (next ? this.getPages(next, results) : Observable.from(results)))
      .toArray();
  }

  /**
   * Recursively go through all pages until everything is fetched
   *
   * @param {string} page - URL of the page to fetch
   * @param {T[]} result
   * @returns {Observable<T>} - returns observable that emits each item of every page
   */
  public getPages(page: string, result: T[] = []): Observable<T> {
    return this.apiHttp.get(page).switchMap(({ results, next }) => {
      result = result.concat(results);
      return next ? this.getPages(next, result) : Observable.from(result);
    });
  }
}
