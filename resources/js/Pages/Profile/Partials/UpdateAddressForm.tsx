import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "@/components/ui/button";

export default function UpdateAddress({
  className = "",
}: {
  className?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      address_line_1: user.address_line_1 ?? "",
      address_line_2: user.address_line_2 ?? "",
      postcode: user.postcode ?? "",
      city: user.city ?? "",
      country: user.city ?? "",
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.address.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-foreground">Adresse</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Modifiez ou complétez votre addresse.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="address_line_1" value="Adresse" />

          <TextInput
            id="address_line_1"
            className="mt-1 block w-full"
            value={data.address_line_1}
            onChange={(e) => setData("address_line_1", e.target.value)}
            required
            autoComplete="address"
          />

          <InputError className="mt-2" message={errors.address_line_1} />
        </div>

        <div>
          <InputLabel htmlFor="address_line_2" value="Complément d'adresse" />

          <TextInput
            id="address_line_2"
            className="mt-1 block w-full"
            value={data.address_line_2}
            onChange={(e) => setData("address_line_2", e.target.value)}
            required
          />

          <InputError className="mt-2" message={errors.address_line_2} />
        </div>

        <div>
          <InputLabel htmlFor="postcode" value="Code postal" />

          <TextInput
            id="postcode"
            className="mt-1 block w-full"
            value={data.postcode}
            onChange={(e) => setData("postcode", e.target.value)}
            required
          />

          <InputError className="mt-2" message={errors.postcode} />
        </div>

        <div>
          <InputLabel htmlFor="city" value="Ville" />

          <TextInput
            id="city"
            className="mt-1 block w-full"
            value={data.city}
            onChange={(e) => setData("city", e.target.value)}
            required
          />

          <InputError className="mt-2" message={errors.city} />
        </div>

        <div className="flex items-center gap-4">
          <Button disabled={processing}>Enregistrer</Button>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-muted-foreground">Enregistré.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
