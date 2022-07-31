import { Typography, Grid, Divider, Box } from "@mui/material";
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

export interface UrlAccessLogDetailProps {
  log: AccessLog;
}

export function UrlAccessLogDetail({ log }: UrlAccessLogDetailProps) {
  return (
    <>
      <Detail icon={<AccessTimeIcon />} title="Since">
        <Wrap>
          <Typography>{getTimePassed(log.creationDate).toString()}</Typography>
        </Wrap>
      </Detail>

      <Detail icon={<DateRangeIcon />} title="Date & time">
        <Wrap>
          <Typography>{log.creationDate.toString()}</Typography>
        </Wrap>
      </Detail>

      <Detail icon={<DnsIcon />} title="IP">
        <ToggleHidden>
          <Typography>{log.ipAddress || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      <Detail icon={<PublicIcon />} title="Country">
        <ToggleHidden>
          <Typography>{log.country || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      <Detail icon={<LocationCityIcon />} title="City">
        <ToggleHidden>
          <Typography>{log.city || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      <Detail icon={<SouthAmericaIcon />} title="Region">
        <ToggleHidden>
          <Typography>{log.region || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      <Detail icon={<LanguageIcon />} title="Latitude">
        <ToggleHidden>
          <Typography>{log.latitude || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      <Detail icon={<LanguageIcon />} title="Longitude">
        <ToggleHidden>
          <Typography>{log.longitude || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      <Detail icon={<MobileScreenShareIcon />} title="User Agent">
        <ToggleHidden>
          <Typography>{log.userAgent || "N/A"}</Typography>
        </ToggleHidden>
      </Detail>

      <Grid item xs={12} marginY={1}>
        <Divider />
      </Grid>
    </>
  );
}

function Wrap({ children }: React.PropsWithChildren) {
  return (
    <Box
      width={"100%"}
      display="flex"
      flexDirection={"row"}
      py={"8px"}
      alignItems="center"
    >
      {children}
    </Box>
  );
}
