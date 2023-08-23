import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Episode } from 'rickmortyapi';

export const columns: ColumnDef<Episode>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'air_date',
    header: 'Air Date',
  },
  {
    accessorKey: 'episode',
    header: 'Episode',
  },
  {
    accessorKey: 'created',
    header: 'Created Date',
    cell: ({ row }) => {
      const created: string = row.getValue('created');
      return dayjs(created).format('MMMM DD, YYYY');
    },
  },
];
