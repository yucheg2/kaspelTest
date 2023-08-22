import { Button, Table } from "antd";
import React, { useState } from "react";
import CreateModal from "./createModal";

const UsersTable = ({ users }) => {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal((p) => !p);
    };

    const columns = [
        {
            title: "Имя",
            dataIndex: "name",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.name - b.name,
        },
        {
            title: "Дата",
            dataIndex: "date",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.date - b.date,
        },
        {
            title: "Действия",
            dataIndex: "",
        },
    ];
    return (
        <>
            <Button
                onClick={handleToggleModal}
                type="primary"
                style={{ marginBottom: "10px" }}
            >
                Добавить
            </Button>
            <Table columns={columns} />
            <CreateModal open={showModal} onCancel={handleToggleModal} />
        </>
    );
};

export default UsersTable;
