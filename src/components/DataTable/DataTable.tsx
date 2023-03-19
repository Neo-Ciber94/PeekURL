import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React from "react";
import { useIsDarkMode } from "src/client/contexts/ColorModeContext";

export interface TableColumn<T> {
  header: string;
  resolve: (value: T, index: number) => string | number | React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onClick?: (value: T, index: number) => void;
}

export function DataTable<T>({ columns, data, onClick }: DataTableProps<T>) {
  return (
    <TableContainer>
      <Table>
        <DataTableHeader columns={columns} />
        <TableBody>
          <DataTableItems columns={columns} data={data} onClick={onClick} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

type DataTableHeaderProps<T> = Readonly<Pick<DataTableProps<T>, "columns">>;

function DataTableHeader<T>({ columns }: DataTableHeaderProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col, idx) => (
          <TableCell
            key={idx}
            sx={{
              fontWeight: "bold",
            }}
          >
            {col.header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

type DatTableItemProps<T> = Readonly<
  Pick<DataTableProps<T>, "columns" | "data" | "onClick">
>;

function DataTableItems<T>({ columns, data, onClick }: DatTableItemProps<T>) {
  const isDarkMode = useIsDarkMode();
  const theme = useTheme();

  const handleElementClick = (item: T, colIndex: number) => {
    if (onClick) {
      onClick(item, colIndex);
    }
  };

  return (
    <>
      {data.map((item, colIndex) => (
        <TableRow
          key={colIndex}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          {columns.map((col, idx) => (
            <TableCell
              key={idx}
              onClick={() => handleElementClick(item, colIndex)}
            >
              {col.resolve(item, colIndex)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
