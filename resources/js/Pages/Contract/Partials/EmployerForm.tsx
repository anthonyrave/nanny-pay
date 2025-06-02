import { FormError } from "@/Components/Form/FormError";
import PhoneInput from "@/Components/Form/PhoneInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef, useImperativeHandle } from "react";

const EmployerForm = forwardRef(
  (
    {
      className = "",
      data = {},
      setData = () => {},
      errors = {},
    }: {
      className?: string;
      data: {
        firstname?: string;
        lastname?: string;
        email?: string;
        phone_number?: string;
      };
      setData: CallableFunction;
      errors: {
        firstname?: string;
        lastname?: string;
        email?: string;
        phone_number?: string;
      };
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      onChange: () => {},
    }));

    return (
      <section className={className}>
        <header>
          <h2 className="text-lg font-medium">Particulier employeur</h2>
        </header>
        <form className="mt-4 space-y-4">
          <div className="flex gap-2">
            <div className="w-full grid gap-2">
              <Label
                htmlFor="firstname"
                className="data-[error=true]:text-destructive"
                data-error={!!errors.firstname}
              >
                Prénom
              </Label>

              <Input
                id="firstname"
                className="block w-full aria-[invalid=true]:border-destructive"
                value={data.firstname}
                aria-invalid={!!errors.firstname}
                disabled
              />

              <FormError value={errors.firstname} />
            </div>

            <div className="w-full grid gap-2">
              <Label
                htmlFor="lastname"
                className="data-[error=true]:text-destructive"
                data-error={!!errors.lastname}
              >
                Nom
              </Label>

              <Input
                id="lastname"
                className="block w-full aria-[invalid=true]:border-destructive"
                value={data.lastname}
                aria-invalid={!!errors.lastname}
                disabled
              />
              <FormError value={errors.lastname} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="data-[error=true]:text-destructive"
              data-error={!!errors.email}
            >
              Email
            </Label>

            <Input
              id="email"
              type="email"
              className="block w-full aria-[invalid=true]:border-destructive"
              value={data.email}
              aria-invalid={!!errors.email}
              disabled
            />
            <FormError value={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="phone_number"
              className="data-[error=true]:text-destructive"
              data-error={!!errors.phone_number}
            >
              Numéro de téléphone
            </Label>

            <PhoneInput
              id="phone_number"
              className="block w-full aria-[invalid=true]:border-destructive"
              value={data.phone_number}
              onChange={(e) => setData("phone_number", e.target.value)}
              aria-invalid={!!errors.phone_number}
            />
            <FormError value={errors.phone_number} />
          </div>
        </form>
      </section>
    );
  },
);

export { EmployerForm };
