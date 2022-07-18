import {
  Badge,
  Divider,
  IconButton,
  Link as MaterialLink,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import DoneIcon from "@mui/icons-material/Done";
import { AccessLog, ShortUrl } from "@prisma/client";
import { BASE_URL } from "src/config";

export interface URLListProps {
  urls: (ShortUrl & {
    logs: AccessLog[];
  })[];
}

export default function URLList({ urls }: URLListProps) {
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {urls.map((item, idx) => (
          <ListItem
            key={idx}
            dense
            disablePadding
            secondaryAction={
              <Badge
                showZero
                color="secondary"
                badgeContent={item.logs.length}
                max={999}
              >
                <DoneIcon />
              </Badge>
            }
          >
            <ListItemButton dense>
              <ListItemIcon>
                <IconButton edge="end" sx={{ m: 0, p: 0 }}>
                  <LinkIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <MaterialLink
                    href={getUrl(item.shortUrl)}
                    target="_blank"
                    rel="noopener"
                  >
                    {getUrl(item.shortUrl)}
                  </MaterialLink>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

function getUrl(url: string): string {
  return `${BASE_URL}/q${url}`;
}
