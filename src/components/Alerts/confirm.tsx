import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ConfirmModalProps } from "./props";
import Modal from "../Modal";
import { CButton } from "../Buttons";

function ConfirmModal(props: ConfirmModalProps) {
  const {
    data: { open, title, message, sx },
    buttons,
    handleClose,
  } = props;
  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <Box sx={{ width: "100%", p: 3, pt: 0, ...sx }}>
        {message}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {buttons.map((button, index) => (
            <CButton key={index} onClick={button.onClick} color={button.color}>
              {button.text}
            </CButton>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
