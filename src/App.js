import { useState } from "react"
import logo from './logo.svg';
import './App.css';

import Web3 from "web3";
import { ContractABI } from "./ContractABI"


function App() {

  const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
  web3.eth.defaultAccount = web3.eth.accounts[0];

  const RemixContract = new web3.eth.Contract(
    ContractABI,
    ""   //contract Address
  );


  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [isBool, setBool] = useState(false);

  const [getStatus, setStatus] = useState([])


  const setData = async e => {
    e.preventDefault();
    // console.log(web3.eth.accounts);
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const childArray = message.split(",");
    const AddressArray = address.split(",");

    if (childArray.length != AddressArray.length) {
      setBool(true);
      return false;
    }
    else {
      setBool(false)
    }

    const gas = await RemixContract.methods.childrenNames(childArray).estimateGas();

    const result = await RemixContract.methods
      .childrenNames(childArray)
      .send({ from: account, gas });
    console.log(result);
  };

  const setWillAddress = async e => {
    e.preventDefault();

    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const childArray = message.split(",");
    const AddressArray = address.split(",");

    if (childArray.length != AddressArray.length) {
      setBool(true);
      return false;
    }
    else {
      setBool(false)
    }

    const gas = await RemixContract.methods.childrenHash(AddressArray).estimateGas();

    const result = await RemixContract.methods
      .childrenHash(AddressArray)
      .send({ from: account, gas });
    console.log(result);
  }

  const handleSubmit = () => {

  }
  const handleChange = () => {

  }

  const getDefaultData = async e => {

    const arr = []

    e.preventDefault();
    const child = await RemixContract.methods
    .retrievechildrenNames()
    .call()
    .then((r) =>{
      return r
    });


   const hash = await RemixContract.methods
      .retrievechildrenHash()
      .call()
      .then((r)=>{
        return r
      });


    var newArray = child.map((e, i) => {
     arr.push({
       username : e,
       address : hash[i]
     });
    });

    console.log(arr);

    await setStatus(arr)


  };

  const getData = async e => {
    await RemixContract.methods
      .showArray()
      .call()
      .then(console.log);
    // await RemixContract.methods
    //   .showArray()
    //   .call()
    //   .then(console.log);
  };
  return (
    <div className="App">
      {/* <form onSubmit={setData}>
        <label>
          Set Message:
          <input
            type="text"
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </label>
        <input type="submit" value="Set Message" />
      </form>
      <button onClick={getData}></button>
      <h2>Hello</h2> */}

      <div className="container">
        <div id='contact'>
          <div className='container'>
            <div className='col-md-12'>
              <div className='row'>
                <div className="col-md-12">
                  <div className='section-title'>
                    <h2>Will & Inheritance</h2>
                    <p>
                      Please fill out the form below to send us an email and we will
                      get back to you as soon as possible.
                    </p>
                  </div>
                </div>
                <div className="col-md-12">


                  <form name='sentMessage' validate onSubmit={setData}>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='form-group'>
                          <input
                            type='text'
                            id='name'
                            name='name'
                            className='form-control'
                            placeholder='Childrens Name'
                            required
                            onChange={e => setMessage(e.target.value)}
                          />
                          <p className='help-block text-danger'></p>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <div className='form-group'>
                          <input
                            type='text'
                            id='address'
                            name='address'
                            className='form-control'
                            placeholder='IPFS Addresses'
                            required
                            onChange={e => setAddress(e.target.value)}
                          />
                          <p className='help-block text-danger'></p>
                        </div>
                      </div>
                    </div>


                    <button type='submit' className='btn btn-custom btn-lg' style={{ backgroundColor: "black", color: "white" }}>
                      SUBMIT CHILD NAMES
                    </button>
                    <div id='success'>
                      {
                        isBool ?
                          <h2>Address Must matched childrens numbers </h2>
                          : null
                      }
                    </div>
                  </form>
                  <button type='submit' onClick={setWillAddress} className='btn btn-custom btn-lg' style={{ backgroundColor: "black", color: "white" }}>
                    SUBMIT WILL ADDRESS NAMES
                  </button>
                  <br></br>

                  <br></br>

                  <button type='button' onClick={getDefaultData} className='btn btn-custom btn-lg' style={{ backgroundColor: "black", color: "white" }}>
                    GET DATA
                  </button>
                </div>
              </div>
            </div>
            <div className='col-md-12 mt-5'>
            <table border="1" cellSpacing="15" cellPadding="15" style={{marginLeft: "auto",
  marginRight: "auto"}}>

                      <tr>
                        <th>
                          NAME
                        </th>
                        <th>ADDRESS</th>
                      </tr>

              {
                getStatus.length > 0 ?
                getStatus.map( e =>
                <tr>
                  <td>{e.username}</td>
                  <td> {e.address} </td>
                </tr>

                )
                 :
                null
              }
                     </table>
            </div>

          </div>
        </div>
        <div id='footer mt-5'>
          <div className='container mt-5 text-center'>
            <p>
              &copy; Will Management. Design by Muzammil , Shahmeer , Moiz , Saad

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
