import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { healthStatusSchema } from '@/features/example/schemas/example.schema';
import type { HealthStatus } from '@/features/example/types';

@Injectable({ providedIn: 'root' })
export class ExampleApiService {
  private readonly http = inject(HttpClient);

  async checkHealth(): Promise<HealthStatus> {
    const raw = await firstValueFrom(this.http.get<unknown>('/api/v1/health'));
    return healthStatusSchema.parse(raw);
  }
}
