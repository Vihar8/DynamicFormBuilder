import React, { useState, useEffect } from 'react';

const TableSorting = ({ tableData, initialOrderBy, children }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [tablesBody, setTablesBody] = useState(tableData);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    const sortedData = [...tableData].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setTablesBody(sortedData);
  }, [order, orderBy, tableData]);

  return (
    <>
      {children({ order, orderBy, tablesBody, handleSortRequest })}
    </>
  );
};

export default TableSorting;
