import { Button, Table } from "antd";
import React, { useState, useEffect } from "react";
import CreateModal from "./createModal";
import { useUsers } from "../../hooks/useUsers";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditModal from "./editModal";
import Search from "antd/es/input/Search";

const UsersTable = () => {
    const { users, deleteUser } = useUsers();
    const [filteredUsers, setFilteredUsers] = useState(users);

    const [searchText, setSearchText] = useState("");

    const [editeble, setEditeble] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChangeSerch = (value) => {
        setSearchText(value);
    };
    const handleToggleModal = () => {
        setShowModal((p) => !p);
    };

    const handleDelete = (key) => {
        deleteUser(key);
    };

    const handleEdit = (data) => {
        setEditeble(data);
    };

    const handelCloseEdit = () => {
        setEditeble({});
    };

    const columns = [
        {
            title: "Имя",
            dataIndex: "name",
            defaultSortOrder: "descend",
            sorter: (a, b) => (a.name > b.name ? -1 : 1),
        },
        {
            title: "Дата",
            dataIndex: "date",
            sorter: (a, b) => {
                return a?.date.split(".").reverse().join() >
                    b?.date.split(".").reverse().join()
                    ? 1
                    : -1;
            },
        },
        {
            title: "Действия",
            dataIndex: "",
            render: (_, data) => (
                <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                    <Button
                        onClick={() => handleEdit(data)}
                        type="primary"
                        icon={<EditOutlined />}
                    ></Button>
                    <Button
                        danger
                        onClick={() => handleDelete(data.key)}
                        icon={<DeleteOutlined />}
                    ></Button>
                </div>
            ),
            width: "15%",
        },
    ];

    useEffect(() => {
        if (searchText !== "") {
            const arr = users.filter((user) => {
                return (
                    user.name.includes(searchText) |
                    user.date.includes(searchText)
                );
            });
            setFilteredUsers(arr);
        } else {
            setFilteredUsers(users);
        }
    }, [searchText, users]);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Button
                    onClick={handleToggleModal}
                    type="primary"
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                >
                    Добавить
                </Button>
                <Search
                    value={searchText}
                    onChange={(e) => handleChangeSerch(e.target.value)}
                />
            </div>
            <Table columns={columns} dataSource={filteredUsers} />
            <CreateModal open={showModal} onCancel={handleToggleModal} />
            <EditModal
                open={editeble.name}
                initialData={editeble}
                onCancel={handelCloseEdit}
            />
        </>
    );
};

export default UsersTable;
