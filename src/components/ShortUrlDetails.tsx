import { Link as MaterialLink, Typography, Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { getTimePassed } from "@utils/getPassedTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { ShortUrlWithLogs } from "src/types/shorturl";
import { getRedirectUrl } from "@utils/getRedirectUrl";
import { Detail } from "./Detail";
import { UrlAccessLogDetail } from "./UrlAccessLogDetail";
import { AccessLog } from "@prisma/client";
import { Wrap } from "./Wrap";
import { CopyButton } from "./CopyButton";

export interface ShortUrlProps {
  data: ShortUrlWithLogs;
}

export function ShortUrlDetails({ data }: ShortUrlProps) {
  return (
    <>
      <Grid container spacing={1} paddingTop={2}>
        {/* Short URL */}
        <Detail icon={<LinkIcon />} title="Short URL">
          <Wrap>
            <MaterialLink
              href={getRedirectUrl(data.shortUrl)}
              target="_blank"
              rel="noopener"
            >
              {getRedirectUrl(data.shortUrl)}
            </MaterialLink>
            <CopyButton
              onCopy={() => getRedirectUrl(data.shortUrl)}
              sx={{
                marginLeft: "auto",
                opacity: 0.4,
              }}
            />
          </Wrap>
        </Detail>

        {/* Original URL */}
        <Detail icon={<LinkIcon />} title="Original URL">
          <Wrap>
            <MaterialLink
              href={data.originalUrl}
              target="_blank"
              rel="noopener"
            >
              {data.originalUrl}
            </MaterialLink>
            <CopyButton
              onCopy={() => data.originalUrl}
              sx={{
                marginLeft: "auto",
                opacity: 0.4,
              }}
            />
          </Wrap>
        </Detail>

        {/* Last Access */}
        <Detail icon={<AccessTimeIcon />} title="Last Access">
          <Wrap py={2}>
            <Typography>
              {getTimePassed(data.creationDate).toString()}
            </Typography>
          </Wrap>
        </Detail>

        {/* Access */}
        <Detail icon={<VisibilityIcon />} title="Access">
          <Wrap py={2}>
            <Typography>{data.logs?.length || 0}</Typography>
          </Wrap>
        </Detail>

        {/* Active */}
        <Detail icon={<ToggleOffIcon />} title="Active">
          <Wrap py={2}>
            <Typography>{data.active ? "Yes" : "No"}</Typography>
          </Wrap>
        </Detail>
      </Grid>
    </>
  );
}

export interface ShortUrlLogDetailsProps {
  logs: AccessLog[];
}

export function ShortUrlLogDetails({ logs }: ShortUrlLogDetailsProps) {
  return (
    <>
      <Grid container spacing={1} paddingTop={2}>
        <Grid container spacing={1}>
          {logs.map((log) => (
            <UrlAccessLogDetail key={log.id} log={log} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}
