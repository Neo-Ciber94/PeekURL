import { Typography, Grid, Divider } from "@mui/material";
import { AccessLog } from "@prisma/client";
import { getTimePassed } from "@utils/getPassedTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DnsIcon from "@mui/icons-material/Dns";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import LanguageIcon from "@mui/icons-material/Language";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import { Detail } from "./Detail";

export interface UrlAccessLogDetailProps {
  log: AccessLog;
}

export function UrlAccessLogDetail({ log }: UrlAccessLogDetailProps) {
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
