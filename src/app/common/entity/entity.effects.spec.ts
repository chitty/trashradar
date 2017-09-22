import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EntityService } from './entity.service';
import { EntityActions } from './entity.actions';
import { EntityEffects } from './entity.effects';
import { Entity } from './entity.model';
import { initialEntityState } from './entity.state';
import { Store } from '@ngrx/store';

describe('EntityEffects', () => {
  const entityMock: Entity = {
    id: 1,
    name: 'Real Entity',
    twitter: '@realentity',
    phone: '+17878901244'
  };
  const mockEntities = [
    { ...entityMock, id: 12345 },
    { ...entityMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let entityEffects: EntityEffects;
  let entityActions: EntityActions;
  let entityService: MockEntityService;
  let store;

  const mockStore = new BehaviorSubject({});

  class MockEntityService {
    public getAllPages(query: object): Observable<Entity[]> {
      return Observable.of(mockEntities);
    }
    public save(entity: Entity): Observable<Entity> {
      return Observable.of(entity);
    }
    public delete(entity: Entity): Observable<Entity> {
      return Observable.of(entity);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      EntityActions,
      EntityEffects,
      {
        provide: EntityService,
        useClass: MockEntityService,
      },
      {
        provide: Store,
        useValue: mockStore,
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    entityService = TestBed.get(EntityService);
    entityActions = TestBed.get(EntityActions);
    entityEffects = TestBed.get(EntityEffects);
    store = TestBed.get(Store);
  });

  describe('loadEntities$', () => {
    it('should return loadEntitiesSuccess on load success', () => {
      const expectedResult = entityActions.loadEntitiesSuccess(mockEntities);
      runner.queue(entityActions.loadEntities());

      let result = null;
      entityEffects.loadEntities$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadEntitiesFail on load failure', () => {
      const errorValue = 'error';
      spyOn(entityService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(entityActions.loadEntities());
      entityEffects.loadEntities$.subscribe((result) => {
        expect(result).toEqual(entityActions.loadEntitiesFail(errorValue));
      });
    });
  });

});
