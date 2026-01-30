// domain/utils/scheduling.ts

/* =========================
   TIME HELPERS
========================= */

export const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

export const minutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

/* =========================
   OVERLAP
========================= */

export const overlaps = (
  startA: number,
  endA: number,
  startB: number,
  endB: number
): boolean => startA < endB && startB < endA;

/* =========================
   WORK DAY
========================= */

export const WORK_DAY_START_MINUTES = 10 * 60;
export const WORK_DAY_END_MINUTES = 18 * 60;

/* =========================
   SLOTS
========================= */

export const getAvailableStartTimes = (
  durationMinutes: number
): string[] => {
  const slots: string[] = [];
  let current = WORK_DAY_START_MINUTES;

  while (current + durationMinutes <= WORK_DAY_END_MINUTES) {
    slots.push(minutesToTime(current));
    current += durationMinutes;
  }

  return slots;
};

/* =========================
   FILTER WITH BOOKINGS
========================= */

export const getAvailableStartTimesWithBookings = (
  durationMinutes: number,
  bookings: { date: string; time: string; durationMinutes: number }[],
  date: string
): string[] => {
  
  const baseSlots = getAvailableStartTimes(durationMinutes);
  const dayBookings = bookings.filter(b => b.date === date);

  return baseSlots.filter(startTime => {
    const start = timeToMinutes(startTime);
    const end = start + durationMinutes;

    return !dayBookings.some(b => {
      const bookedStart = timeToMinutes(b.time);
      const bookedEnd = bookedStart + b.durationMinutes;
      return overlaps(start, end, bookedStart, bookedEnd);
    });
  });
};

/* =========================
   DISPLAY
========================= */

export const getTimeRange = (
  startTime: string,
  durationMinutes: number
): string => {
  const start = timeToMinutes(startTime);
  const end = start + durationMinutes;
  return `${minutesToTime(start)} – ${minutesToTime(end)}`;
};
