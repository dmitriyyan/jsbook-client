import { useAppSelector } from '../../app/hooks';
import AddCell from './AddCell';
import Cell from './Cell';
import { selectCells } from './cellsSlice';

const Cells = () => {
  const cells = useAppSelector((state) => selectCells(state.cells));

  return (
    <>
      {cells.map((cell) => (
        <Cell data={cell} key={cell.id} />
      ))}
      <AddCell />
    </>
  );
};

export default Cells;
