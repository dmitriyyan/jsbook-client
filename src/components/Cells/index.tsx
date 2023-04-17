import { useAppSelector } from '../../app/hooks';
import AddCell from './AddCell';
import Cell from './Cell';
import { selectCells } from './cellsSlice';

const Cells = () => {
  const cells = useAppSelector((state) => selectCells(state.cells));

  return (
    <div
      className="cell-list"
      style={{
        margin: '0 25px 50vh',
      }}
    >
      {cells.map((cell) => (
        <Cell data={cell} key={cell.id} />
      ))}
      <AddCell />
    </div>
  );
};

export default Cells;
