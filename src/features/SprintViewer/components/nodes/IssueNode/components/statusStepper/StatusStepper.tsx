import { Step, StepLabel, Stepper } from "@mui/material";

export const StatusStepper = (props: any) => {
  const { issueStatus } = props;
  const steps = ["Open", "In Dev", "Review", "Merged"];

  const getActiveStep = (status: string) => {
    switch (status) {
      case "open":
        return 0;
      case "development":
        return 1;
      case "review":
        return 2;
      case "merged":
        return 3;
    }
  };

  return (
    <Stepper activeStep={getActiveStep(issueStatus)} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StatusStepper;
