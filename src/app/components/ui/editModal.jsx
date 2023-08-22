import { Button, Form, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";

const EditModal = ({ open, initialData, onCancel }) => {
    const { editUser } = useUsers();

    const [form] = Form.useForm();
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);

    const isDisabled =
        !submittable ||
        !values.name ||
        (values.name === initialData.name && values.date === initialData.date);

    useEffect(() => {
        form.validateFields({
            validateOnly: true,
        }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            }
        );
    }, [values]);

    useEffect(() => {
        form.setFieldsValue(initialData);
    }, [initialData]);

    const handleEdit = (e) => {
        editUser(values, initialData.key);
        onCancel();
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
            footer={false}
        >
            <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[
                        {
                            required: true,
                            message: "Имя обязательно для пользователя",
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
                            message: "Дата обязательна для пользователя",
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
                <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        style={{ marginRight: "10px" }}
                        key="cancel"
                        onClick={onCancel}
                    >
                        Отменить
                    </Button>

                    <Button
                        key="add"
                        htmlType="submit"
                        onClick={handleEdit}
                        disabled={isDisabled}
                        type="primary"
                    >
                        Редактировать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModal;
