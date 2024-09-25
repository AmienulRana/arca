'use client';

import { IProduct } from '@/interface/product.interface';
import { formatMoney } from '@/lib/utils';
import useProductStore from '@/store/products.store';
import { Button, NumberInput, Select, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import products from '../../datas/product.json';

export default function MainPage() {
  const { tableData, setTableData } = useProductStore();

  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>();
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [productId, setProductId] = useState<string | null>(null);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSelectProduct = (productId: number) => {
    const product = products.find((p) => p.id === Number(productId));
    setSelectedProduct(product);
    setQty(1);
    setTotalPrice(product ? product?.product_price : 0);
    setProductId(productId.toString());
  };

  const handleQtyChange = (value: number) => {
    setQty(value);
    if (selectedProduct) {
      setTotalPrice(value * selectedProduct?.product_price);
    }
  };

  const handleAddOrUpdateToTable = () => {
    if (selectedProduct) {
      const newRow = {
        id: selectedProduct.id,
        product_name: selectedProduct.product_name,
        qty,
        total: totalPrice
      };

      if (editingIndex === null) {
        const updatedTable = [...tableData, newRow];
        setTableData(updatedTable);
        setSubtotal(subtotal + totalPrice);
      } else {
        const updatedTable = [...tableData];
        const previousTotal = tableData[editingIndex].total;
        updatedTable[editingIndex] = newRow;
        setTableData(updatedTable);
        setSubtotal(subtotal - previousTotal + totalPrice);
        setEditingIndex(null);
      }

      setSelectedProduct(undefined);
      setQty(1);
      setTotalPrice(0);
      setProductId(null);
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedTable = tableData.filter((_, i) => i !== index);
    const removedPrice = tableData[index].total;
    setTableData(updatedTable);
    setSubtotal(subtotal - removedPrice);
  };

  const handleSave = () => {
    const transactionData = {
      Id: Date.now(),
      report_datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      report_subtotal: subtotal
    };
    const savedData = JSON.parse(localStorage.getItem('transactions') || '[]') || [];
    savedData.push(transactionData);

    localStorage.setItem('transactions', JSON.stringify(savedData));

    // Clear the table
    setTableData([]);
    setSubtotal(0);
  };

  const handleClear = () => {
    setTableData([]);
    setSubtotal(0);
  };

  const handleEditRow = (index: number, id: string) => {
    const row = tableData[index];
    const product = products.find((p) => p.id === row.id);
    setSelectedProduct(product);
    setQty(row.qty);
    setTotalPrice(row.total);
    setEditingIndex(index);
    setProductId(id);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        <Select
          label="Select Product"
          placeholder="Pick one"
          data={products.map((product) => ({
            value: product.id.toString(),
            label: `${product.product_name} - ${formatMoney(product.product_price)}`
          }))}
          onChange={(value) => handleSelectProduct(Number(value))}
          value={productId}
        />
        <NumberInput
          label="Quantity"
          value={qty}
          onChange={(value) => handleQtyChange(Number(value))}
          min={1}
        />

        <Text>
          Total Harga: <span className="text-primary font-semibold">{formatMoney(totalPrice)}</span>
        </Text>
        <Button onClick={handleAddOrUpdateToTable}>
          {editingIndex === null ? 'Add' : 'Update'}
        </Button>
      </div>

      <h2>Order Table</h2>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Product</Table.Th>
            <Table.Th>Qty</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tableData.map((row, index) => (
            <Table.Tr key={index}>
              <Table.Td>{row.product_name}</Table.Td>
              <Table.Td>{row.qty}</Table.Td>
              <Table.Td>{formatMoney(row.total)}</Table.Td>
              <Table.Td>
                <div className="flex w-max gap-5">
                  <Button onClick={() => handleEditRow(index, row?.id?.toString())}>Edit</Button>
                  <Button color="red" onClick={() => handleDeleteRow(index)}>
                    Delete
                  </Button>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <div className="mt-10 flex items-center justify-end gap-5">
        <h3>Subtotal: {formatMoney(subtotal)}</h3>

        <Button onClick={handleClear} color="red">
          Clear
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
