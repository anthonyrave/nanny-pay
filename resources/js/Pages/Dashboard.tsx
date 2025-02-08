import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getDaysSelectedByDefault,
  getDisplayedMonth,
  getLastDayOfPreviousMonth,
} from "@/lib/utils";
import { Head } from "@inertiajs/react";
import { fr } from "date-fns/locale";
import React, { useEffect } from "react";

export default function Dashboard() {
  const serviceDailyRate = 4;
  const [baseWorkingDaysCount, setBaseWorkingDaysCount] =
    React.useState<number>(0);
  const [workingDaysCount, setWorkingDaysCount] = React.useState<number>(0);
  const [date, setDate] = React.useState<Date[]>([]);

  useEffect(() => {
    getDaysSelectedByDefault().then((days) => {
      setDate(days);
      setBaseWorkingDaysCount(days.length);
    });
  }, []);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg text-gray-900">
            <div className="p-6">blabla</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
