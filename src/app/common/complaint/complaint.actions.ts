import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class ComplaintActions {
  public static CREATE_COMPLAINT = '[Complaint] CREATE_COMPLAINT';
  public static CREATE_COMPLAINT_SUCCESS = '[Complaint] CREATE_COMPLAINT_SUCCESS';
  public static CREATE_COMPLAINT_FAIL = '[Complaint] CREATE_COMPLAINT_FAIL';
  public static UPDATE_COMPLAINT = '[Complaint] UPDATE_COMPLAINT';
  public static UPDATE_COMPLAINT_SUCCESS = '[Complaint] UPDATE_COMPLAINT_SUCCESS';
  public static UPDATE_COMPLAINT_FAIL = '[Complaint] UPDATE_COMPLAINT_FAIL';
  public static REMOVE_COMPLAINT = '[Complaint] REMOVE_COMPLAINT';
  public static REMOVE_COMPLAINT_SUCCESS = '[Complaint] REMOVE_COMPLAINT_SUCCESS';
  public static REMOVE_COMPLAINT_FAIL = '[Complaint] REMOVE_COMPLAINT_FAIL';

  // Results
  public static GET_COMPLAINTS = '[Complaint] GET_COMPLAINTS';
  public static GET_COMPLAINT = '[Complaint] GET_COMPLAINT';
  public static SEARCH_QUERY = '[Complaint] SEARCH_QUERY';
  public static LOAD_COMPLAINTS = '[Complaint] LOAD_COMPLAINTS';
  public static LOAD_COMPLAINTS_SUCCESS = '[Complaint] LOAD_COMPLAINTS_SUCCESS';
  public static LOAD_COMPLAINTS_FAIL = '[Complaint] LOAD_COMPLAINTS_FAIL';

  public createComplaint = ActionCreatorFactory.create(ComplaintActions.CREATE_COMPLAINT);
  public createComplaintSuccess = ActionCreatorFactory.create(ComplaintActions.CREATE_COMPLAINT_SUCCESS);
  public createComplaintFail = ActionCreatorFactory.create(ComplaintActions.CREATE_COMPLAINT_FAIL);
  public updateComplaint = ActionCreatorFactory.create(ComplaintActions.UPDATE_COMPLAINT);
  public updateComplaintSuccess = ActionCreatorFactory.create(ComplaintActions.UPDATE_COMPLAINT_SUCCESS);
  public updateComplaintFail = ActionCreatorFactory.create(ComplaintActions.UPDATE_COMPLAINT_FAIL);
  public removeComplaint = ActionCreatorFactory.create(ComplaintActions.REMOVE_COMPLAINT);
  public removeComplaintSuccess = ActionCreatorFactory.create(ComplaintActions.REMOVE_COMPLAINT_SUCCESS);
  public removeComplaintFail = ActionCreatorFactory.create(ComplaintActions.REMOVE_COMPLAINT_FAIL);

  public getComplaints = ActionCreatorFactory.create(ComplaintActions.GET_COMPLAINTS);
  public getComplaint = ActionCreatorFactory.create(ComplaintActions.GET_COMPLAINT);
  public searchQuery = ActionCreatorFactory.create(ComplaintActions.SEARCH_QUERY);
  public loadComplaints = ActionCreatorFactory.create(ComplaintActions.LOAD_COMPLAINTS);
  public loadComplaintsSuccess = ActionCreatorFactory.create(ComplaintActions.LOAD_COMPLAINTS_SUCCESS);
  public loadComplaintsFail = ActionCreatorFactory.create(ComplaintActions.LOAD_COMPLAINTS_FAIL);
}
