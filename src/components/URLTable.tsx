import { Badge, Box } from "@mui/material";
import { AccessLog, ShortUrl } from "@prisma/client";
import { DataTable, TableColumn } from "./DataTable/DataTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getTimePassed } from "@utils/getPassedTime";
import { BASE_URL } from "src/config";

type ShortUrlAndLogs = ShortUrl & {
  logs: AccessLog[] | null;
};

const columns: TableColumn<ShortUrlAndLogs>[] = [
  {
    header: "Short URL",
    resolve: (e) => (
      <Box
        whiteSpace={"nowrap"}
        textOverflow="ellipsis"
        overflow={"hidden"}
        width={[200, 300, 200, 400]}
      >{`${BASE_URL}${e.shortUrl}`}</Box>
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
        badgeContent={e.logs?.length || 0}
        max={999}
      >
        <VisibilityIcon />
      </Badge>
    ),
  },
];

export interface URLTableProps {
  urls: ShortUrlAndLogs[];
  onClick: (item: ShortUrlAndLogs) => void;
}

export default function URLTable({ urls, onClick }: URLTableProps) {
  return <DataTable data={urls} columns={columns} onClick={onClick} />;
}
