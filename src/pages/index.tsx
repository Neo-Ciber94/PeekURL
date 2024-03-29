import {
  Box,
  Button,
  Grid,
  Link as MaterialLink,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import URLShortener from "../components/URLShortener";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PageCard from "src/components/PageCard";
import AppHead from "src/components/AppHead";
import { getRedirectUrl } from "@utils/getRedirectUrl";

export default function IndexPage() {
  const [shortURL, setShortURL] = useState<string | null>(null);
  const [copiedTooltipOpen, setCopiedTooltipOpen] = useState(false);

  const handleChangeURL = (s: string) => {
    setShortURL(getRedirectUrl(s));
  };

  const handleCopyUrl = async () => {
    if (shortURL) {
      await navigator.clipboard.writeText(shortURL);
      setCopiedTooltipOpen(true);

      setTimeout(() => {
        setCopiedTooltipOpen(false);
      }, 2000);
    }
  };
  

  return (
    <>
      <AppHead name="Shorten URL" />
      <PageCard height={300} px={[3, 5, 5]} mt={10}>
        <Typography variant="h5" mb={1}>
          Shorten an URL
        </Typography>
        <Box display="flex" justifyContent={"center"} alignItems="center">
          <URLShortener onChange={handleChangeURL}>
            {shortURL && (
              <>
                <Grid item xs={12} sm={9}>
                  <Box
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    <MaterialLink
                      variant="h6"
                      href={shortURL}
                      target="_blank"
                      rel="noopener"
                    >
                      {shortURL}
                    </MaterialLink>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Tooltip title="Copied" open={copiedTooltipOpen} arrow>
                    <Button
                      sx={{
                        width: "100%",
                      }}
                      color="secondary"
                      onClick={handleCopyUrl}
                    >
                      <ContentCopyIcon />
                      <Typography>Copy</Typography>
                    </Button>
                  </Tooltip>
                </Grid>
              </>
            )}
          </URLShortener>
        </Box>
      </PageCard>
    </>
  );
}
