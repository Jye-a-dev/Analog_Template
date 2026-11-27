# analog_template

Template khởi tạo dự án **AnalogJS + Angular** theo chuẩn Production-ready, tối ưu cho cả làm việc **Solo** lẫn **Team** (chỉ cần `git clone`, cấu hình `.env`, `npm install` và code ngay).

## Tech Stack

| Thành phần       | Công nghệ                                                      | Phiên bản (`package.json`)         |
| ---------------- | -------------------------------------------------------------- | ---------------------------------- |
| Meta-framework   | AnalogJS (`@analogjs/platform`, `@analogjs/router`)            | `^3.0.0`                           |
| UI Framework     | Angular (`@angular/core`, Zoneless, Signals)                   | `^22.0.0`                          |
| Build Tool       | Vite (`vite`)                                                  | `^8.0.0`                           |
| Ngôn ngữ         | TypeScript (`typescript`, strict + `noUncheckedIndexedAccess`) | `~6.0.0`                           |
| Styling          | Tailwind CSS (`tailwindcss`, `@tailwindcss/vite`)              | `^4.2.2`                           |
| Icons            | Lucide Angular (`lucide-angular`)                              | `^1.0.0`                           |
| Validation       | Zod (`zod`)                                                    | `^4.6.7`                           |
| Class Helpers    | `clsx` + `tailwind-merge`                                      | `^2.1.1` / `^3.7.1`                |
| Linting & Format | ESLint (`eslint` + `angular-eslint`) & Prettier                | `^10.15.0` / `^22.8.0` / `^3.10.1` |
| Git Hooks        | Husky + `lint-staged` + Commitlint                             | `^9.1.7` / `^17.6.2` / `^21.2.4`   |

## Yêu cầu hệ thống

- **Node.js**: theo file `.nvmrc` (Node `24`, tương thích `^22.18.0 || ^24.3.0`)
- **npm**: `>= 10`
- **VS Code Extensions khuyến nghị** (tự động gợi ý qua `.vscode/extensions.json`):
  - `angular.ng-template`
  - `dbaeumer.vscode-eslint`
  - `esbenp.prettier-vscode`
  - `bradlc.vscode-tailwindcss`

## Quick Start

```bash
git clone <repository-url>
cd analog_template
cp .env.example .env
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5000`.

## Biến môi trường (`.env`)

| Biến                | Mặc định                    | Mô tả                                                                 |
| ------------------- | --------------------------- | --------------------------------------------------------------------- |
| `PORT`              | `5000`                      | Cổng chạy Vite dev server và `vite preview`                           |
| `VITE_APP_URL`      | `http://localhost:5000`     | URL gốc của ứng dụng frontend                                         |
| `VITE_API_BASE_URL` | `http://localhost:8000/api` | Base URL cho backend API bên ngoài (tự động gắn qua `apiInterceptor`) |

## Cấu trúc thư mục & Nguyên tắc đặt file

```text
src/
├── app/
│   ├── components/ui/        # UI primitives dùng chung (ButtonComponent, ...)
│   ├── config/env.ts         # Validate & export biến môi trường typed bằng Zod
│   ├── features/<feature>/   # Nghiệp vụ theo module (api/, components/, schemas/, services/, types/)
│   ├── interceptors/         # Functional HttpInterceptorFn (apiInterceptor)
│   ├── layouts/              # Khung layout chính (MainLayoutComponent)
│   ├── pages/                # File-Based Routing mỏng của AnalogJS (*.page.ts)
│   ├── types/                # Global TypeScript interfaces (ApiResponse, PaginatedResponse...)
│   ├── utils/                # Helper dùng chung (cn.ts)
│   ├── app.ts                # Root Standalone Component (<router-outlet />)
│   └── app.config.ts         # provideFileRouter(), provideHttpClient(), provideZonelessChangeDetection()
├── server/routes/api/        # Nitro server API routes (vd: /api/v1/health)
└── styles.css                # @import 'tailwindcss';
```

**Nguyên tắc đặt file:**

- `src/app/pages/`: Chỉ khai báo route và kết nối feature, giữ thật mỏng.
- `src/app/features/<name>/`: Chứa toàn bộ business logic, Signal store, Zod schema, API service và UI riêng của feature.
- `src/app/components/ui/`: Component UI tái sử dụng toàn dự án, không chứa logic nghiệp vụ.
- `src/server/routes/api/`: Endpoint backend nội bộ chạy trên Nitro.

## NPM Scripts

| Lệnh                 | Mô tả                                                 |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Chạy Vite/AnalogJS dev server tại `PORT` trong `.env` |
| `npm run start`      | Alias chạy `vite`                                     |
| `npm run build`      | Build production (client + Nitro server)              |
| `npm run preview`    | Chạy `vite preview` theo `PORT` trong `.env`          |
| `npm run type-check` | Kiểm tra type TypeScript (`tsc --noEmit`)             |
| `npm run lint`       | Chạy ESLint kiểm tra toàn bộ mã nguồn                 |
| `npm run format`     | Format toàn bộ codebase bằng Prettier                 |

## Quy ước Git Commit

Dự án sử dụng **Conventional Commits** được kiểm tra tự động qua Husky + Commitlint:

- `feat: ...` — Tính năng mới
- `fix: ...` — Sửa lỗi
- `refactor: ...` — Tái cấu trúc code
- `docs: ...` — Cập nhật tài liệu
- `chore: ...` — Cập nhật cấu hình, dependencies
