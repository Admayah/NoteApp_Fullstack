import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

import "./style.css";

const NoteCard = ({ note }) => {
  return (
    <div className="note__card__container" key={note.id}>
      <div className="note__card__header">
        <h2 className="note__card__title">{note.title}</h2>
        <div className="note__card__icons">
          <EditIcon />
          <DeleteIcon />
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
