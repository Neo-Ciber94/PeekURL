import { Link as MaterialLink, Typography, Grid, Divider } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { getTimePassed } from "@utils/getPassedTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { ShortUrlWithLogs } from "src/types/shorturl";
import { getDirectUrl } from "@utils/getRedirectUrl";
import { Detail } from "./Detail";
import { UrlAccessLogDetail } from "./UrlAccessLogDetail";
import { AccessLog } from "@prisma/client";

export interface ShortUrlProps {
  data: ShortUrlWithLogs;
}

export function ShortUrlDetails({ data }: ShortUrlProps) {
  return (
    <>
      <Grid container spacing={1} paddingTop={2}>
        {/* Short URL */}
        <Detail icon={<LinkIcon />} title="Short URL">
          <MaterialLink
            href={getDirectUrl(data.shortUrl)}
            target="_blank"
            rel="noopener"
          >
            {getDirectUrl(data.shortUrl)}
          </MaterialLink>
        </Detail>

        {/* Original URL */}
        <Detail icon={<LinkIcon />} title="Original URL">
          <MaterialLink href={data.originalUrl} target="_blank" rel="noopener">
            {data.originalUrl}
          </MaterialLink>
        </Detail>

        {/* Last Access */}
        <Detail icon={<AccessTimeIcon />} title="Last Access">
          <Typography>{getTimePassed(data.creationDate).toString()}</Typography>
        </Detail>

        {/* Access */}
        <Detail icon={<VisibilityIcon />} title="Access">
          <Typography>{data.logs?.length || 0}</Typography>
        </Detail>

        {/* Active */}
        <Detail icon={<ToggleOffIcon />} title="Active">
          <Typography>{data.active ? "Yes" : "No"}</Typography>
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
      <Typography variant="h5" marginBottom={2}>
        Logs
      </Typography>
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
