"use client";
import "./pagination.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <div
        style={{
          paddingTop: "1rem",
          position: "relative",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
};

export default PaginationComponent;
