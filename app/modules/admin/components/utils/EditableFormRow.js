import { Form } from 'antd';
import React from 'react';
import { EditableContext } from './EditableCell';

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export default Form.create()(EditableRow);
