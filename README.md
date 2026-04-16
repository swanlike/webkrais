# webkrais

Nowy prototyp katalogu produktowego zbudowany w Astro i oparty o Directus jako zrodlo tresci. Aplikacja jest celowo lekka: ma nowa warstwe wizualna, jeden uporzadkowany przeplyw danych i czyste podstawy do dalszego prototypowania.

## Zalozenia

- nowoczesny front w Astro
- dane maszyn pobierane z Directusa
- fallback do mockow, gdy CMS nie jest dostepny
- routing pod kategorie i strony detalu maszyny
- prosty kod gotowy do dalszych iteracji

## Jak dziala aplikacja

Aplikacja buduje katalog z kolekcji `Beveling_machines`. Jesli `DIRECTUS_URL` nie jest ustawiony albo Directus nie odpowiada, projekt przechodzi na dane z `src/features/products/data/mockData.ts`.

Kluczowe widoki:

- strona glowna z hero, statystykami i pelna lista maszyn
- strona kategorii `/category/[id]`
- strona detalu `/machine/[id]`

## Struktura

- [src/lib/directus.ts](d:\Dev\webkrais\src\lib\directus.ts) - klient Directus i helper do assetow
- [src/lib/catalog.ts](d:\Dev\webkrais\src\lib\catalog.ts) - wspolna logika katalogu, grupowanie kategorii i fallback do mockow
- [src/components/MachineGrid.astro](d:\Dev\webkrais\src\components\MachineGrid.astro) - siatka kart maszyn
- [src/layouts/Layout.astro](d:\Dev\webkrais\src\layouts\Layout.astro) - glowny layout aplikacji
- [src/pages/index.astro](d:\Dev\webkrais\src\pages\index.astro) - strona glowna
- [src/pages/category/[id].astro](d:\Dev\webkrais\src\pages\category\[id].astro) - listing kategorii
- [src/pages/machine/[id].astro](d:\Dev\webkrais\src\pages\machine\[id].astro) - detal maszyny

## Konfiguracja

Przyklad `.env`:

```env
DIRECTUS_URL="http://localhost:8055"
```

## Uruchomienie

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
```

## Co zostalo wyczyszczone

- usuniete zaleznosci po obcym szablonie, ktore nie byly potrzebne
- usuniety modal demo oparty o Preline
- uproszczona konfiguracja Astro
- zebrana logika danych do jednego modulu
- odswiezony README i `.env.example`

## Nastepne sensowne kroki

- podpiecie prawdziwego formularza zapytania
- mapowanie pelnego modelu danych z Directusa
- dodanie testow i walidacji tresci
- wdrozenie na docelowy hosting Astro
