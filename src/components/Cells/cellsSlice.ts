import {
  PayloadAction,
  createSlice,
  createEntityAdapter,
  EntityId,
} from '@reduxjs/toolkit';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../app/hooks';

export type CellTypes = 'code' | 'text';
export type Direction = 'up' | 'down';
export type Cell = {
  id: string;
  type: CellTypes;
  content: string;
  order: number;
};

const cellsAdapter = createEntityAdapter<Cell>({
  sortComparer: (a, b) => a.order - b.order,
});

const initialState = cellsAdapter.getInitialState();
export const {
  selectById: selectCellById,
  selectTotal: selectTotalCells,
  selectIds: selectCellsIds,
  selectAll: selectCells,
} = cellsAdapter.getSelectors();

export const cellSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    addInitialCells: cellsAdapter.addMany,
    addCell: (
      state,
      action: PayloadAction<{ id: string | undefined; type: CellTypes }>
    ) => {
      const { id, type } = action.payload;
      if (!id) {
        const total = selectTotalCells(state);
        cellsAdapter.addOne(state, {
          id: crypto.randomUUID(),
          type,
          content: '',
          order: total === 0 ? total : total - 1,
        });
      } else {
        const cell = selectCellById(state, id);
        if (cell) {
          const cellsToUpdate = selectCells(state).slice(cell.order);

          cellsAdapter.addOne(state, {
            id: crypto.randomUUID(),
            type,
            content: '',
            order: cell.order,
          });

          const updates = cellsToUpdate.map((cell) => ({
            id: cell.id,
            changes: { order: cell.order + 1 },
          }));
          cellsAdapter.updateMany(state, updates);
        }
      }
    },
    updateCell: cellsAdapter.updateOne,
    deleteCell: (state, action: PayloadAction<{ id: EntityId }>) => {
      const { id } = action.payload;
      const cell = selectCellById(state, id);
      if (cell) {
        const cellsToUpdate = selectCells(state).slice(cell.order + 1);

        cellsAdapter.removeOne(state, id);

        const updates = cellsToUpdate.map((cell) => ({
          id: cell.id,
          changes: { order: cell.order - 1 },
        }));
        cellsAdapter.updateMany(state, updates);
      }
    },
    moveCell: (
      state,
      action: PayloadAction<{ id: string; direction: Direction }>
    ) => {
      const { id, direction } = action.payload;
      const cell = selectCellById(state, id);

      if (cell) {
        const targetIndex =
          direction === 'up' ? cell.order - 1 : cell.order + 1;

        if (targetIndex >= 0 && targetIndex < selectTotalCells(state)) {
          const ids = selectCellsIds(state);
          cellsAdapter.updateMany(state, [
            {
              id,
              changes: { order: targetIndex },
            },
            {
              id:
                direction === 'up' ? ids[cell.order - 1] : ids[cell.order + 1],
              changes: { order: cell.order },
            },
          ]);
        }
      }
    },
  },
});

export const cellsActions = { ...cellSlice.actions };

export const useCellsActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(cellsActions, dispatch);
};

export default cellSlice.reducer;
