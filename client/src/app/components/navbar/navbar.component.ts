import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  providers: [],
})
export class NavbarComponent implements OnInit, DoCheck {
  public title: string;
  public isNavbarCollapsed: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Universidad de El Salvador';
  }

  ngOnInit() {

  }

  ngDoCheck() {

  }
}
