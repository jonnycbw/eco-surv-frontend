import "./App.css";
import BreedSelector from "./components/BreedSelector";

function App() {
    return (
        <div style={{ padding: "30px 50px", width: "50vw", background: "#ecf0f1", margin: "auto", marginTop: 50, color: "#7f8c8d" }}>
            <h2>Dog Breed Image Fetcher</h2>
            <BreedSelector />
        </div>
    );
}

export default App;
