import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {

  protected creds: any = {}
  protected accountService = inject(AccountService);
  protected toastService = inject(ToastService);
  private router = inject(Router)

  protected slectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;


  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.slectedTheme());

  }


  login() {
    this.accountService.login(this.creds).subscribe({
      next: res => {
        this.router.navigateByUrl('/members')
        this.toastService.success('Logged in successfully')
        this.creds = {}
      },
      error: error => {
        this.toastService.error(error.error)
      }
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')

  }


  handleSelectTheme(theme: string) {
    this.slectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }
}
