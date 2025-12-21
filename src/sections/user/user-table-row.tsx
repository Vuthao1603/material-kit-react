import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  gender: string;
  yearold: number;
  goal: string;
  height: number;
  weight: number;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelectRow} />
      </TableCell>

      {/* Name */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>{row.name?.charAt(0).toUpperCase()}</Avatar>
          {row.name}
        </Box>
      </TableCell>

      {/* Gender */}
      <TableCell>{row.gender}</TableCell>

      {/* Age */}
      <TableCell>{row.yearold}</TableCell>

      {/* Goal */}
      <TableCell>{row.goal}</TableCell>

      {/* Body */}
      <TableCell>
        {row.height} cm / {row.weight} kg
      </TableCell>

      {/* Action */}
      <TableCell align="right">
        <IconButton onClick={(e) => setOpenPopover(e.currentTarget)}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
