import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected creds: any = {}
  protected accountService = inject(AccountService);
  login() {
    this.accountService.login(this.creds).subscribe({
      next: res => {
        console.log(res);
        this.creds = {}
      },
      error: error => alert(error.message)
    })
  }
  logout() {
    this.accountService.logout();
  }
}
