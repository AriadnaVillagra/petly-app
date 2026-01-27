import { Service } from "../../domain/entities/Service";


export const SERVICES: Service[] = [
  new Service('BATH', '🛁 Baño', 5000, 'BATH'),
  new Service('HYGIENIC_CUT', '✂️ Corte higiénico', 4000, 'HYGIENIC_CUT'),
  new Service('NAIL_TRIM', '💅 Corte de uñas', 3000, 'NAIL_TRIM'),
  new Service('BATH_AND_CUT', '🛁✂️ Baño y corte', 7000, 'BATH_AND_CUT'),
  new Service('STRIPPING', '🧶 Stripping', 8000, 'STRIPPING'),
];
