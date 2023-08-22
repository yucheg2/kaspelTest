import UsersProvider from "./hooks/useUsers";
import TablePage from "./pages/tablePage";

function App() {
    return (
        <UsersProvider>
            <TablePage />
        </UsersProvider>
    );
}

export default App;
