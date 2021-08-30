import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-producers',
  templateUrl: './producers.page.html',
  styleUrls: ['./producers.page.scss'],
})
export class ProducersPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
