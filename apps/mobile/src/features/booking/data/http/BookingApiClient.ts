// src/features/auth/data/http/bookingApiClient.ts
// feature-by-feature implementation of the API client for the booking provider's API.
// This client is responsible for making HTTP requests to the providers.

import { ENV } from '../../../../app/config/env';
import { createApiClient } from '../../../../shared/http/apiClient';

export const BookingApiClient = createApiClient(
  ENV.API_BASE_URL
);
