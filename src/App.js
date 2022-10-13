import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Input, Button, Space, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./formtodo.scss";
import ModalEdit from './component/ModalEdit';
const { Text, Title } = Typography;

const initialState = [
  {
    id: uuidv4(),
    name: "Kim Duyên"
  }
];
const App = () => {
  const [form] = Form.useForm();
  const [listUser, setListUser] = useState(initialState);
  const [text, setText] = useState("");
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [toggleSummit, setToggleSubmit] = useState(true);
  const [dataUser, setDataUser] = useState({});

  const onFinish = (values) => {
    values.id = uuidv4();
    values.name = values.text;
    delete values.text;
    setListUser((current) => [...current, values]);
  };
  const handleDeleteItem = (user) => {
    setListUser((prev) => prev.filter((data) => data.id !== user.id))
  }
  const handleEditItem = (user) => {
    setOpenModalEdit(true);
    setDataUser(user);
    setText(user.name);
    setToggleSubmit(false);
  }
  const onCreate = (newName) => {
    // console.log('Received values of form: ', newName);
    if (newName && !toggleSummit) {
      setListUser(
        listUser.map((item) => {
          if (item.id === dataUser.id) {
            return {
              ...item,
              name: newName
            };
          }
          return item;
        })
      );
      setToggleSubmit(true);
    }
  };
  return (
    <div className="App">
      <div className="container">
        <div className="wrapper">
          <div className="form">
            <Title level={2}>To do list</Title>
            <Form
              form={form}
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
                <Input size="large" placeholder="text..." value={text} onChange={(e) => setText(e.target.value)} allowClear />
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
              {listUser.map((user) => (
                <div className="item" key={user.id}>
                  <div className="name">{user.name}</div>
                  <div className="actions">
                    <Space size="small">
                      <Button type="primary" size="small" shape="circle" icon={<EditOutlined />} onClick={() => handleEditItem(user)} />
                      <Button type="primary" danger size="small" shape="circle" icon={<DeleteOutlined />} onClick={() => handleDeleteItem(user)} />
                    </Space>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalEdit
        open={openModalEdit}
        onCancel={() => {
          setOpenModalEdit(false);
        }}
        text={text}
        onCreate={onCreate}
      />
    </div>
  );
}

export default App;
