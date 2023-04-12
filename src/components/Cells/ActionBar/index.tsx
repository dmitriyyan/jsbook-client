import { useCellsActions } from '../cellsSlice';

type ActionBarProps = {
  id: string;
};

const ActionBar = ({ id }: ActionBarProps) => {
  const { deleteCell, moveCell } = useCellsActions();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'center',
        height: 30,
        backgroundColor: '#37414b',
      }}
    >
      <div>
        <button
          className="button is-primary is-small"
          onClick={() => moveCell({ id, direction: 'up' })}
          title="Up"
        >
          <span>
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => moveCell({ id, direction: 'down' })}
          title="Down"
        >
          <span>
            <i className="fas fa-arrow-down"></i>
          </span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => deleteCell({ id })}
          title="Delete"
        >
          <span>
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
