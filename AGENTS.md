# Project rules

## Versioning
- Version = jumlah total git commits.
- Setiap kali user bilang "persiapan deploy" / "staged":
  1. Update `version` di `package.json` pakai `git rev-list --count HEAD`.
  2. `git add .` (stage semua).
- Jangan lupa commit & push setelah update version.
