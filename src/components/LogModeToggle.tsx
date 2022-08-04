import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { AccessLogDetailMode } from "./UrlAccessLogDetail";

export interface LogModeToggleProps {
  mode: AccessLogDetailMode;
  align?: "left" | "right";
  onChange: () => void;
}

export function LogModeToggle({ mode, align, onChange }: LogModeToggleProps) {
  return (
    <FormGroup>
      <FormControlLabel
        label={getLabel(mode)}
        labelPlacement={
          align == null ? undefined : align === "left" ? "end" : "start"
        }
        sx={
          align && {
            marginLeft: align === "right" ? "auto" : undefined,
            marginRight: align === "left" ? "auto" : undefined,
          }
        }
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
      return "Detailed Logs";
    case AccessLogDetailMode.Simple:
      return "Simple Logs";
  }
}
