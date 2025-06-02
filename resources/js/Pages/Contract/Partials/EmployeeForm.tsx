import { Input } from "@/components/ui/input";
import PhoneInput from "@/Components/Form/PhoneInput";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { FormError } from "@/Components/Form/FormError";

const EmployeeForm = forwardRef(
  (
    {
      className = "",
      data = {},
      setData = () => {},
      errors = {},
    }: {
      className?: string;
      data: {
        employee_firstname?: string;
        employee_lastname?: string;
        employee_email?: string;
        employee_phone_number?: string;
      };
      setData: CallableFunction;
      errors: {
        employee_firstname?: string;
        employee_lastname?: string;
        employee_email?: string;
        employee_phone_number?: string;
      };
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
            <div className="w-full grid gap-2">
              <Label
                htmlFor="firstname"
                className="data-[error=true]:text-destructive"
                data-error={!!errors.employee_firstname}
              >
                Prénom
              </Label>

              <Input
                id="employee-firstname"
                className="block w-full aria-[invalid=true]:border-destructive"
                value={data.employee_firstname}
                onChange={(e) => setData("employee_firstname", e.target.value)}
                aria-invalid={!!errors.employee_firstname}
                required
              />

              <FormError value={errors.employee_firstname} />
            </div>
            <div className="w-full grid gap-2">
              <Label
                htmlFor="employee-lastname"
                className="data-[error=true]:text-destructive"
                data-error={!!errors.employee_lastname}
              >
                Nom
              </Label>

              <Input
                id="employee-lastname"
                className="block w-full aria-[invalid=true]:border-destructive"
                value={data.employee_lastname}
                onChange={(e) => setData("employee_lastname", e.target.value)}
                aria-invalid={!!errors.employee_lastname}
                required
              />

              <FormError value={errors.employee_lastname} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="employee-email"
              className="data-[error=true]:text-destructive"
              data-error={!!errors.employee_email}
            >
              Email
            </Label>

            <Input
              id="employee-email"
              type="email"
              className="block w-full aria-[invalid=true]:border-destructive"
              value={data.employee_email}
              onChange={(e) => setData("employee_email", e.target.value)}
              aria-invalid={!!errors.employee_email}
              required
            />

            <FormError value={errors.employee_email} />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="employee-phone-number"
              className="data-[error=true]:text-destructive"
              data-error={!!errors.employee_phone_number}
            >
              Numéro de téléphone
            </Label>

            <PhoneInput
              id="employee-phone-number"
              className="block w-full aria-[invalid=true]:border-destructive"
              value={data.employee_phone_number}
              onChange={(e) => setData("employee_phone_number", e.target.value)}
              aria-invalid={!!errors.employee_phone_number}
              required
            />

            <FormError value={errors.employee_phone_number} />
          </div>
        </form>
      </section>
    );
  },
);

export { EmployeeForm };
