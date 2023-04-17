import useCellsActions from '../../../hooks/useCellsActions';

type AddCellProps = {
  id?: string;
};

const AddCell = ({ id }: AddCellProps) => {
  const { addCell } = useCellsActions();

  return (
    <div
      style={{
        position: 'relative',
        margin: '10px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          className="button is-rounded is-primary is-small"
          style={{
            margin: '0 10px',
          }}
          onClick={() => addCell({ id, type: 'code' })}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          style={{
            margin: '0 10px',
          }}
          onClick={() => addCell({ id, type: 'text' })}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          bottom: '50%',
          right: '0%',
          left: '0%',
          borderBottom: '1px solid gray',
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default AddCell;
