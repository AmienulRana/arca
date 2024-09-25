import { TableRow } from '@/interface/product.interface';
import { create } from 'zustand';

interface IProductStore {
  tableData: TableRow[];
  // eslint-disable-next-line no-unused-vars
  setTableData: (data: TableRow[]) => void;
}

const useProductStore = create<IProductStore>((set) => ({
  tableData: [] as TableRow[],
  setTableData: (data: TableRow[]) => set({ tableData: data })
}));

export default useProductStore;
