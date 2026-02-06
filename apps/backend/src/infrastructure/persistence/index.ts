// src/infrastructure/persistence/index.ts
// Centralized export of all repositories, currently only the BookingMemoryRepository, but can be extended to include other repositories in the future

import { BookingMemoryRepository } from "./BookingMemoryRepository";

export const bookingRepository = new BookingMemoryRepository();
