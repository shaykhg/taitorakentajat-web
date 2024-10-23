import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../services/data-share.service';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public data: DataShareService, public session: SessionService, private route: Router) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.session.logout();
    this.route.navigateByUrl('/auth/login');
  }
}
