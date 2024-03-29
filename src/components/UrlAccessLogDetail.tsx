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
import { ToggleHidden } from "./ToggleHidden";
import { Wrap } from "./Wrap";
import { useMemo } from "react";

export enum AccessLogDetailMode {
  Simple = "simple",
  Detailed = "detailed",
}

export interface UrlAccessLogDetailProps {
  log: AccessLog;
  mode: AccessLogDetailMode;
}

export function UrlAccessLogDetail({ log, mode }: UrlAccessLogDetailProps) {
  const isDetailed = useMemo(
    () => mode === AccessLogDetailMode.Detailed,
    [mode]
  );

  return (
    <>
      <Detail icon={<AccessTimeIcon />} title="Since">
        <Wrap>
          <Typography>{getTimePassed(log.creationDate).toString()}</Typography>
        </Wrap>
      </Detail>

      <Detail icon={<DateRangeIcon />} title="Date & time">
        <Wrap>
          <Typography>{log.creationDate.toLocaleString()}</Typography>
        </Wrap>
      </Detail>

      {isDetailed && (
        <Detail icon={<DnsIcon />} title="IP">
          <ToggleHidden>
            <Typography>{log.ipAddress || "N/A"}</Typography>
          </ToggleHidden>
        </Detail>
      )}

      <Detail icon={<PublicIcon />} title="Country">
        <ToggleHidden>
          <Typography>{log.country || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      {isDetailed && (
        <Detail icon={<LocationCityIcon />} title="City">
          <ToggleHidden>
            <Typography>{log.city || "N/A"}</Typography>
          </ToggleHidden>
        </Detail>
      )}

      {isDetailed && (
        <Detail icon={<SouthAmericaIcon />} title="Region">
          <ToggleHidden>
            <Typography>{log.region || "N/A"}</Typography>
          </ToggleHidden>
        </Detail>
      )}

      {isDetailed && (
        <Detail icon={<LanguageIcon />} title="Latitude">
          <ToggleHidden>
            <Typography>{log.latitude || "N/A"}</Typography>
          </ToggleHidden>
        </Detail>
      )}

      {isDetailed && (
        <Detail icon={<LanguageIcon />} title="Longitude">
          <ToggleHidden>
            <Typography>{log.longitude || "N/A"}</Typography>
          </ToggleHidden>
        </Detail>
      )}

      {isDetailed && (
        <Detail icon={<MobileScreenShareIcon />} title="User Agent">
          <ToggleHidden>
            <Typography>{log.userAgent || "N/A"}</Typography>
          </ToggleHidden>
        </Detail>
      )}

      <Grid item xs={12} marginY={1}>
        <Divider />
      </Grid>
    </>
  );
}
