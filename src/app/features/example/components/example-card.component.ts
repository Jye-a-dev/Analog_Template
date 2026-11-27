import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CheckCircle2, Circle, LucideAngularModule } from 'lucide-angular';

import { ButtonComponent } from '@/components/ui/button.component';
import type { ExampleItem } from '@/features/example/types';

@Component({
  selector: 'app-example-card',
  imports: [ButtonComponent, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
    >
      <div class="flex items-start gap-3">
        @if (item().completed) {
          <lucide-icon [img]="checkIcon" class="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        } @else {
          <lucide-icon [img]="circleIcon" class="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
        }

        <div>
          <h3 [class]="titleClass()">{{ item().title }}</h3>
          @if (item().description) {
            <p class="mt-1 text-sm text-slate-600">{{ item().description }}</p>
          }
        </div>
      </div>

      <app-button variant="outline" size="sm" (click)="toggled.emit(item().id)">
        {{ item().completed ? 'Undo' : 'Done' }}
      </app-button>
    </div>
  `,
})
export class ExampleCardComponent {
  readonly item = input.required<ExampleItem>();
  readonly toggled = output<string>();

  protected readonly checkIcon = CheckCircle2;
  protected readonly circleIcon = Circle;

  protected readonly titleClass = computed(() =>
    this.item().completed
      ? 'text-sm font-semibold text-slate-400 line-through'
      : 'text-sm font-semibold text-slate-900',
  );
}
