import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { AccessLogDetailMode } from "./UrlAccessLogDetail";

export interface LogModeToggleProps {
  mode: AccessLogDetailMode;
  onChange: () => void;
}

export function LogModeToggle({ mode, onChange }: LogModeToggleProps) {
  return (
    <FormGroup>
      <FormControlLabel
        label={getLabel(mode)}
        control={
          <Switch
            checked={mode === AccessLogDetailMode.Detailed}
            onChange={onChange}
          />
        }
      />
    </FormGroup>
  );
}

function getLabel(mode: AccessLogDetailMode): string {
  switch (mode) {
    case AccessLogDetailMode.Detailed:
      return "Detailed";
    case AccessLogDetailMode.Simple:
      return "Simple";
  }
}
