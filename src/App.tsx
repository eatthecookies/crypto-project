import styles from "./App.module.css";
import CurrencyTable from "./components/CurrencyTable";
import Chat from "./components/Chat";
function App() {
  return (
    <div className={styles.grid}>
      <CurrencyTable />
      <Chat />
    </div>
  );
}

export default App;
