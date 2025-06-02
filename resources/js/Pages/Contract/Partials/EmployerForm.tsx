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
            <div className="w-full">
              <Label htmlFor="firstname">Prénom</Label>

              <Input
                id="firstname"
                className="mt-1 block w-full"
                value={data.firstname}
                disabled
              />
              <span>{errors.firstname}</span>
            </div>

            <div className="w-full">
              <Label htmlFor="lastname">Nom</Label>

              <Input
                id="lastname"
                className="mt-1 block w-full"
                value={data.lastname}
                disabled
              />
              <span>{errors.lastname}</span>
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={data.email}
              disabled
            />
            <span>{errors.email}</span>
          </div>

          <div>
            <Label htmlFor="phone_number">Numéro de téléphone</Label>

            <PhoneInput
              id="phone_number"
              className="mt-1 block w-full"
              value={data.phone_number}
              onChange={(e) => setData("phone_number", e.target.value)}
            />
            <span>{errors.phone_number}</span>
          </div>
        </form>
      </section>
    );
  },
);

export { EmployerForm };
