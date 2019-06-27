import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {TokenStorageService} from '../shared/security/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'UniCourse';
  @Input() authority: string;
  @Input() username: string;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit() {
  }

  logout() {
    this.tokenService.signOut().subscribe(res => {
      window.location.reload();
    });
  }
}
