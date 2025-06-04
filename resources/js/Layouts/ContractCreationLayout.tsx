import { Head, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { FormHandle, PageProps } from "@/types";
import { PropsWithChildren, RefObject, useRef } from "react";
import { ThemeProvider } from "@/Components/ThemeToggle";

export default function Create({
  children,
  stepIndex,
  stepCount,
  prevStep,
  formRef,
}: PropsWithChildren & {
  stepIndex: number;
  stepCount: number;
  prevStep?: string;
  formRef?: RefObject<FormHandle>;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const handleSubmit = (): void => {
    console.log("Submitting form...");
    console.log(formRef);
    if (formRef?.current) {
      formRef.current.submit();
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Head title="Créer un nouveau contrat" />

      <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
        <h1 className="text-3xl leading-tight text-foreground">
          Créer un nouveau contrat{" "}
          <span className="text-lg">
            ({stepIndex}/{stepCount})
          </span>
        </h1>

        <div className="mt-6 w-full overflow-hidden bg-card text-card-foreground px-6 py-4 max-w-xl shadow-md sm:rounded-lg">
          {children}
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
            <Button onClick={handleSubmit}>Suivant</Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
