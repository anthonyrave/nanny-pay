import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const ContractStartAndPlaceStep = forwardRef((props, ref) => {
  const pageProps = usePage<PageProps>().props;
  const user = pageProps.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      firstname: user.firstname,
    });

  useImperativeHandle(ref, () => ({
    submit: () => {
      post(route("contract.create.start-and-place"));
    },
  }));

  return <div {...props}></div>;
});

export { ContractStartAndPlaceStep };
