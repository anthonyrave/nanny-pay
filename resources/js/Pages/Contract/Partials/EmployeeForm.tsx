import { Input } from "@/components/ui/input";
import PhoneInput from "@/Components/Form/PhoneInput";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

const EmployeeForm = forwardRef(
  (
    {
      className = "",
      data = {},
      setData = () => {},
    }: {
      className?: string;
      data: {
        employee_firstname?: string;
        employee_lastname?: string;
        employee_email?: string;
        employee_phone_number?: string;
      };
      setData: CallableFunction;
    },
    ref,
  ) => {
    return (
      <section className={className}>
        <header>
          <h2 className="text-lg font-medium">Assistant maternel</h2>
        </header>

        <form className="mt-4 space-y-4">
          <div className="flex gap-2">
            <div className="w-full">
              <Label htmlFor="firstname">Prénom</Label>

              <Input
                id="employee-firstname"
                className="mt-1 block w-full"
                value={data.employee_firstname}
                onChange={(e) => setData("employee_firstname", e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="employee-lastname">Nom</Label>

              <Input
                id="employee-lastname"
                className="mt-1 block w-full"
                value={data.employee_lastname}
                onChange={(e) => setData("employee_lastname", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="employee-email">Email</Label>

            <Input
              id="employee-email"
              type="email"
              className="mt-1 block w-full"
              value={data.employee_email}
              onChange={(e) => setData("employee_email", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="employee-phone-number">Numéro de téléphone</Label>

            <PhoneInput
              id="employee-phone-number"
              className="mt-1 block w-full"
              value={data.employee_phone_number}
              onChange={(e) => setData("employee_phone_number", e.target.value)}
            />
          </div>
        </form>
      </section>
    );
  },
);

export { EmployeeForm };
