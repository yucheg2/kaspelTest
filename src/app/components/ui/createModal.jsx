import { Button, Form, Input, Modal } from "antd";
import React from "react";

const CreateModal = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    const handleAdd = () => {
        console.log();
        console.log(form.getFieldValue());
    };

    const getCurrentDate = () => {
        const date = new Date();
        return (
            date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear()
        );
    };
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={"Создать пользователя."}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Отменить
                </Button>,
                <Button key="add" onClick={handleAdd} type="primary">
                    Добавить
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[
                        {
                            required: true,
                            message:
                                "Имя обязательно для создания пользователя",
                        },
                        {
                            type: "string",
                            min: 3,
                            message: "Имя должно содержать минимум 3 символа",
                        },
                    ]}
                >
                    <Input placeholder="Введите имя пользователя" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="День рождения"
                    rules={[
                        {
                            required: true,
                            message:
                                "Дата обязательна для создания пользователя",
                        },
                        {
                            pattern: new RegExp(
                                /^[0-9]{1,2}.(0?[1-9]|1[0-2]).[0-9]{4}$/g
                            ),
                            message: `Введите дату (${getCurrentDate()})`,
                        },
                    ]}
                >
                    <Input placeholder="Введите день рождения пользователя" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateModal;
