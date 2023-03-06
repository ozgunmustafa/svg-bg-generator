import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import LayerCard from './components/LayerCard';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { listData } from './data/listData';
import { ShapeIcon, ImageIcon, TextIcon } from './components/partials/Icons';

function App() {
  const LayerList = React.memo(function LayerList({ layers }) {
    return layers.map((item, index) => (
      <LayerCard
        item={item}
        index={index}
        key={index}
        isActive={item.id === activeItem.id}
      />
    ));
  });

  const [activeItem, setActiveItem] = useState(listData[0]);

  const [itemList, setItemList] = useState(listData);
  const [artboardAttribute, setArtboardAttribute] = useState({
    artboardWidth: 650,
    artboardHeight: 650,
  });

  const addItemToArtboard = (type) => {
    let lastItem = itemList[itemList.length - 1].id;
    console.log(lastItem);

    setItemList([
      ...itemList,
      {
        id: lastItem.id,
        type: type,
        title: 'Learn Angular in 21 days',
        position: {
          x: 0,
          y: 0,
        },
        size: {
          width: 300,
          height: 300,
        },
      },
    ]);
  };

  const handleArtboardAttribute = (event) => {
    setArtboardAttribute({
      ...artboardAttribute,
      [event.target.name]: event.target.value,
    });
    console.log(artboardAttribute);
  };

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setItemList(updatedList);
  };
  return (
    <div className="App">
      <div className="general-grid">
        <div className="general-grid_left scroll-box">
          <div className="panel">
            <div className="panel_body">
              <div className="row-comp">
                <div className="row-comp_header col-span-12">
                  <div className="row-comp_title">Add New Item:</div>
                </div>
              </div>
              <div className="row-comp canvas-objects-list gap-1">
                <button
                  className="canvas-objects-btn col-span-4"
                  onClick={() => addItemToArtboard('shape')}
                >
                  <ShapeIcon width="14" height="14" />
                  Shape
                </button>
                <button
                  className="canvas-objects-btn col-span-4"
                  onClick={() => addItemToArtboard('image')}
                >
                  <ImageIcon width="14" height="14" />
                  Image
                </button>
                <button
                  className="canvas-objects-btn col-span-4"
                  onClick={() => addItemToArtboard('text')}
                >
                  <TextIcon width="14" height="14" />
                  Text
                </button>
              </div>
            </div>
          </div>

          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <LayerList layers={itemList} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="general-grid_center">
          <div className="canvas-container">
            <div
              className="canvas-wrapper scroll-box"
              style={{ inset: '0 250px 0 0' }}
            >
              <svg
                // viewBox={`0 0 ${artboardAttribute.artboardWidth} ${artboardAttribute.artboardHeight}`}
                id="canvas"
                width={artboardAttribute.artboardWidth}
                height={artboardAttribute.artboardHeight}
                style={{
                  width: artboardAttribute.artboardWidth,
                  height: artboardAttribute.artboardHeight,
                  backgroundColor: 'white',
                }}
              >
                {itemList?.map((item, index) => {
                  console.log('xxx', item);
                  return (
                    <svg
                      className={
                        item.id === activeItem.id && 'artboard-active-item'
                      }
                      viewBox={`0 0 ${item.size.width} ${item.size.height}`}
                      width={item.size.width}
                      height={item.size.height}
                      xmlns="http://www.w3.org/2000/svg"
                      key={index}
                      onClick={() => setActiveItem(item)}
                    >
                      {item.type === 'image' && (
                        <circle
                          cx={item.position.x}
                          cy={item.position.y}
                          r="50"
                          fill="green"
                        />
                      )}
                      {item.type === 'shape' && (
                        <rect
                          x={item.position.x}
                          y={item.position.y}
                          width={item.size.width}
                          height={item.size.height}
                          fill="#EACF44"
                        ></rect>
                      )}
                      {item.type === 'text' && (
                        <text
                          x={item.position.x}
                          y={item.position.y}
                          fontSize="1rem"
                        >
                          My
                        </text>
                      )}
                    </svg>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
        <div className="general-grid_right">
          <div className="panel">
            <div className="panel_body">
              <div className="row-comp gap-2">
                <div className="row-comp_header col-span-12">
                  <div className="row-comp_title">Canvas Size</div>
                </div>
                <label className="attribute-input-group col-span-6">
                  <span className="attribute-text">Width</span>
                  <input
                    className="attribute-input"
                    name="artboardWidth"
                    type="number"
                    value={artboardAttribute.artboardWidth}
                    onChange={handleArtboardAttribute}
                    min="0"
                    step="1"
                  />
                </label>
                <label className="attribute-input-group col-span-6">
                  <span className="attribute-text">Height</span>
                  <input
                    className="attribute-input"
                    name="artboardHeight"
                    type="number"
                    value={artboardAttribute.artboardHeight}
                    onChange={handleArtboardAttribute}
                    min="0"
                    step="1"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
