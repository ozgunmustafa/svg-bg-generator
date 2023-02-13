import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import LayerCard from './components/LayerCard';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { listData } from './data/listData';
import { ShapeIcon, ImageIcon, TextIcon } from './components/partials/Icons';

const LayerList = React.memo(function LayerList({ layers }) {
  return layers.map((item, index) => (
    <LayerCard item={item} index={index} key={index} />
  ));
});

function App() {
  const [canvasAttribute, setCanvasAttribute] = useState({
    canvasWidth: 650,
    canvasHeight: 650,
  });

  const handleCanvasAttribute = (event) => {
    setCanvasAttribute({
      ...canvasAttribute,
      [event.target.name]: event.target.value,
    });
  };
  const defaultList = ['A', 'B', 'C', 'D', 'E'];

  const [itemList, setItemList] = useState(listData);
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
                <button className="canvas-objects-btn col-span-4">
                  <ShapeIcon width="14" height="14" />
                  Shape
                </button>
                <button className="canvas-objects-btn col-span-4">
                  <ImageIcon width="14" height="14" />
                  Image
                </button>
                <button className="canvas-objects-btn col-span-4">
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
              <canvas
                width={canvasAttribute.canvasWidth}
                height={canvasAttribute.canvasHeight}
                style={{ backgroundColor: 'white' }}
              ></canvas>
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
                  <span className="attribute-text">W</span>
                  <input
                    className="attribute-input"
                    name="canvasWidth"
                    type="number"
                    value={canvasAttribute.canvasWidth}
                    onChange={handleCanvasAttribute}
                    min="0"
                    step="1"
                  />
                </label>
                <label className="attribute-input-group col-span-6">
                  <span className="attribute-text">H</span>
                  <input
                    className="attribute-input"
                    name="canvasHeight"
                    type="number"
                    value={canvasAttribute.canvasHeight}
                    onChange={handleCanvasAttribute}
                    min="0"
                    step="1"
                  />
                </label>
                <label className="attribute-input-group col-span-6">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
                <label className="attribute-input-group col-span-6">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
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
