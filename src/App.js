import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import React, { useState, useEffect} from "react";
import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";

function App() {
  const [state, setState] = useState({ web3: null,contract: null });

  useEffect( () => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      const networkID = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkID];

      const contract = new web3.eth.Contract(SimpleStorage.abi, deployedNetwork.address);
      setState({web3:web3,contract:contract});
    };
    provider && template();
  }, []);

  useEffect(()=>{
    const {contract} = state;
    async function readData(){
      const data = await contract.methods.getter().call();
    };
  })

  const [currentForm, setCurrentForm] =useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
    }
    </div>
  )
}

export default App;
