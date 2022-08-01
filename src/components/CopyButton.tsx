import { IconButton, SxProps, Theme, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

export interface CopyButtonProps {
  onCopy: () => string;
  tooltipDuration?: number;
  sx?: SxProps<Theme>;
}

export function CopyButton({
  sx,
  onCopy,
  tooltipDuration = 1000,
}: CopyButtonProps) {
  const [copiedTooltipOpen, setCopiedTooltipOpen] = useState(false);

  const handleCopyShortenUrl = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const textToCopy = onCopy();

    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedTooltipOpen(true);

      setTimeout(() => {
        setCopiedTooltipOpen(false);
      }, tooltipDuration);
    }
  };

  return (
    <Tooltip title="Copied" open={copiedTooltipOpen} arrow>
      <IconButton
        onClick={handleCopyShortenUrl}
        sx={{
          mr: 1,
          ...sx,
        }}
      >
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
}
