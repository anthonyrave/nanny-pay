import { useForm, usePage } from "@inertiajs/react";
import { EmployerForm } from "../Partials/EmployerForm";
import { EmployeeForm } from "../Partials/EmployeeForm";
import { FormHandle, PageProps } from "@/types";
import ContractCreationLayout from "@/Layouts/ContractCreationLayout";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";

const Form = forwardRef<FormHandle>(
  (
    {
      stepIndex,
      stepCount,
      prevStep,
    }: {
      stepIndex: number;
      stepCount: number;
      prevStep?: string;
    },
    ref,
  ) => {
    const user = usePage<PageProps>().props.auth.user;

    const formRef = useRef<HTMLFormElement>(null);

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

    useImperativeHandle(ref, () => ({
      submit: () => {
        if (formRef.current) {
          formRef.current.requestSubmit();
        }
      },
    }));

    return (
      <ContractCreationLayout
        stepIndex={stepIndex}
        stepCount={stepCount}
        prevStep={prevStep}
        formRef={ref}
      >
        <div className="mt-6 w-full overflow-hidden bg-card text-card-foreground px-6 py-4 max-w-xl shadow-md sm:rounded-lg">
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
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
          </form>
        </div>
      </ContractCreationLayout>
    );
  },
);

export default Form;
