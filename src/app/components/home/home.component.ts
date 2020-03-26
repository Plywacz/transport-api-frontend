import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private  authenticationService: UserService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

}
