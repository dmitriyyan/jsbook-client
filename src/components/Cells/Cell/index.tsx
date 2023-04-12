import ActionBar from '../ActionBar';
import AddCell from '../AddCell';
import CodeCell from '../CodeCell';
import TextCell from '../TextCell';
import { Cell } from '../cellsSlice';

type CellProps = {
  data: Cell;
};

const Cell = ({ data }: CellProps) => {
  const renderCellContent = () => {
    if (data.type === 'text') {
      return <TextCell initialInput={data.content} />;
    }

    return <CodeCell initialInput={data.content} />;
  };

  return (
    <>
      <AddCell id={data.id} />
      <div>
        <ActionBar id={data.id} />
        {renderCellContent()}
      </div>
    </>
  );
};

export default Cell;
