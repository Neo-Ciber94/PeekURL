import { Link as MaterialLink, Typography, Grid, Divider } from "@mui/material";
import { AccessLog } from "@prisma/client";
import LinkIcon from "@mui/icons-material/Link";
import { getTimePassed } from "@utils/getPassedTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import DnsIcon from "@mui/icons-material/Dns";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import LanguageIcon from "@mui/icons-material/Language";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import { ShortUrlWithLogs } from "src/types/shorturl";
import { getDirectUrl } from "@utils/getRedirectUrl";
import { Detail } from "./Detail";

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

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" marginBottom={2}>
        Logs
      </Typography>

      <Grid container spacing={1}>
        {data.logs!.map((log) => (
          <UrlAccessLogDetail key={log.id} log={log} />
        ))}
      </Grid>
    </>
  );
}

interface UrlAccessLogDetailProps {
  log: AccessLog;
}

function UrlAccessLogDetail({ log }: UrlAccessLogDetailProps) {
  return (
    <>
      <Detail icon={<DnsIcon />} title="IP">
        <Typography>{log.ipAddress || "N/A"}</Typography>
      </Detail>

      <Detail icon={<AccessTimeIcon />} title="Since">
        <Typography>{getTimePassed(log.creationDate).toString()}</Typography>
      </Detail>

      <Detail icon={<DateRangeIcon />} title="Date & time">
        <Typography>{log.creationDate.toString()}</Typography>
      </Detail>

      <Detail icon={<PublicIcon />} title="Country">
        <Typography>{log.country || "N/A"}</Typography>
      </Detail>

      <Detail icon={<LocationCityIcon />} title="City">
        <Typography>{log.city || "N/A"}</Typography>
      </Detail>

      <Detail icon={<SouthAmericaIcon />} title="Region">
        <Typography>{log.region || "N/A"}</Typography>
      </Detail>

      <Detail icon={<LanguageIcon />} title="Latitude">
        <Typography>{log.latitude || "N/A"}</Typography>
      </Detail>

      <Detail icon={<LanguageIcon />} title="Longitude">
        <Typography>{log.longitude || "N/A"}</Typography>
      </Detail>

      <Detail icon={<MobileScreenShareIcon />} title="User Agent">
        <Typography>{log.userAgent || "N/A"}</Typography>
      </Detail>

      <Grid item xs={12} marginY={1}>
        <Divider />
      </Grid>
    </>
  );
}
