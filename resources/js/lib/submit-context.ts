import { createContext, RefObject } from "react";

type SubmitContextType = {
  formRef: RefObject<HTMLFormElement> | null;
};

export const SubmitContext = createContext<SubmitContextType>({
  formRef: null,
});
