import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { Store } from '@ngrx/store';

import { ComplaintService } from './complaint.service';
import { ComplaintActions } from './complaint.actions';
import { Complaint } from './complaint.model';
import { getUser } from '../store/reducers';

@Injectable()
export class ComplaintEffects {
  @Effect()
  public loadComplaints$: Observable<Action> = this.actions$
    .ofType(ComplaintActions.LOAD_COMPLAINTS)
    .switchMap(() => this.complaintService.getAllPages())
      .map((complaints) => this.complaintActions.loadComplaintsSuccess(complaints))
      .catch((error) => of(this.complaintActions.loadComplaintsFail(error))
  );

  @Effect()
  public createComplaint$: Observable<Action> = this.actions$
    .ofType(ComplaintActions.CREATE_COMPLAINT)
    .map((action) => action.payload as Complaint)
    .withLatestFrom(this.store)
    .switchMap(([complaint, storeState]) =>
      this.complaintService.save({ ...complaint, owner: storeState.auth.user.id}, true)
        .map((addedComplaint) => this.complaintActions.createComplaintSuccess(addedComplaint))
        .catch(() => of(this.complaintActions.createComplaintFail(complaint)))
    );

  @Effect()
  public updateComplaint$: Observable<Action> = this.actions$
    .ofType(ComplaintActions.UPDATE_COMPLAINT)
    .map((action) => action.payload as Complaint)
    .switchMap((complaint) =>
      this.complaintService.save(complaint)
        .map((updatedComplaint) => this.complaintActions.updateComplaintSuccess(updatedComplaint))
        .catch(() => of(this.complaintActions.updateComplaintFail(complaint)))
    );

  @Effect()
  public removeComplaint$: Observable<Action> = this.actions$
    .ofType(ComplaintActions.REMOVE_COMPLAINT)
    .map((action) => action.payload as Complaint)
    .switchMap((complaint) =>
      this.complaintService.delete(complaint)
        .map(() => this.complaintActions.removeComplaintSuccess(complaint))
        .catch(() => of(this.complaintActions.removeComplaintFail(complaint)))
    );

  constructor(
    private actions$: Actions,
    private complaintService: ComplaintService,
    private complaintActions: ComplaintActions,
    private store: Store<any>,
  ) {}
}
