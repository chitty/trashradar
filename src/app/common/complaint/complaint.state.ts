import { Complaint } from './complaint.model';

export interface ComplaintState {
  ids: number[];
  entities: { [id: number]: Complaint };
  selectedComplaintId: number | null;
  error?: object;
}

export const initialComplaintState: ComplaintState = {
  ids: [],
  entities: {},
  selectedComplaintId: null,
  error: null
};
