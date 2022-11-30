import { Component, OnInit } from '@angular/core';
import { AuthService } from '@markgabiana/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authService.logout();
  }
}
