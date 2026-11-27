import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { env } from '@/config/env';

/**
 * Attaches base API URL for non-local paths, injects auth token in browser,
 * and normalizes HTTP error logging.
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isAbsoluteUrl = /^https?:\/\//i.test(req.url);
  const isLocalNitroRoute = req.url.startsWith('/api/');

  const url =
    isAbsoluteUrl || isLocalNitroRoute
      ? req.url
      : `${env.VITE_API_BASE_URL.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`;

  let headers = req.headers;
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('access_token');
    if (token && !headers.has('Authorization')) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  }

  return next(req.clone({ url, headers })).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`[API Error] ${req.method} ${url} -> ${error.status}`, error.message);
      return throwError(() => error);
    }),
  );
};
