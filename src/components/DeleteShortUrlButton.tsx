import {
  Button,
  darken,
  Box,
  Grow,
  Modal,
  Typography,
  Divider,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import React, { CSSProperties } from "react";

interface DeleteShortUrlButtonProps {
  onDelete: () => void;
  disabled?: boolean;
}

const style: CSSProperties = {
  position: "absolute",
  top: "25%",
  borderRadius: 3,
  left: 0,
  right: 0,
  margin: "0 auto",
  transform: "translate(-50%, -50%)",
  width: "min(50vw, 800px)",
  backgroundColor: "background.paper",
  border: "2px solid #000",
  padding: "40px 20px 15px 20px",
};

export default function DeleteShortUrlButton({
  disabled,
  onDelete,
}: DeleteShortUrlButtonProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={disabled}
        sx={{
          px: 6,
          py: 1,
          backgroundColor: "#f50057",
          fontWeight: "bold",
          color: "white",
          "&:hover": {
            backgroundColor: darken("#f50057", 0.3),
          },
        }}
      >
        <Box display="flex" flexDirection={"row"} alignItems={"center"} gap={2}>
          <WarningAmberIcon />
          <span> Delete Short URL</span>
        </Box>
      </Button>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Grow in={open}>
          <Box sx={style}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                display: "flex",
                itemsCenter: "center",
                gap: 2,
              }}
            >
              <WarningAmberIcon sx={{ color: "#f50057", fontSize: 30 }} />{" "}
              Delete Short URL
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Do you want to delete this short URL and all its logs?
            </Typography>

            <Divider sx={{ mt: 4, mb: 0, opacity: 0.5 }} />

            <Box
              display="flex"
              flexDirection={"row"}
              gap={2}
              mt={4}
              justifyContent={"end"}
            >
              <Button sx={{ color: "white" }} onClick={handleClose}>
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleDelete}
                sx={{
                  color: "white",
                  backgroundColor: "#f50057",
                  "&:hover": {
                    backgroundColor: darken("#f50057", 0.3),
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Grow>
      </Modal>
    </>
  );
}
