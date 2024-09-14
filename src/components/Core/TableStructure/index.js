"use client";
import { useEffect, useState } from "react";
import { cloneElement, isValidElement } from "react";
import classes from "./TableStructure.module.css";
import NoData from "../NoData/NoData";
import { Loader } from "../Loader";
import PaginationComponent from "../PaginationComponent";
import moment from "moment";
import SearchInput from "../SearchInput";
import { DropDown } from "../DropDown";
import { Button } from "../Button";
import useDebounce from "../../../customHooks/useDebounce";
import { recordsLimit as limit } from "@/data/constants";

const TableStructure = ({
  isLoading,
  scrollRef,
  headerTitle = "Header",
  isSearch,
  filterOptions,
  headerHandlers = {
    addNewUser: () => {},
  },
  tableContent = [
    {
      name: <div>Lorem</div>,
      contact: "+123456789",
      courseName: "lorem",
      courseType: "lorem",
      status: "lorem",
      time: moment("16/01/2024").format("DD MM YYYY"),
    },
  ],
  tableHeaders = [
    { label: "NAME", value: "name", width: "50%" },
    { label: "CONTACT", value: "contact" },
    { label: "COURSE NAME", value: "courseName" },
    { label: "COURSE TYPE", value: "courseType" },
    { label: "STATUS", value: "status" },
    { label: "TIME", value: "time" },
  ],
  totalRecord = 0,
  recordsLimit = limit,
  noDataMessage = "No Users Found",
  customStyle: tableCustomStyle,
  tableMinWidth,
  page,
  setPage,
  setSearch,
  filter,
  setFilter,
  isPagination,
}) => {
  const [searchState, setSearchState] = useState("");
  const convertCamelCaseToNormal = (str) => {
    const camelCase = str.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
    let flat = "";
    camelCase.forEach((word) => {
      flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return flat;
  };
  const debounceSearch = useDebounce(searchState, 500);
  useEffect(() => {
    if (setSearch && isSearch) {
      setSearch(debounceSearch);
    }
  }, [debounceSearch]);
  return (
    <>
      <div className={classes.main}>
        {(headerTitle || isSearch || filterOptions || headerHandlers) && (
          <div className={classes.__header}>
            <span>
              {headerTitle && isValidElement(headerTitle)
                ? cloneElement(headerTitle, {
                    style: { marginInline: "0 auto" },
                  })
                : headerTitle}
            </span>
            {isSearch && (
              <SearchInput
                value={searchState}
                setter={setSearchState}
                customStyle={{
                  minWidth: "220px",
                  border: "none",
                  marginLeft: "10px",
                  borderRadius: "10px",
                  background: "#F6F6F6",
                }}
              />
            )}
            {filterOptions && (
              <DropDown
                value={filter}
                setter={setFilter}
                options={filterOptions}
                placeholder={"Select Filter"}
                customStyle={{
                  marginRight: "20px",
                }}
                customeClassName="filter"
                className={classes.filterDropdown}
              />
            )}
            {headerHandlers &&
              Object.keys(headerHandlers)?.map((e, index) => (
                <Button
                  variant=""
                  onClick={headerHandlers?.[e]}
                  key={index}
                  className={classes.buttonClass}
                  isSimpleHover
                >
                  {convertCamelCaseToNormal(e)}
                </Button>
              ))}
          </div>
        )}
        <div className={classes.scrollWrapper}>
          <div
            ref={scrollRef}
            style={tableCustomStyle}
            className={classes.tableWrapper}
          >
            <table
              className={classes.table}
              style={{ minWidth: `${tableMinWidth}px` }}
            >
              <thead className={classes.tableHeader}>
                <tr className={classes.tableRow}>
                  {Array.isArray(tableHeaders) &&
                    tableHeaders?.map((e, index) => {
                      if (!e) {
                        return;
                      }
                      return (
                        <th
                          className={classes.tableHead}
                          style={{ width: e?.width, ...e?.headerStyle }}
                          key={index}
                        >
                          {e?.label}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={tableHeaders?.length}>
                      <Loader />
                    </td>
                  </tr>
                ) : tableContent.length > 0 ? (
                  tableContent?.map((item, index) => {
                    return (
                      <tr
                        style={
                          index % 2 == 1 ? { "--background": "#F8F8F8" } : {}
                        }
                        key={index}
                        className={classes.tableRow}
                      >
                        {tableHeaders?.map((e, index) => {
                          if (!e) {
                            return;
                          }
                          return (
                            <td
                              className={classes.tableData}
                              style={{ width: e?.width, ...e?.dataStyle }}
                              key={index}
                            >
                              {item?.[e?.value]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={tableHeaders?.length}>
                      <NoData text={noDataMessage} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {tableContent?.length > 0 && isPagination && (
          <div className={classes.Pagination}>
            <PaginationComponent
              totalPages={Math.ceil(totalRecord / recordsLimit)}
              setCurrentPage={setPage}
              currentPage={Number(page)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TableStructure;
