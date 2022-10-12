import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Input, Button, Space, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./formtodo.scss";
const { Text, Title } = Typography;

const App = () => {
  const initialState = [
    {
      id: uuidv4(),
      name: "Kim Duyên"
    }
  ];
  const onFinish = (values) => {
    values.id = uuidv4();
    console.log({ ...values });
  };
  return (
    <div className="App">
      <div className="container">
        <div className="wrapper">
          <div className="form">
            <Title level={2}>To do list</Title>
            <Form
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item
                name="text"
                label="Text"
                rules={[
                  {
                    required: true,
                    message: 'Please input your text!',
                  },
                ]}
              >
                <Input size="large" placeholder="enter text..." />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
                    Add
                  </Button>
                </Space>
              </Form.Item>
            </Form>
            <div className="listUser">
              <Text type="success">List User Current</Text>
              {initialState.map((user) => (
                <div className="item" key={user.id}>
                  <div className="name">{user.name}</div>
                  <div className="actions">
                    <Space size="small">
                      <Button type="primary" size="small" shape="circle" icon={<EditOutlined />} />
                      <Button type="primary" danger size="small" shape="circle" icon={<DeleteOutlined />} />
                    </Space>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
