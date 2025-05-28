import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="firstname">Prénom</Label>

          <Input
            id="firstname"
            name="firstname"
            value={data.firstname}
            className="mt-1 block w-full"
            autoComplete="firstname"
            autoFocus={true}
            onChange={(e) => setData("firstname", e.target.value)}
            required
          />

          <InputError message={errors.firstname} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="lastname">Nom</Label>

          <Input
            id="lastname"
            name="lastname"
            value={data.lastname}
            className="mt-1 block w-full"
            autoComplete="lastname"
            onChange={(e) => setData("lastname", e.target.value)}
            required
          />

          <InputError message={errors.lastname} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="email"
            onChange={(e) => setData("email", e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Mot de passe</Label>

          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password", e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password_confirmation">Confirmation</Label>

          <Input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route("login")}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Déjà inscrit ?
          </Link>

          <Button className="ms-4" disabled={processing}>
            Créer mon compte
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
