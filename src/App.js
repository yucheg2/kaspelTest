import UsersProvider from "./app/hooks/users";
import TablePage from "./app/pages/tablePage";

function App() {
    return (
        <UsersProvider>
            <TablePage />;
        </UsersProvider>
    );
}

export default App;
