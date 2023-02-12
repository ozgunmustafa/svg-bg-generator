import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const LayerCard = ({ item, index }) => {
  const RenderIcon = () => {
    if (item.type === 'shape')
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.1254 7.89819L17.5004 8.12507L18.2429 9.02258L18.1254 17.3126L17.1535 18.0151L8.89848 18.1251L8.12535 16.8751L7.84473 13.1251C7.84473 13.1251 13.4179 11.4219 13.1254 7.89819Z"
            fill="#D3D3D3"
            fillOpacity="0.75"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 13.75C4.05062 13.75 1.25 10.9494 1.25 7.5C1.25 4.05062 4.05062 1.25 7.5 1.25C10.9488 1.25 13.7487 4.04938 13.75 7.4975H16.8775C17.3748 7.4975 17.8517 7.69504 18.2033 8.04667C18.555 8.39831 18.7525 8.87522 18.7525 9.3725V16.875C18.7525 17.3723 18.555 17.8492 18.2033 18.2008C17.8517 18.5525 17.3748 18.75 16.8775 18.75H9.375C8.87772 18.75 8.4008 18.5525 8.04917 18.2008C7.69754 17.8492 7.5 17.3723 7.5 16.875V13.75ZM13.625 8.7475C13.379 9.9484 12.7859 11.0507 11.9193 11.9177C11.0528 12.7847 9.95077 13.3784 8.75 13.625V16.875C8.75 17.0408 8.81585 17.1997 8.93306 17.3169C9.05027 17.4342 9.20924 17.5 9.375 17.5H16.8775C17.0433 17.5 17.2022 17.4342 17.3194 17.3169C17.4367 17.1997 17.5025 17.0408 17.5025 16.875V9.3725C17.5025 9.20674 17.4367 9.04777 17.3194 8.93056C17.2022 8.81335 17.0433 8.7475 16.8775 8.7475H13.625ZM7.5 2.5C10.2594 2.5 12.5 4.74063 12.5 7.5C12.5 10.2594 10.2594 12.5 7.5 12.5C4.74063 12.5 2.5 10.2594 2.5 7.5C2.5 4.74063 4.74063 2.5 7.5 2.5Z"
            fill="black"
          />
        </svg>
      );
    if (item.type === 'image')
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_911_153)">
            <path
              d="M15.8333 4.16667V15.8333H4.16667V4.16667H15.8333ZM15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM11.7833 9.88333L9.28333 13.1083L7.5 10.95L5 14.1667H15L11.7833 9.88333Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_911_153">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    if (item.type === 'text')
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 3H4.16667C3.85725 3 3.5605 3.12292 3.34171 3.34171C3.12292 3.5605 3 3.85725 3 4.16667C3 4.47609 3.12292 4.77283 3.34171 4.99162C3.5605 5.21042 3.85725 5.33333 4.16667 5.33333H8.83333V15.8333C8.83333 16.1428 8.95625 16.4395 9.17504 16.6583C9.39383 16.8771 9.69058 17 10 17C10.3094 17 10.6062 16.8771 10.825 16.6583C11.0437 16.4395 11.1667 16.1428 11.1667 15.8333V5.33333H15.8333C16.1428 5.33333 16.4395 5.21042 16.6583 4.99162C16.8771 4.77283 17 4.47609 17 4.16667C17 3.85725 16.8771 3.5605 16.6583 3.34171C16.4395 3.12292 16.1428 3 15.8333 3Z"
            fill="black"
          />
        </svg>
      );
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    borderTop: isDragging && '1px solid lightgreen',
    ...draggableStyle,
  });
  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  }

  return (
    <>
      <Draggable draggableId={item.id} key={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`layer-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <span className="layer-card_icon">
              <RenderIcon />
            </span>
            <span className="layer-card_text">{item.type}</span>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default LayerCard;
