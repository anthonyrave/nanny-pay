import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";
import { PropsWithChildren, useRef } from "react";
import { ThemeProvider } from "@/Components/ThemeToggle";
import { SubmitContext } from "@/lib/submit-context";

export default function Create({
  children,
  stepIndex,
  stepCount,
  prevStep,
}: PropsWithChildren & {
  stepIndex: number;
  stepCount: number;
  prevStep?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const formRef = useRef();

  const submit = (): void => {
    console.log("test");
    console.log(formRef);

    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Head title="Créer un nouveau contrat" />

      <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
        <SubmitContext.Provider value={{ formRef }}>
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
              <Button onClick={submit}>Suivant</Button>
            </div>
          </div>
        </SubmitContext.Provider>
      </div>
    </ThemeProvider>
  );
}
