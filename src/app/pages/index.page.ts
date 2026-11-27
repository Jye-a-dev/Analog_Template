import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Activity, LucideAngularModule } from 'lucide-angular';

import { ButtonComponent } from '@/components/ui/button.component';
import { ExampleCardComponent } from '@/features/example/components/example-card.component';
import { ExampleStore } from '@/features/example/services/example.store';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, ExampleCardComponent, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">analog_template</h1>
          <p class="mt-1 text-sm text-slate-600">
            Completed {{ store.completedCount() }} / {{ store.items().length }} checklist items
          </p>
        </div>

        <app-button [disabled]="store.loading()" (click)="store.refreshHealth()">
          <lucide-icon [img]="activityIcon" class="h-4 w-4" />
          {{ store.loading() ? 'Checking...' : 'Check API Health' }}
        </app-button>
      </header>

      @if (store.health(); as health) {
        <div
          class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          Server status: <span class="font-semibold">{{ health.status }}</span> ({{
            health.timestamp
          }})
        </div>
      }

      @if (store.error(); as error) {
        <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {{ error }}
        </div>
      }

      <section class="space-y-3">
        @for (item of store.items(); track item.id) {
          <app-example-card [item]="item" (toggled)="store.toggleItem($event)" />
        }
      </section>
    </main>
  `,
})
export default class HomePage {
  protected readonly store = inject(ExampleStore);
  protected readonly activityIcon = Activity;
}
