import { Head } from "@inertiajs/react";
import RegistrationLayout from "@/Layouts/RegistrationLayout";
import { MutableRefObject, useRef, useState } from "react";
import { PartiesStep } from "./Steps/PartiesStep";
import { Button } from "@/components/ui/button";

export default function Create() {
  const steps: React.ElementType[] = [PartiesStep];
  const [activeStep, setActiveStep] = useState(0);

  const stepRefs = steps.map((): MutableRefObject<any> => useRef());

  const prevButton = () => {
    if (activeStep !== 0) {
      return (
        <Button onClick={() => setActiveStep((s) => s - 1)}>Retour</Button>
      );
    } else {
      return <span></span>;
    }
  };

  const submitStep = (): void => {
    if (stepRefs[activeStep].current) {
      stepRefs[activeStep].current.submit();
    }

    // setActiveStep((s) => s + 1);
  };

  const submitButton = () => {
    if (activeStep === steps.length - 1) {
      return <Button onClick={submitStep}>Valider</Button>;
    } else {
      /* <Button onClick={() => setActiveStep((s) => s + 1)}>Suivant</Button> */
      return <Button onClick={submitStep}>Suivant</Button>;
    }
  };

  return (
    <RegistrationLayout>
      <Head title="Créer un nouveau contrat" />

      <h1 className="text-3xl leading-tight text-foreground">
        Créer un nouveau contrat{" "}
        <span className="text-lg">
          ({activeStep + 1}/{steps.length})
        </span>
      </h1>

      <div className="mt-6 w-full overflow-hidden bg-card text-card-foreground px-6 py-4 max-w-xl shadow-md sm:rounded-lg">
        {steps.map((Step, index) => {
          if (activeStep === index) {
            return <Step key={index} ref={stepRefs[index]} />;
          }
        })}
      </div>
      <div className="w-full max-w-xl mx-auto mt-6 flex justify-between">
        {prevButton()}
        {submitButton()}
      </div>
    </RegistrationLayout>
  );
}
