import { Layout } from "antd";
import React from "react";
import UsersTable from "../components/ui/usersTable";

const { Content } = Layout;

const TablePage = () => {
    return (
        <Layout>
            <Content>
                <UsersTable />
            </Content>
        </Layout>
    );
};

export default TablePage;
