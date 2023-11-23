import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useGetSprintQuery } from "../../app/store/services/sprint";
import Modal from "../../components/Modal";
import Navigation from "../../components/Navigation";
import IssueModalContent from "./components/IssueModal";
import SprintFlow from "./components/SprintFlow";
import UpdateModalContent from "./components/UpdateModal";

export const SprintViewer = () => {
  const [issueModalIsOpen, setIssueModalIsOpen] = useState<boolean>(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState<boolean>(false);

  const sprintId = 391;
  const { isSuccess } = useGetSprintQuery(sprintId);

  return (
    <>
      <Navigation>
        {isSuccess ? (
          <SprintFlow
            setIssueModalIsOpen={setIssueModalIsOpen}
            setUpdateModalIsOpen={setUpdateModalIsOpen}
            sprintId={sprintId}
          />
        ) : null}
      </Navigation>
      <Modal open={updateModalIsOpen} setIsOpen={setUpdateModalIsOpen}>
        <UpdateModalContent />
      </Modal>
      <Modal open={issueModalIsOpen} setIsOpen={setIssueModalIsOpen}>
        <IssueModalContent />
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isSuccess}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default SprintViewer;
