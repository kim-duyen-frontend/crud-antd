import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';

const ModalEdit = ({ open, onCancel, text }) => {
    const [form] = Form.useForm();
    const [name, setName] = useState("");

    const onTextChange = (e) => {
        setName(e.target.value);
    }
    useEffect(() => {
        if (open) {
            setName(text);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])
    return (
        <Modal
            open={open}
            title="Edit Info User"
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                console.log("Get name success", text);
                onCancel();
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item label="Text">
                    <Input value={name} onChange={onTextChange} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEdit;