export interface HealthStatus {
  status: 'ok' | 'degraded';
  timestamp: string;
}

export interface ExampleItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
