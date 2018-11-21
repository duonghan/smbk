import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Icon } from 'antd';

class ToolBoxItem extends React.Component {
  render() {
    const { isDragging, connectDragSource, item } = this.props;

    return connectDragSource(
      <div
        style={{
          padding: '10px 20px',
          border: '1px solid grey',
          margin: '10px 10px 10px 10px',
          borderRadius: 5,
          textAlign: 'left',
        }}
      >
        <Icon type={this.props.item.icon} style={{ marginRight: 10 }} />
        <span>{this.props.item.name}</span>
      </div>,
    );
  }
}

const itemSource = {
  beginDrag(props) {
    console.log('dragging');
    return props.item;
  },
  endDrag(props, monitor, component) {
    return props.handleDrop(props.item);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

ToolBoxItem.propTypes = {
  name: PropTypes.string,
};

export default DragSource('toolboxItem', itemSource, collect)(ToolBoxItem);
