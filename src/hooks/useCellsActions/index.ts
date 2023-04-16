import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../app/hooks';
import { cellsActions } from '../../components/Cells/cellsSlice';

const useCellsActions = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(() => {
    return bindActionCreators(cellsActions, dispatch);
  }, [dispatch]);

  return actions;
};

export default useCellsActions;
