import { forwardRef, useImperativeHandle, useRef } from "react";
import { EmployeeForm } from "../Partials/EmployeeForm";
import { EmployerForm } from "../Partials/EmployerForm";
import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const PartiesStep = forwardRef((props, ref) => {
  const user = usePage<PageProps>().props.auth.user;

  const employerFormRef = useRef();
  const employeeFormRef = useRef();

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

  useImperativeHandle(ref, () => ({
    submit: () => {
      post(route("contract.create.parties"));
    },
  }));

  return (
    <div {...props}>
      <EmployerForm
        ref={employerFormRef}
        data={data}
        setData={setData}
        errors={errors}
        // processing={processing}
        // recentlySuccessful={recentlySuccessful}
      />
      <EmployeeForm
        ref={employeeFormRef}
        data={data}
        setData={setData}
        errors={errors}
        // processing={processing}
        // recentlySuccessful={recentlySuccessful}
        className="mt-8 mb-4"
      />
    </div>
  );
});

export { PartiesStep };
