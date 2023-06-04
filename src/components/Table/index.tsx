import { Box, Typography } from "@mui/material";
import { ButtonsContainer, StyledSearch } from "./styles";
import React, { useEffect, useMemo, useState } from "react";

import { CircularLoader } from "../Monitors";
import { CButton } from "../Buttons";
import { ErrorPage } from "../EmptyPage";
import { TableProps } from "./props";
import TableBody from "./body";
import TablePagination from "./pagination";

const NoData = ({ message }: any) => {
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" textAlign="center" color="grey">
        No data found
      </Typography>
      <Typography variant="body2" textAlign="center" color="grey">
        {message || "We couldn't find any data matching your search"}
      </Typography>
    </Box>
  );
};

const TableContainer = ({ loading, error, rows, message, children }: any) => {
  if (loading) return <CircularLoader />;
  if (error) return <ErrorPage error={error} title="Oops!" />;

  if (rows.length === 0) {
    return <NoData message={message} />;
  }

  return children;
};

export default function Table({
  title,
  loading = false,
  error,
  columns,
  data,
  emptyMessage,
  showSearch,
  onSearch,
  buttons = [],
  onRowClicked,
  rowsPerPageOptions = [10, 20, 30, 40, 50],
  sx = {},
}: TableProps<any>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const [cols, setCols] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    if (columns) {
      setCols(columns);
    }
  }, [columns]);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const handleSearch = (value: string) => {
    if (onSearch) return onSearch(value);

    const filteredRows: any[] = (data || []).filter((row: any) =>
      JSON.stringify(row).toLowerCase().includes(value.toLowerCase())
    );

    if (filteredRows.length > 0) {
      setRows(filteredRows);
    }
  };

  const justifyContent = useMemo(() => {
    if (showSearch && buttons.length > 0) {
      return "space-between";
    }
    if (showSearch && buttons.length === 0) {
      return "end";
    }
    return "start";
  }, [showSearch, buttons]);

  return (
    <Box sx={sx}>
      {title && (
        <Typography variant="h6" sx={{ my: 2 }}>
          {title}
        </Typography>
      )}

      <ButtonsContainer justifyContent={justifyContent}>
        {showSearch && <StyledSearch onSearch={handleSearch} />}
        <Box>
          {buttons.map((button, index) => (
            <CButton key={index} size="small" {...button} />
          ))}
        </Box>
      </ButtonsContainer>

      <TableContainer
        loading={loading}
        error={error}
        rows={rows}
        message={emptyMessage}
      >
        <TableBody
          cols={cols}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          onRowClicked={onRowClicked}
        />

        <TablePagination
          rows={rows}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </TableContainer>
    </Box>
  );
}
