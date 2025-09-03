import { Injectable, isDevMode } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VersionCheckService {
  private destroy$ = new Subject<void>();

  start() {
    if (isDevMode()) return;
    this.checkVersion(false, true);
  }

  private checkVersion(fromTimer: boolean, fromStart: boolean) {
    fetch('/versionId.txt?CacheBusting=' + this.generateRandomString())
      .then((res) => res.text())
      .then((id) => {
        const currentVersion = localStorage.getItem('applicationVersion');

        localStorage.setItem('applicationVersion', id);

        if (!currentVersion || currentVersion == id) {
          if (!fromTimer) this.initTimerCheck();
          return;
        }

        if (fromStart) return window.location.reload();

        this.destroy$.next();

        if (confirm('New version available, reload now ?'))
          window.location.reload();
      });
  }

  private initTimerCheck() {
    timer(120000, 120000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkVersion(true, false));
  }

  private generateRandomString(): string {
    return Math.random().toString(36).substring(2, 17);
  }
}
