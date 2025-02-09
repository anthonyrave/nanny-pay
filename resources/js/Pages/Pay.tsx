import SidebarLayout from "@/Layouts/SidebarLayout";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getDaysSelectedByDefault,
  getDisplayedMonth,
  getLastDayOfPreviousMonth,
  getWorkedHoursCount,
} from "@/lib/utils";
import { Head } from "@inertiajs/react";
import { fr } from "date-fns/locale";
import React, { useEffect } from "react";

export default function Dashboard() {
  const serviceDailyRate: number = 4;
  const hourlyWage: number = 3.8;
  const increaseRateString: string = "10%";
  const increasedRate: number = 1.1;
  const increasedRateAbove: number = 45;

  const getIncreasedWorkedHours = (): number => {
    let increasedWorkedHours = 0;

    weeklyCounts.forEach((hours) => {
      increasedWorkedHours += Math.max(hours - increasedRateAbove, 0);
    });

    return increasedWorkedHours;
  };

  const getBaseNetSalary = (): number => {
    return (hourlyWage * increasedRateAbove * 52) / 12;
  };

  const getIncreasedSalary = (): number =>
    getIncreasedWorkedHours() * increasedRate * hourlyWage;

  const [baseWorkingDaysCount, setBaseWorkingDaysCount] =
    React.useState<number>(0);

  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [workedHours, setWorkedHours] = React.useState<number>(0);
  const [weeklyCounts, setWeeklyCounts] = React.useState<[]>([]);

  const updateSelectedDates = (newDate: any) => {
    setSelectedDates(newDate);
    getWorkedHoursCount(newDate).then(([totalCount, weeklyCounts]) => {
      setWorkedHours(totalCount), setWeeklyCounts(weeklyCounts);
    });
  };

  useEffect(() => {
    getDaysSelectedByDefault().then((days) => {
      updateSelectedDates(days);
      setBaseWorkingDaysCount(days.length);
    });
  }, []);

  return (
    <SidebarLayout>
      <Head title="Pay" />

      <div className="p-6">
        <p className="text-2xl">Aide au calcul de la paye de la nounou</p>
      </div>
      <div className="px-6 py-2 mb-6">
        <p className="text-xl">Constantes</p>
        <div className="mb-2">
          <Label htmlFor="hours-rate">Salaire horaire de base (en euros)</Label>
          <Input
            className="w-80"
            id="service-daily-rate"
            type="text"
            value={hourlyWage}
            disabled
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="service-daily-rate">
            Indemnité d'entretien par jour travaillé (en euros)
          </Label>
          <Input
            className="w-80"
            id="service-daily-rate"
            type="text"
            value={serviceDailyRate}
            disabled
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="increase-rate">
            Taux de majorations des heures au delà de {increasedRateAbove}h
          </Label>
          <Input
            className="w-80"
            id="increase-rate"
            type="text"
            value={increaseRateString}
            disabled
          />
        </div>
      </div>
      <div className="px-6 py-2 mb-6">
        <p className="text-xl">Variables</p>
        <div className="flex justify-between">
          <div>
            <div className="mb-2">
              <Label htmlFor="working-days">Nombre de jours travaillés</Label>
              <Input
                className="w-80"
                id="working-days"
                value={selectedDates.length}
                type="text"
                disabled
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="free-days">Nombre de jours de congés</Label>
              <Input
                className="w-80"
                id="free-days"
                value={Math.max(baseWorkingDaysCount - selectedDates.length, 0)}
                type="text"
                disabled
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="worked-hours">Nombre d'heures travaillées</Label>
              <Input
                className="w-80"
                id="worked-hours"
                value={workedHours}
                type="text"
                disabled
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="worked-hours">Nombre d'heures majorées</Label>
              <Input
                className="w-80"
                id="worked-hours"
                value={getIncreasedWorkedHours()}
                type="text"
                disabled
              />
            </div>
          </div>
          <div>
            <Calendar
              locale={fr}
              mode="multiple"
              defaultMonth={getDisplayedMonth()}
              disableNavigation
              selected={selectedDates}
              onSelect={updateSelectedDates}
              disabled={[
                { before: getLastDayOfPreviousMonth() },
                { dayOfWeek: [0, 6] },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="px-6 py-2 mb-6">
        <p className="text-xl">Totaux</p>
        <div className="mb-2">
          <Label htmlFor="net-salary">
            Salaire net (hors frais d'entretien, heures majorées, ...)
          </Label>
          <Input
            className="w-80"
            id="net-salary"
            type="text"
            value={getBaseNetSalary()}
            disabled
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="increased-salary">Heures majorées</Label>
          <Input
            className="w-80"
            id="increased-salary"
            type="text"
            value={Math.round(getIncreasedSalary() * 100) / 100}
            disabled
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="total-pay">Salaire total</Label>
          <Input
            className="w-80"
            id="total-pay"
            value={
              Math.round((getBaseNetSalary() + getIncreasedSalary()) * 100) /
              100
            }
            type="text"
            disabled
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="net-salary">Indemnité d'entretien</Label>
          <Input
            className="w-80"
            id="net-salary"
            type="text"
            value={selectedDates.length * serviceDailyRate}
            disabled
          />
        </div>
      </div>
    </SidebarLayout>
  );
}
