import { Typography } from "@mui/material";

export const IssueModalContent = () => {
  return (
    <>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Issue Title
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Issue Modal...
      </Typography>
    </>
  );
};
export default IssueModalContent;
