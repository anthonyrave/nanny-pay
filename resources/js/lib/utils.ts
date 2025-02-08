import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getHolidays(): Promise<Date[]> {
  const year = new Date().getFullYear();

  const response = await fetch(
    `https://calendrier.api.gouv.fr/jours-feries/alsace-moselle/${year}.json`,
  );

  const data = await response.json();

  return data
    ? Object.keys(data).map((date) => {
        const [y, m, d] = date.split("-").map(Number);
        return new Date(y, m - 1, d);
      })
    : [];
}

export function getCurrentMonthNumber(): number {
  const today = new Date();

  return today.getDate() <= 10 ? today.getMonth() - 1 : today.getMonth();
}

export function getDisplayedMonth(): Date {
  return new Date(new Date().getFullYear(), getCurrentMonthNumber());
}

export function getLastDayOfPreviousMonth(): Date {
  return new Date(new Date().getFullYear(), getCurrentMonthNumber(), 0);
}

export async function getDaysSelectedByDefault(): Promise<Date[]> {
  const year = new Date().getFullYear();
  const displayedMonth = getCurrentMonthNumber();
  const daysInMonth = new Date(year, displayedMonth + 1, 0).getDate();
  const selectedDays = [];

  const holidays = await getHolidays();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, displayedMonth, day);
    const dayOfWeek = date.getDay();

    if (
      dayOfWeek !== 0 &&
      dayOfWeek !== 6 &&
      !holidays.some((h) => h.getTime() === date.getTime())
    ) {
      selectedDays.push(date);
    }
  }

  return selectedDays;
}

export async function getWorkedHoursCount(workedDays: Date[]): Promise<any> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workedDays: workedDays }),
  };

  const response = await fetch(`/api/workedHours`, requestOptions);

  const json = await response.json();

  return json.data ? [json.data.totalCount, json.data.weeklyCounts] : [0, []];
}
