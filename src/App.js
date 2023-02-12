import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import LayerCard from './components/LayerCard';
import { listData } from './data/listData';

const LayerList = React.memo(function LayerList({ layers }) {
  return layers.map((item, index) => (
    <LayerCard item={item} index={index} key={index} />
  ));
});

function App() {
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
        <div className="general-grid_left">
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
        <div className="general-grid_center"></div>
        <div className="general-grid_right">
          <div className="panel">
            <div className="panel_body">
              <div className="attribute-grid">
                <div className="attribute-grid_header grid-col-span-2">
                  <div className="attribute-grid_title">Canvas Size</div>
                </div>
                <label className="attribute-input-group">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
                <label className="attribute-input-group">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
                <label className="attribute-input-group">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
                <label className="attribute-input-group">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="panel_body">
              <div className="attribute-grid">
                <div className="attribute-grid_header grid-col-span-2">
                  <div className="attribute-grid_title">Canvas Size</div>
                </div>
                <label className="attribute-input-group">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
                <label className="attribute-input-group">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
                <label className="attribute-input-group">
                  <span className="attribute-text">X</span>
                  <input className="attribute-input" type="text" value="3500" />
                </label>
                <label className="attribute-input-group">
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
