import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ShapeIcon, ImageIcon, TextIcon } from './partials/Icons';

const LayerCard = ({ item, index }) => {


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
              {item.type === 'shape' ? (
                <ShapeIcon width="16" height="16" />
              ) : item.type === 'image' ? (
                <ImageIcon width="16" height="16" />
              ) : (
                item.type === 'text' && <TextIcon width="16" height="16" />
              )}
            </span>
            <span className="layer-card_text">{item.type}</span>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default LayerCard;
