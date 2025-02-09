import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone_number: user.phone_number,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Informations personnelles
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Modifiez ou complétez vos informations personnelles.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="firstname" value="Prénom" />

          <TextInput
            id="firstname"
            className="mt-1 block w-full"
            value={data.firstname}
            onChange={(e) => setData("firstname", e.target.value)}
            required
            isFocused
            autoComplete="firstname"
          />

          <InputError className="mt-2" message={errors.firstname} />
        </div>

        <div>
          <InputLabel htmlFor="lastname" value="Nom" />

          <TextInput
            id="lastname"
            className="mt-1 block w-full"
            value={data.lastname}
            onChange={(e) => setData("lastname", e.target.value)}
            required
            autoComplete="lastname"
          />

          <InputError className="mt-2" message={errors.lastname} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div>
          <InputLabel htmlFor="phone_number" value="Numéro de téléphone" />

          <TextInput
            id="phone-number"
            type="tel"
            className="mt-1 block w-full"
            value={data.phone_number ?? ""}
            onChange={(e) => setData("phone_number", e.target.value)}
            autoComplete="phone_number"
          />

          <InputError className="mt-2" message={errors.phone_number} />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Enregistré.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
