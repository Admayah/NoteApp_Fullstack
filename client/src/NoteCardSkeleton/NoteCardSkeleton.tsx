import "./style.css";

const NoteCardSkeleton = () => {
  return (
    <>
      <div className="skeleton-loader-container">
        <div className="skeleton-loader-header">
          <div className="skeleton-loader-title"></div>
          <div className="skeleton-loader-icons"></div>
        </div>
        <div className="skeleton-loader-body">
          <div className="skeleton-loader-content"></div>
          <div className="skeleton-loader-created"></div>
        </div>
      </div>
      <div className="skeleton-loader-container">
        <div className="skeleton-loader-header">
          <div className="skeleton-loader-title"></div>
          <div className="skeleton-loader-icons"></div>
        </div>
        <div className="skeleton-loader-body">
          <div className="skeleton-loader-content"></div>
          <div className="skeleton-loader-created"></div>
        </div>
      </div>
      <div className="skeleton-loader-container">
        <div className="skeleton-loader-header">
          <div className="skeleton-loader-title"></div>
          <div className="skeleton-loader-icons"></div>
        </div>
        <div className="skeleton-loader-body">
          <div className="skeleton-loader-content"></div>
          <div className="skeleton-loader-created"></div>
        </div>
      </div>
    </>
  );
};

export default NoteCardSkeleton;
