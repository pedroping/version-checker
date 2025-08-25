import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';

function generateRandomString(): string {
  return Math.random().toString(36).substring(2, 17);
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'version-checker';

  ngOnInit() {
    this.checkVersion(false, true);
  }

  checkVersion(fromTimer: boolean, fromStart: boolean) {
    fetch('/versionId.txt?CacheBusting=' + generateRandomString())
      .then((res) => res.text())
      .then((id) => {
        const currentVersion = localStorage.getItem('applicationVersion');

        localStorage.setItem('applicationVersion', id);

        if (!currentVersion || currentVersion == id) {
          if (!fromTimer) this.initTimerCheck();
          return;
        }

        if (fromStart) return window.location.reload();

        if (confirm('New version available, reload now ?'))
          window.location.reload();
      });
  }

  initTimerCheck() {
    timer(30000, 30000).subscribe(() => this.checkVersion(true, false));
  }
}
