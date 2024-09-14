"use client";
import { Get } from "@/axios/AxiosFunctions";
import { BaseURL } from "@/config/apiUrl";
import useDebounce from "@/customHooks/useDebounce";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import classes from "./Dashboard.module.css";
import ReactSelect from "react-select";
import moment from "moment";
import TableStructure from "@/components/Core/TableStructure";

const options = [
  { value: "all", label: "All statuses" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

const Dashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDY0NTc0NTUyNDJmYjYwNjQ5MGY0MCIsImlhdCI6MTcyNjA3NTQ5OCwiZXhwIjoxNzI2MTYxODk4fQ.OJxFgnHU95ZhOVTBPUM3ghBv2xDHSsNJW-MKo91AmkM";

  async function fetchData(
    page = currentPage,
    search = debouncedSearch,
    filter = statusFilter?.value
  ) {
    const url = `faqs?limit=${10}&page=${page}&search=${search}&status=${filter}`;
    setLoading(true);
    const response = await Get(BaseURL(url), accessToken);
    if (response) {
      setFaqs(response?.data?.data?.faqs);
      setTotalPages(response?.data?.data?.totalCount);
    } else {
      setError("Error getting response");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData(1, debouncedSearch, statusFilter?.value);
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <>
      <TableStructure
        isLoading={loading}
        scrollRef={null}
        headerTitle="FAQs"
        isSearch={true}
        filterOptions={options}
        // headerHandlers={{
        //   addNewUser: handleAddNewUser,
        // }}
        tableContent={faqs?.map((ele, index) => ({
          ...ele,
          active: ele?.active ? "yes" : "no",
          category: ele?.category?.name,
          createdAt: moment(ele?.createdAt).format("MMM Do YY"),
          updatedAt: moment(ele?.updatedAt).format("MMM Do YY"),
          sno: index + 1,
        }))}
        tableHeaders={[
          {
            label: "QUESTION",
            value: "question",
            width: "20%",
          },
          {
            label: "ANSWER",
            value: "answer",
            width: "20%",
          },
          {
            label: "CATEGORY",
            value: "category",
            width: "20%",
          },
          {
            label: "ACTIVE",
            value: "active",
          },
          {
            label: "CREATED AT",
            value: "createdAt",
          },
          {
            label: "UPDATED AT",
            value: "updatedAt",
          },
        ]}
        totalRecord={totalPages}
        recordsLimit={10}
        noDataMessage="No FAQs Found"
        customStyle={{}}
        page={currentPage}
        setPage={(e) => {
          setCurrentPage(e);
          fetchData(e, searchTerm, statusFilter?.value);
        }}
        setSearch={(e) => {
          setSearchTerm(e);
        }}
        filter={statusFilter}
        setFilter={(e) => {
          setStatusFilter(e);
          fetchData(currentPage, searchTerm, e?.value);
        }}
        isPagination={true}
      />
    </>
  );
};

export default Dashboard;
