import { Badge, Box } from "@mui/material";
import { DataTable, TableColumn } from "./DataTable/DataTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getTimePassed } from "@utils/getPassedTime";
import { ShortUrlWithLogs } from "src/types/shorturl";
import { getRedirectUrl } from "@utils/getRedirectUrl";
import { useMemo } from "react";
import { CopyButton } from "./CopyButton";

export interface URLTableProps {
  urls: ShortUrlWithLogs[];
  onClick: (item: ShortUrlWithLogs) => void;
}

export default function URLTable({ urls, onClick }: URLTableProps) {
  const columns: TableColumn<ShortUrlWithLogs>[] = useMemo(
    () => [
      {
        header: "Short URL",
        resolve: (e) => (
          <Box
            whiteSpace={"nowrap"}
            textOverflow="ellipsis"
            overflow={"hidden"}
            display="flex"
            flexDirection="row"
            alignItems="center"
            width={[200, 300, 200, 400]}
          >
            <CopyButton onCopy={() => getRedirectUrl(e.shortUrl)} />
            <Box>{getRedirectUrl(e.shortUrl)}</Box>
          </Box>
        ),
      },
      {
        header: "Domain",
        resolve: (e) => {
          try {
            const url = new URL(e.originalUrl);
            return url.hostname.replace("www.", "");
          } catch {
            return "";
          }
        },
      },
      {
        header: "Last Access",
        resolve: (e) => getTimePassed(e.creationDate).toString(),
      },
      {
        header: "Access",
        resolve: (e) => (
          <Badge
            showZero
            color="secondary"
            badgeContent={e._count?.logs || 0}
            max={999}
          >
            <VisibilityIcon />
          </Badge>
        ),
      },
    ],
    []
  );

  return <DataTable data={urls} columns={columns} onClick={onClick} />;
}
