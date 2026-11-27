import { computed, inject, Injectable, signal } from '@angular/core';

import { ExampleApiService } from '@/features/example/api/example.api';
import { createExampleItemSchema } from '@/features/example/schemas/example.schema';
import type { ExampleItem, HealthStatus } from '@/features/example/types';

const INITIAL_ITEMS: ExampleItem[] = [
  {
    id: '1',
    title: 'AnalogJS File-Based Routing',
    description: 'Thin route files under src/app/pages/ delegating logic to features/.',
    completed: true,
  },
  {
    id: '2',
    title: 'Zoneless Signals & Tailwind v4',
    description: 'Reactive state via signal()/computed() with @tailwindcss/vite.',
    completed: false,
  },
];

@Injectable({ providedIn: 'root' })
export class ExampleStore {
  private readonly api = inject(ExampleApiService);

  private readonly _items = signal<ExampleItem[]>(INITIAL_ITEMS);
  private readonly _health = signal<HealthStatus | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly items = this._items.asReadonly();
  readonly health = this._health.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly completedCount = computed(() => this._items().filter((item) => item.completed).length);

  toggleItem(id: string): void {
    this._items.update((list) =>
      list.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  addItem(title: string, description = ''): boolean {
    const parsed = createExampleItemSchema.safeParse({ title, description });
    if (!parsed.success) {
      this._error.set(parsed.error.issues[0]?.message ?? 'Invalid input');
      return false;
    }

    this._error.set(null);
    this._items.update((list) => [
      ...list,
      {
        id: crypto.randomUUID(),
        title: parsed.data.title,
        description: parsed.data.description,
        completed: false,
      },
    ]);
    return true;
  }

  async refreshHealth(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    try {
      const status = await this.api.checkHealth();
      this._health.set(status);
    } catch {
      this._error.set('Unable to reach /api/v1/health');
    } finally {
      this._loading.set(false);
    }
  }
}
