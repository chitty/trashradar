import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ComplaintService } from './complaint.service';
import { ComplaintActions } from './complaint.actions';
import { ComplaintEffects } from './complaint.effects';
import { Complaint } from './complaint.model';
import { initialComplaintState } from './complaint.state';
import { Store } from '@ngrx/store';

describe('ComplaintEffects', () => {
  const complaintMock: Complaint = {
    id: 1,
    owner: 1,
    location: {
      type: 'Point',
      coordinates: [1, 1]
    },
    entity: 1,
    picture: 'test',
    counter: 1,
    current_state: 1,
    tweet_status: [1],
  };
  const mockComplaints = [
    { ...complaintMock, id: 12345 },
    { ...complaintMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let complaintEffects: ComplaintEffects;
  let complaintActions: ComplaintActions;
  let complaintService: MockComplaintService;
  let store;

  const mockStore = new BehaviorSubject({});

  class MockComplaintService {
    public getAllPages(query: object): Observable<Complaint[]> {
      return Observable.of(mockComplaints);
    }
    public save(complaint: Complaint): Observable<Complaint> {
      return Observable.of(complaint);
    }
    public delete(complaint: Complaint): Observable<Complaint> {
      return Observable.of(complaint);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ComplaintActions,
      ComplaintEffects,
      {
        provide: ComplaintService,
        useClass: MockComplaintService,
      },
      {
        provide: Store,
        useValue: mockStore,
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    complaintService = TestBed.get(ComplaintService);
    complaintActions = TestBed.get(ComplaintActions);
    complaintEffects = TestBed.get(ComplaintEffects);
    store = TestBed.get(Store);
  });

  describe('loadComplaints$', () => {
    it('should return loadComplaintsSuccess on load success', () => {
      const expectedResult = complaintActions.loadComplaintsSuccess(mockComplaints);
      runner.queue(complaintActions.loadComplaints());

      let result = null;
      complaintEffects.loadComplaints$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadComplaintsFail on load failure', () => {
      const errorValue = 'error';
      spyOn(complaintService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(complaintActions.loadComplaints());
      complaintEffects.loadComplaints$.subscribe((result) => {
        expect(result).toEqual(complaintActions.loadComplaintsFail(errorValue));
      });
    });
  });

  describe('createComplaint$', () => {
    const userId = 1559;
    mockStore.next({
      auth: {
        user: {
          id: userId,
        }
      }
    })
    it('should return a createComplaintSuccess, with the complaint, on success add', () => {
      runner.queue(complaintActions.createComplaint(complaintMock));
      complaintEffects.createComplaint$.subscribe((result) => {
        expect(result).toEqual(complaintActions.createComplaintSuccess({ ...complaintMock, owner: userId }));
      });
    });

    it('should return a createComplaintFail action, on service error', () => {
      spyOn(complaintService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(complaintActions.createComplaint(complaintMock));
      complaintEffects.createComplaint$.subscribe((result) => {
        expect(result).toEqual(complaintActions.createComplaintFail(complaintMock));
      });
    });
  });

  describe('updateComplaint$', () => {
    it('should return a updateComplaintSuccess action, with the complaint, on success update', () => {
      runner.queue(complaintActions.updateComplaint(complaintMock));
      complaintEffects.updateComplaint$.subscribe((result) => {
        expect(result).toEqual(complaintActions.updateComplaintSuccess(complaintMock));
      });
    });

    it('should return a updateComplaintFail action, on service error', () => {
      spyOn(complaintService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(complaintActions.updateComplaint(complaintMock));
      complaintEffects.updateComplaint$.subscribe((result) => {
        expect(result).toEqual(complaintActions.updateComplaintFail(complaintMock));
      });
    });
  });

  describe('removeComplaint$', () => {
    it('should return a removeComplaintSuccess action, with the complaint, on success remove', () => {
      runner.queue(complaintActions.removeComplaint(complaintMock));
      complaintEffects.removeComplaint$.subscribe((result) => {
        expect(result).toEqual(complaintActions.removeComplaintSuccess(complaintMock));
      });
    });

    it('should return a removeComplaintFail, on service error', () => {
      spyOn(complaintService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(complaintActions.removeComplaint(complaintMock));
      complaintEffects.removeComplaint$.subscribe((result) => {
        expect(result).toEqual(complaintActions.removeComplaintFail(complaintMock));
      });
    });
  });
});
