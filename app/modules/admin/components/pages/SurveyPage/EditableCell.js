import React from 'react';
import { Input, Select, Form } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const { Option } = Select;

export const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'select') {
      return (
        <Select defaultValue="Admin">
          <Option value="Admin">
            <FormattedMessage {...messages.admin} />
          </Option>
          <Option value="User">
            <FormattedMessage {...messages.user} />
          </Option>
        </Select>
      );
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;

    const { formatMessage } = this.props.intl;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${formatMessage(
                          messages.rulesMsg,
                        )} ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

EditableCell.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(EditableCell);
