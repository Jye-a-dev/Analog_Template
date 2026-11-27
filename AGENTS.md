# AGENTS.md

Framework & architecture rules for AI coding assistants in `analog_template`.
For AnalogJS framework details, also consult `node_modules/@analogjs/platform/AGENTS.md`.

## Core Architecture & Modern Angular

- **AnalogJS File-Based Routing**: Define routes in `src/app/pages/**/*.page.ts` with `provideFileRouter()`. Keep page components thin — delegate business logic and state to `src/app/features/`.
- **Nitro Server Routes**: Place backend API handlers in `src/server/routes/api/**/*.ts` using `defineEventHandler`.
- **Standalone & Zoneless**: All components must be Standalone (omit redundant `standalone: true` in Angular 19+). App uses `provideZonelessChangeDetection()`.
- **Dependency Injection**: Always use `inject()` — never inject dependencies via `constructor`.
- **Signals & Control Flow**: Use Angular Signals (`signal`, `computed`, `effect`, `input`, `output`) and new built-in control flow (`@if`, `@for`, `@switch`, `@defer`).
- **Strictly Forbidden**: Never use `NgModule`, `@Input()`/`@Output()` decorators, legacy structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`), or unnecessary RxJS boilerplate for local UI state.

## Folder Conventions & Tooling

- **Feature-Based Structure**: Put domain logic, API services, Zod schemas, Signal stores, and feature UI in `src/app/features/<feature>/`.
- **Shared UI & Utils**: Put reusable UI primitives in `src/app/components/ui/` and helpers (e.g. `cn()`) in `src/app/utils/`.
- **Styling**: Use Tailwind CSS v4 (`@tailwindcss/vite` + `@import "tailwindcss";` in `src/styles.css`). No `tailwind.config.js`.
- **Path Alias**: Always import internal app modules via `@/*` (mapped to `src/app/*`).
- **Validation**: Validate environment variables (`src/app/config/env.ts`) and external API/form payloads using Zod.
- **Git & Quality**: Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). Ensure `npm run type-check`, `npm run lint`, and `npm run build` pass.
