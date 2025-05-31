import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false as boolean,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            autoFocus={true}
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <Label htmlFor="password">Mot de passe</Label>

            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="rounded-md text-sm text-muted-foreground underline underline-offset-4"
              >
                Mot de passe oublié ?
              </Link>
            )}
          </div>

          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onCheckedChange={(e) =>
                setData("remember", (e.valueOf() || false) as false)
              }
            />
            <span className="ms-2 text-sm text-muted-foreground">
              Se souvenir de moi
            </span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route("register")}
            className="rounded-md text-sm text-muted-foreground underline underline-offset-4"
          >
            Pas encore de compte ?
          </Link>

          <Button className="ms-4" disabled={processing}>
            Connexion
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
