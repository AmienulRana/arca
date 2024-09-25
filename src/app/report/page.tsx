'use client';

import { IReport } from '@/interface/report.interface';
import { formatMoney } from '@/lib/utils';
import { Button, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function Report() {
  const [tableData, setTableData] = useState<IReport[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load transactions from localStorage
  useEffect(() => {
    const savedTransactions: IReport[] = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTableData(savedTransactions);
    const totalSubtotal = savedTransactions.reduce((acc, item) => acc + item?.report_subtotal, 0);
    setSubtotal(totalSubtotal || 0);
  }, []);

  // Export table to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    XLSX.writeFile(workbook, 'transactions_report.xlsx');
  };
  return (
    <div>
      <h2>Transaction Report</h2>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>No.</Table.Th>
            <Table.Th>Tanggal & Jam</Table.Th>
            <Table.Th>Sub Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>
          {tableData.map((row, index) => (
            <Table.Tr key={index}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{row?.report_datetime}</Table.Td>
              <Table.Td>{formatMoney(row?.report_subtotal)}</Table.Td>
            </Table.Tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-10 flex items-center justify-end gap-5">
        <h3>Subtotal: {formatMoney(subtotal || 0)}</h3>

        <Button onClick={handleExportToExcel}>Export to Excel</Button>
      </div>
    </div>
  );
}
