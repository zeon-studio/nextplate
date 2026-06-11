# Internationalization (i18n) Guidance

This project uses `next-intl` for internationalization. It's crucial that all application text is correctly localized and AI agents do not hallucinate old or hardcoded text.

## Core Concepts

- **Configuration:** The `src/i18n/` directory contains `request.ts` and `routing.ts`. The locales are defined in `src/config/config.json` under `internationalization`.
- **Locale Files:** Translation strings are stored in JSON files within `src/i18n/` (e.g., `en.json`, `ar.json`, `fr.json`). **AI agents must always add new strings to these files and use them in the code instead of hardcoding text.**
- **Routing:** Handled via `next-intl/routing`. Navigation hooks (`Link`, `usePathname`, `useRouter`, etc.) should be imported from `@/i18n/routing` or `src/i18n/routing.ts` to ensure locale awareness.

## Usage in Components

### Server Components
Use `getTranslations` from `next-intl/server` for fetching translations in Server Components:

```tsx
import { getTranslations } from "next-intl/server";

export default async function MyServerComponent() {
  const t = await getTranslations();
  return <h1>{t("my_translation_key")}</h1>;
}
```

### Client Components
Use `useTranslations` from `next-intl` for fetching translations in Client Components:

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyClientComponent() {
  const t = useTranslations();
  return <button>{t("my_button_text")}</button>;
}
```

## Static Rendering (SSG)
When creating or modifying Server Components that are page routes (`page.tsx`), you must call `setRequestLocale` from `next-intl/server` to enable static rendering:

```tsx
import { setRequestLocale } from "next-intl/server";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  // ...
}
```

## Important Rules for AI Agents
1. **Never Hardcode Strings:** Any user-facing text must be added to the respective JSON files in `src/i18n/`.
2. **Use Correct Imports:** Differentiate between `next-intl/server` for Server Components and `next-intl` for Client Components.
3. **SSG Compatibility:** Always invoke `setRequestLocale(locale)` at the top of your page components to support static exports properly.
