import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '@/components/ui/button.component';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center"
    >
      <p class="text-sm font-semibold tracking-wider text-slate-500 uppercase">404</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-900">Page not found</h1>
      <p class="mt-2 text-sm text-slate-600">
        The route you requested does not exist in this application.
      </p>
      <a routerLink="/" class="mt-6">
        <app-button variant="primary">Back to home</app-button>
      </a>
    </main>
  `,
})
export default class PageNotFoundPage {}
