# BarHub audit report (Next.js + TS) — performance, maintainability, a11y, bundle, UI

## Project snapshot
- **Framework**: Next.js App Router (`src/app`), React 19, TypeScript
- **Styling/UI**: Tailwind CSS v4 (CSS-first), shadcn/ui patterns, CSS variables in `src/app/globals.css`
- **Notable deps**: `recharts` (charts), `framer-motion` (login animation), `lucide-react` (icons)

## Static checks executed
- **TypeScript**: `pnpm exec tsc --noEmit` → **PASS**
- **ESLint**: `pnpm lint` → **PASS** (initially had warnings in `src/components/ui/avatar.tsx`, now resolved)
- **depcheck**: `pnpm dlx depcheck --json`
  - Reported unused devDeps: `@tailwindcss/postcss`, `@types/node`, `@types/react-dom`, `tailwindcss`, `tw-animate-css`
  - **Note**: these are likely **false positives** for this stack (Tailwind v4 is referenced from CSS, PostCSS config is indirect, and types are consumed by TS tooling).
- **Production build**: `pnpm build` → **PASS**
  - Next prints a recurring warning about `baseline-browser-mapping` being outdated; it’s safe but noisy and worth updating.

## Prioritized findings & fixes

### High — Performance / bundle / hydration
1) **Main app shell was fully client-hydrated**
   - **Where**: `src/app/(main)/layout.tsx` (previously `"use client"` for sidebar state)
   - **Impact**: Unnecessary hydration cost for all main routes; larger client bundle and slower TTI.
   - **Fix applied**: Made `(main)` layout server again and moved sidebar state into a small client wrapper.
   - **Files changed**: `src/app/(main)/layout.tsx`, `src/components/main-shell.tsx`
   - **How to measure**: Compare “JS executed” + “Hydration” in React DevTools Profiler and Lighthouse TTI before/after.

2) **Dashboard charts force client rendering and pull `recharts` into the page**
   - **Where**: `src/app/(main)/dashboard/page.tsx`
   - **Impact**: `recharts` is heavy; dashboard interactivity can dominate route JS.
   - **Fix applied**: Split charts into a client component (`DashboardCharts`) and kept the page server-rendered.
   - **Files changed**: `src/app/(main)/dashboard/page.tsx`, `src/components/dashboard/dashboard-charts.tsx`
   - **Further improvement** (recommended): `next/dynamic` load charts after first paint (e.g. `ssr: false`) to improve initial dashboard responsiveness.

### High — Accessibility (a11y)
3) **Sidebar toggle + collapsed nav lacked accessible labeling and focus**
   - **Where**: `src/components/sidebar.tsx`
   - **Impact**: Keyboard/screen-reader usability issues; focus outline was removed.
   - **Fix applied**: Added `aria-label`, `aria-expanded`, `aria-current`, restored focus-visible ring, ensured collapsed links still have accessible names.

4) **Login/register UI lacked form semantics and labels**
   - **Where**: `src/app/login/page.tsx`
   - **Impact**: Screen readers and autofill struggle; buttons default to `type="submit"` unexpectedly.
   - **Fix applied**: Added `<form>`, `<label htmlFor>`, `autoComplete`, explicit button types; refreshed UI to a neutral SaaS look.

5) **Progress bar had no semantic role**
   - **Where**: `src/components/ui/progress.tsx` (used in `src/app/(main)/inventory/page.tsx`)
   - **Impact**: Screen readers don’t announce progress at all.
   - **Fix applied**: Added `role="progressbar"` + `aria-valuenow/min/max` and passed a contextual `ariaLabel` from inventory rows.

6) **Badge used `role="status"` globally (incorrect live-region semantics)**
   - **Where**: `src/components/ui/badge.tsx`
   - **Impact**: Screen readers may announce badges as “status updates” even when static.
   - **Fix applied**: Removed the default `role="status"`; callers can still opt-in if truly needed.

### Medium — Maintainability / clean code
7) **Index keys in lists**
   - **Where**: `src/app/(main)/orders/page.tsx` and previously dashboard list items
   - **Impact**: React reconciliation issues on reorder/insert; subtle UI bugs.
   - **Fix applied**: Replaced with stable keys where data supports it.

8) **Hard-coded grays/blues fought the shadcn token system**
   - **Where**: Across most pages (`src/app/(main)/**`)
   - **Impact**: Inconsistent look, harder to adjust theme/dark mode; more repeated styling.
   - **Fix applied**: Swapped many usages to token-based classes (`text-muted-foreground`, `bg-muted`, `bg-primary/10`, etc.) and centered the main content width for consistent layout.
   - **Files touched**: `src/app/(main)/tables/page.tsx`, `orders/page.tsx`, `inventory/page.tsx`, `staff/page.tsx`, `src/components/page-header.tsx`, `src/components/main-shell.tsx`, `src/app/globals.css`

### Low — UX / polish
9) **Root route still showed the Create Next App template**
   - **Where**: `src/app/page.tsx`
   - **Impact**: Confusing entry point; unrelated content.
   - **Fix applied**: Redirect `/` → `/dashboard` for a clean demo entry point.

10) **Metadata was default**
   - **Where**: `src/app/layout.tsx`
   - **Impact**: Poor SEO/share previews.
   - **Fix applied**: Updated title/description.

## Bundle size notes (actionable)
- **Biggest likely contributors**:
  - `recharts`: keep it dashboard-only (done) and consider dynamic import for charts.
  - `framer-motion`: currently only on `/login` (good); keep it out of shared components.
- **Icon strategy**:
  - `lucide-react` imports are per-icon and generally tree-shake well; keep imports specific (already done).

## Visual modernization recommendations (neutral SaaS direction)
- **Typography**: consistent page headings via `PageHeader` (now `h1`, tighter tracking); use `text-muted-foreground` for secondary copy.
- **Color system**: set a single brand primary via CSS variables (updated `--primary`) and rely on `Button` variants instead of per-page `bg-blue-*` overrides.
- **Layout**: constrain main content to a consistent max width (`max-w-6xl` in `MainShell`) with uniform gutters; keep cards on a soft `bg-muted/30` surface.
- **Component consistency**:
  - Prefer `Button` variants (`default/outline/secondary`) over custom greens/blues per page.
  - Use semantic tints (`bg-primary/10`, `bg-amber-500/10`, etc.) sparingly for status summary tiles.

## What to measure next (recommended)
- **Lighthouse** (Perf + A11y) on `/dashboard`, `/inventory`, `/login`
- **Next build output**: re-run after adding dynamic chart imports; compare route JS sizes
- **React Profiler**: compare commits and time-to-interactive on dashboard before/after chart lazy-loading


