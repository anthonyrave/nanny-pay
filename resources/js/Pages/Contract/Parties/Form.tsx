import { Head, useForm, usePage } from "@inertiajs/react";
import RegistrationLayout from "@/Layouts/RegistrationLayout";
import { Button } from "@/components/ui/button";
import { EmployerForm } from "../Partials/EmployerForm";
import { EmployeeForm } from "../Partials/EmployeeForm";
import { PageProps } from "@/types";
import ContractCreationLayout from "@/Layouts/ContractCreationLayout";
import React from "react";

export default function Form({
  stepIndex,
  stepCount,
  prevStep,
}: {
  stepIndex: number;
  stepCount: number;
  prevStep?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;
  const { step } = React.useContext(submitContext);

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
    <ContractCreationLayout
      stepIndex={stepIndex}
      stepCount={stepCount}
      prevStep={prevStep}
    >
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
    </ContractCreationLayout>
  );
}
