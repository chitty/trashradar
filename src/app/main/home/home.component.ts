import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ComplaintComponent } from '../complaint/complaint.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public complainCreationResult: string;
  public setErrorColors: boolean;
  public trashRadarLogo = 'assets/img/trash-radar-logo-highres.svg';
  public spryGroupLogo = 'assets/img/spry-group-logo.png';
  public spryGroupUrl = 'http://www.spry-group.com';

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openComplaintModal() {
    this.modalService.open(ComplaintComponent).result.then((result) => {
      console.log(result)
      this.complainCreationResult = `${result}`;
      if (this.complainCreationResult.indexOf('ERROR:') !== -1) {
        this.setErrorColors = true;
      } else {
        this.setErrorColors = false;
      }
    });
  }

}
