import { Head, useForm, usePage } from "@inertiajs/react";
import RegistrationLayout from "@/Layouts/RegistrationLayout";
import { Button } from "@/components/ui/button";
import { EmployerForm } from "../Partials/EmployerForm";
import { EmployeeForm } from "../Partials/EmployeeForm";
import { PageProps } from "@/types";

export default function Create({
  stepIndex,
  stepCount,
  prevStep,
}: {
  stepIndex: number;
  stepCount: number;
  prevStep?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone_number: user.phone_number ?? "",
      employee_firstname: "",
      employee_lastname: "",
      employee_email: "",
      employee_phone_number: "",
    });

  const submit = () => {
    post(route("contracts.parties.store"));
  };

  return (
    <RegistrationLayout>
      <Head title="Créer un nouveau contrat" />

      <h1 className="text-3xl leading-tight text-foreground">
        Créer un nouveau contrat{" "}
        <span className="text-lg">
          ({stepIndex}/{stepCount})
        </span>
      </h1>

      <div className="mt-6 w-full overflow-hidden bg-card text-card-foreground px-6 py-4 max-w-xl shadow-md sm:rounded-lg">
        <EmployerForm
          data={data}
          setData={setData}
          errors={errors}
          // processing={processing}
          // recentlySuccessful={recentlySuccessful}
        />
        <EmployeeForm
          data={data}
          setData={setData}
          errors={errors}
          // processing={processing}
          // recentlySuccessful={recentlySuccessful}
          className="mt-8 mb-4"
        />
      </div>
      <div className="w-full max-w-xl mx-auto mt-6 flex justify-between">
        <div>
          {prevStep && (
            <Button asChild>
              <a href={route(prevStep)}>Precedent</a>
            </Button>
          )}
        </div>
        <div>
          <Button onClick={submit}>Suivant</Button>
        </div>
      </div>
    </RegistrationLayout>
  );
}
