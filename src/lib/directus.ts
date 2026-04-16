import { createDirectus, rest } from '@directus/sdk';

// Definiujemy strukturę danych, jakiej spodziewamy się z Directusa (kolekcja Beveling_machines)
export interface ToolGroup {
  id: string | number;
  name: string;
}

export interface Machine {
  id: string | number;
  name: string;
  marketing_name: string;
  description: string;
  main_photo: string; 
  grupa_narzedzi?: ToolGroup | string | number | null;
  featured?: boolean | null;
}

// Definiujemy schemat całej bazy (kolekcje)
interface Schema {
  Beveling_machines: Machine[];
}

// Pobieramy URL z konfiguracji (lub używamy domyślnego dla środowiska lokalnego)
export const directusUrl = import.meta.env.DIRECTUS_URL || 'http://localhost:8055';
export const hasDirectusConfig = Boolean(import.meta.env.DIRECTUS_URL);

// Inicjalizacja klienta Directus
export const directus = createDirectus<Schema>(directusUrl).with(rest());

/**
 * Funkcja pomocnicza do pobierania poprawnego URL obrazka z Directusa.
 * W Directusie pole typu "Image" zwraca zazwyczaj UUID pliku.
 * Jeśli to UUID, budujemy pełny URL. Jeśli to już jest URL (np. z mockData), zostawiamy.
 */
export function getImageUrl(imageField: string | null | undefined): string {
  if (!imageField) return '/placeholder.svg';
  
  // Jeśli to już jest pełny link (np. z naszych mocków)
  if (imageField.startsWith('http')) {
    return imageField;
  }
  
  // Jeśli to UUID z Directusa, budujemy link do API
  return `${directusUrl.replace(/\/$/, '')}/assets/${imageField}`;
}
