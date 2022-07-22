import { Badge, Box } from "@mui/material";
import { DataTable, TableColumn } from "./DataTable/DataTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getTimePassed } from "@utils/getPassedTime";
import { BASE_URL } from "src/config";
import { ShortUrlWithLogs } from "src/types/shorturl";

const columns: TableColumn<ShortUrlWithLogs>[] = [
  {
    header: "Short URL",
    resolve: (e) => (
      <Box
        whiteSpace={"nowrap"}
        textOverflow="ellipsis"
        overflow={"hidden"}
        width={[200, 300, 200, 400]}
      >{`${BASE_URL}q${e.shortUrl}`}</Box>
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
];

export interface URLTableProps {
  urls: ShortUrlWithLogs[];
  onClick: (item: ShortUrlWithLogs) => void;
}

export default function URLTable({ urls, onClick }: URLTableProps) {
  return <DataTable data={urls} columns={columns} onClick={onClick} />;
}
