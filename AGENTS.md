# Project rules

## Versioning
- Version = jumlah total git commits.
- Setiap kali user bilang "persiapan deploy" / "staged":
  1. Update `version` di `package.json` pakai `git rev-list --count HEAD`.
  2. `git add .` (stage semua).
- Jangan lupa commit & push setelah update version.

## TDD (Test-Driven Development)

Siklus **Red-Green-Refactor** wajib untuk setiap fitur/component baru:

### Workflow
1. **Red** — Tulis test dulu (describe/it/expect), jalankan `npm test` → pastikan **gagal** karena belum ada implementasi.
2. **Green** — Tulis kode minimal yang bikin test lolos, jangan lebih.
3. **Refactor** — Bersihin kode, pastikan test tetap hijau.

### Aturan
- Setiap file produksi `src.ts` punya file test `src.test.ts` (sejajar atau di folder `__tests__/`).
- Utility/pure function wajib di-test.
- Component test pakai `@testing-library/react` (render, screen, fireEvent).
- Jalanin `npm test` setiap selesai nulis code, **sebelum commit**.
- Jangan commit kalau ada test merah.
