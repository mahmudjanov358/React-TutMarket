# TUT Market — Frontend (React + Vite)

UI qismi React va Vite asosida qurilgan. Backend bilan `VITE_API_BASE_URL` orqali bog‘lanadi.

## 1) O‘rnatish

- Talablar: Node.js 18+, npm
- Bosqichlar:
  - cd frontend
  - npm install

## 2) Ishga tushirish

- Dev:
  - npm run go
  - yoki npm run dev
- Build:
  - npm run build
- Preview (buildni ko‘rish):
  - npm run preview

Dev server odatda: http://localhost:5173

## 3) .env konfiguratsiya (frontend/.env)

Backend API manzilini moslang:

VITE_API_BASE_URL=http://localhost:PORT

## 4) Tuzilma (qisqacha)

- `src/` — komponentlar, sahifalar, kontekstlar
- `public/` — statik fayllar
- `index.html` — Vite kirish nuqtasi

## 5) Foydali eslatmalar

- Agar CORS bilan bog‘liq muammo bo‘lsa, backend `CORS_ORIGIN` qiymatini `http://localhost:5173` ga sozlang.
- Productionda `VITE_API_BASE_URL` ni domeningizga moslang (masalan, https://api.your-domain.com).

## Egasi va aloqa

- Egasi: Abdulloh Mahmudjanov
- Aloqa: mahmudjanovabdulloh46@gmail.com
