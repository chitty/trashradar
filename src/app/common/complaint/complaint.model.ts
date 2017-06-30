/* tslint:disable:variable-name */
import { Point } from '@types/geojson';

import { Entity } from '../entity';

export class Complaint {
  public id?: number;
  public owner: number;
  public location: Point;
  public entity: number | Entity;
  public picture: string;
  public counter: number;
  public current_state: number;
  public tweet_status: number[];
}
