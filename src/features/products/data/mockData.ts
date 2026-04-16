import type { Machine } from '../../../lib/directus';

export const machines: Machine[] = [
  {
    id: 'a60-p',
    name: 'A60-P Pneumatic Drive',
    marketing_name: 'High-output rolling',
    main_photo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    description:
      'Pneumatic drive designed for fast rolling cycles, stable torque and repeatable work on tube sheets in production environments.',
    grupa_narzedzi: { id: 'tube-rolling', name: 'Tube rolling systems' },
    featured: true,
  },
  {
    id: 'k70-electric',
    name: 'K70 Electric Series',
    marketing_name: 'Electric precision drive',
    main_photo: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80',
    description:
      'Electric rolling unit for quieter operation, clean setup and repeatable performance on maintenance and assembly lines.',
    grupa_narzedzi: { id: 'tube-rolling', name: 'Tube rolling systems' },
    featured: true,
  },
  {
    id: 'hyper-bevel-4',
    name: 'Hyper-Bevel 4.0',
    marketing_name: 'Facing and beveling',
    main_photo: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    description:
      'Heavy-duty portable machine for preparing thick-wall pipes with consistent bevel geometry and fast setup on site.',
    grupa_narzedzi: { id: 'beveling', name: 'Beveling machines' },
    featured: true,
  },
  {
    id: 'auto-feed-200',
    name: 'Auto Feed 200',
    marketing_name: 'Process automation',
    main_photo: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    description:
      'Controller and feed package that shortens operator setup time and stabilizes cycle-to-cycle repeatability.',
    grupa_narzedzi: { id: 'automation', name: 'Automation and control' },
    featured: false,
  },
  {
    id: 'mini-clean-pro',
    name: 'Mini Clean Pro',
    marketing_name: 'Tube cleaning unit',
    main_photo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    description:
      'Compact cleaning system for small diameters, ideal for service teams that need mobility and quick deployment.',
    grupa_narzedzi: { id: 'service-tools', name: 'Service tools' },
    featured: false,
  },
  {
    id: 'site-ready-450',
    name: 'Site Ready 450',
    marketing_name: 'Field machining',
    main_photo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    description:
      'Portable field unit for crews that need a resilient setup, clear controls and fast transportation between jobs.',
    grupa_narzedzi: { id: 'field-machining', name: 'Field machining' },
    featured: false,
  },
];
