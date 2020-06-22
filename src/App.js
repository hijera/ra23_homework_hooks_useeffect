import React,{useState} from 'react';
import './App.css';
import List from "./components/List";
import Details from "./components/Details";

function App() {
    const [info,setInfo] = useState(null);
    const onChange =  (item) => {

        setInfo(item);
    };
  return (
    <div className="App">
        <div className="row">
          <List eventHandler ={onChange} />
          <Details info={info} />
        </div>
    </div>
  );
}

export default App;
