import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { VersionCheckService } from '../service/version-check.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'version-checker';
  destroy$ = new Subject<void>();

  versionCheckService = inject(VersionCheckService);

  ngOnInit() {
    this.versionCheckService.start();
  }
}
