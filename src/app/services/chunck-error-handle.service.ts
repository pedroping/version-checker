import { ErrorHandler, inject, Injectable } from '@angular/core';
import { VersionCheckService } from './version-check.service';

@Injectable()
export class ChunckErrorHandleService implements ErrorHandler {
  private readonly versionCheckService = inject(VersionCheckService);

  handleError(error: any): void {
    const chunkFailedMessage = /^Loading chunk (.+) failed$/;

    console.error(error);

    if (!chunkFailedMessage.test(error.message)) return;

    this.versionCheckService.start();
  }
}
