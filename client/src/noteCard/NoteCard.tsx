import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

import "./style.css";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div
      className="note__card__container"
      key={note.id}
      onClick={() => console.log(note)}
    >
      <div className="note__card__header">
        <h2 className="note__card__title">{note.title}</h2>
        <div className="note__card__icons">
          <span onClick={() => onEdit(note)}>
            <EditIcon />
          </span>
          <span onClick={() => onDelete(note)}>
            <DeleteIcon />
          </span>
        </div>
      </div>
      <div className="note__card__body">
        <div className="note__card_content">{note.content}</div>
        <span className="note__card__created">5 days ago</span>
      </div>
    </div>
  );
};

export default NoteCard;
