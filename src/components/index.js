import { useCallback, useEffect, useState } from "react";
import web3ModalSetup from "./../helpers/web3ModalSetup";
import Web3 from "web3";
import getAbi from "../Abi";
import getAbiBusd from "../Abi/busd";
import logo from "./../assets/logo.png";
import audit from "./../assets/audit.png";
import dapprader from "./../assets/dapprader.png";
import dapp from "./../assets/dapp.png";





/* eslint-disable no-unused-vars */

const web3Modal = web3ModalSetup();

const Interface = () => {
  const [Abi, setAbi] = useState();
  const [AbiBusd, setAbiBusd] = useState();
  const [web3, setWeb3] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [injectedProvider, setInjectedProvider] = useState();
  const [refetch, setRefetch] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [current, setCurrent] = useState(null);
  const [connButtonText, setConnButtonText] = useState("CONNECT");
  const [allowance, setAllowance] = useState(0);
  const [lotto1, setLotto1] = useState(0);
  const [lotto2, setLotto2] = useState(0);
  const [lotto3, setLotto3] = useState(0);
  const [ticketCount, setCount1] = useState(0);
  const [ticketCount2, setCount2] = useState(0);
  const [ticketCount3, setCount3] = useState(0);
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [balance, setBalance] = useState(0);
  const [timestamp, setTimeStamp] = useState(0);
  const [timestamp1, setTimeStamp1] = useState(0);
  const [timestamp2, setTimeStamp2] = useState(0);







  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (
      injectedProvider &&
      injectedProvider.provider &&
      typeof injectedProvider.provider.disconnect == "function"
    ) {
      await injectedProvider.provider.disconnect();
    }
    setIsConnected(false);

    window.location.reload();
  };
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3(provider));
    const acc = provider.selectedAddress
      ? provider.selectedAddress
      : provider.accounts[0];


    const short = shortenAddr(acc);

    setWeb3(new Web3(provider));
    setAbi(await getAbi(new Web3(provider)));
    setAbiBusd(await getAbiBusd(new Web3(provider)));
    setAccounts([acc]);
    setCurrent(acc);
    //     setShorttened(short);
    setIsConnected(true);

    setConnButtonText(short);

    provider.on("chainChanged", (chainId) => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new Web3(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new Web3(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setInjectedProvider]);

  useEffect(() => {
    setInterval(() => {
      setRefetch((prevRefetch) => {
        return !prevRefetch;
      });
    }, 3000);
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    // eslint-disable-next-line
  }, []);

  const shortenAddr = (addr) => {
    if (!addr) return "";
    const first = addr.substr(0, 3);
    const last = addr.substr(38, 41);
    return first + "..." + last;
  };







  useEffect(() => {
    const Contract = async () => {
      if (isConnected && Abi) {
        console.log(current);
        let _lotto1 = await Abi.methods.lotto1Balance().call();
        setLotto1(_lotto1);

        let _lotto2 = await Abi.methods.lotto2Balance().call();
        setLotto2(_lotto2);


        let _lotto3 = await Abi.methods.lotto3Balance().call();
        setLotto3(_lotto3);

        let countTicket = await Abi.methods.TicketCounter(current).call();
        setCount1(countTicket[0]);
        setCount2(countTicket[1]);
        setCount3(countTicket[2]);

        let _timestamp = await Abi.methods.time1Id(1).call();
        let _endTime1 = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(_timestamp.timestamp + "000");
        setTimeStamp(_endTime1);


        let _timestamp1 = await Abi.methods.time1Id(2).call();
        let _endTime2 = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(_timestamp1.timestamp + "000");
        setTimeStamp1(_endTime2);

        let _timestamp3 = await Abi.methods.time1Id(3).call();
        let _endTime3 = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(_timestamp3.timestamp + "000");
        setTimeStamp2(_endTime3);







      }
    };

    Contract();
    // eslint-disable-next-line
  }, [refetch]);






  useEffect(() => {
    const approvalallowance = async () => {
      if (isConnected && AbiBusd) {

        let _contract = '0x620ac49AE89a7CD6757D3F029890a67a56ed277E';
        let _allowance = await AbiBusd.methods.allowance(current, _contract).call();
        setAllowance(_allowance);

        let _balance = await AbiBusd.methods.balanceOf(current).call();
        setBalance(_balance / 10e17);


      }
    };

    approvalallowance();
    // eslint-disable-next-line
  }, [refetch]);


  const Approve = async (e) => {
    e.preventDefault();
    if (isConnected && AbiBusd) {
      let _contract = '0x620ac49AE89a7CD6757D3F029890a67a56ed277E';
      let _amount = '199999999999999999999999999999999999999999999999999';
      await AbiBusd.methods.approve(_contract, _amount).send({
        from: current,
      });
    }
  }
  /* global BigInt */
  const Deposit1 = async (e) => {
    e.preventDefault();
    if (isConnected && Abi) {
      await Abi.methods.lotto1Entry('1000000000000000000', value).send({
        from: current,
      })

    }

  }

  const Deposit2 = async (e) => {
    e.preventDefault();
    if (isConnected && Abi) {
      await Abi.methods.lotto2Entry('1000000000000000000', value2).send({
        from: current,
      })

    }

  }

  const Deposit3 = async (e) => {
    e.preventDefault();
    if (isConnected && Abi) {
      await Abi.methods.lotto3Entry('1000000000000000000', value3).send({
        from: current,
      })

    }

  }





  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark" style={{ background: "black" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="https://dinobusd.finance"><img src={logo} alt="logo" className="img-fluid" style={{ width: "200px" }} /></a>

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <a className="nav-link" href="whitepaper.pdf">WHITEPAPER</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="audit.pdf">AUDIT</a>
            </li>
          </ul>

          <a href="https://dinobusd.finance" className="btn btn-primary btn-lg btnd" style={{ background: "black", color: "#f68f19", border: "1px solid #fff" }}>MINER APP</a>

          <button className="btn btn-primary btn-lg btnd" style={{ background: "#f68f19", color: "black", border: "1px solid #fff" }} onClick={loadWeb3Modal}><span className="fas fa-wallet"></span> {connButtonText}</button>



        </div>
      </nav>

      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h1>Available in Pool</h1>
                <p className="badge bg-dark">{lotto1 / 10e17} BUSD</p>
                <h3>Announcing In</h3>
                <p className="badge bg-dark">{timestamp}</p>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h1>Available in Pool</h1>
                <p className="badge bg-dark">{lotto2 / 10e17} BUSD</p>
                <h3>Announcing In</h3>
                <p className="badge bg-dark">{timestamp1}</p>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h1>Available in Pool</h1>
                <p className="badge bg-dark">{lotto3 / 10e17} BUSD</p>
                <h3>Announcing In</h3>
                <p className="badge bg-dark">{timestamp2}</p>
              </div>
            </div>
          </div>
        </div>

        <br /> <br />

        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-header">
                6 Hours Lottery
              </div>
              <div className="card-body">
                <table className="table">
                  <tr>
                    <td>Your Balance</td>
                    <td style={{ textAlign: "right" }}>{Number(balance).toFixed(2)} BUSD</td>
                  </tr>
                  <tr>
                    <td>Entry Fee</td>
                    <td style={{ textAlign: "right" }}>1 BUSD</td>
                  </tr>
                  <tr>
                    <td>Participated</td>
                    <td style={{ textAlign: "right" }}>{(lotto1 / 10e17) / 1}</td>
                  </tr>

                  <tr>
                    <td>Your Entries</td>
                    <td style={{ textAlign: "right" }}>{ticketCount}</td>
                  </tr>

                </table>
                <div className="row">
                  <div className="col-sm-8">
                    <input type="number" placeholder="Tickets" className="form-control"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />

                  </div>

                  <div className="col-sm-4">
                    {allowance > 0 ? <>
                      <button className="btn btn-warning" onClick={Deposit1}>Purchase</button>
                    </> : <>
                      <button className="btn btn-warning" onClick={Approve}>Approve</button>
                    </>}

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="card-header">
                12 Hours Lottery
              </div>
              <div className="card-body">
                <table className="table">
                  <tr>
                    <td>Your Balance</td>
                    <td style={{ textAlign: "right" }}>{Number(balance).toFixed(2)} BUSD</td>
                  </tr>
                  <tr>
                    <td>Entry Fee</td>
                    <td style={{ textAlign: "right" }}>1 BUSD</td>
                  </tr>
                  <tr>
                    <td>Participated</td>
                    <td style={{ textAlign: "right" }}>{(lotto2 / 10e17) / 1}</td>
                  </tr>

                  <tr>
                    <td>Your Entries</td>
                    <td style={{ textAlign: "right" }}>{ticketCount2}</td>
                  </tr>

                </table>
                <div className="row">
                  <div className="col-sm-8">

                    <input type="number" placeholder="Tickets" className="form-control"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-4">
                    {allowance > 0 ? <>
                      <button className="btn btn-warning" onClick={Deposit2}>Purchase</button>
                    </> : <>
                      <button className="btn btn-warning" onClick={Approve}>Approve</button>
                    </>}

                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="card-header">
                24 Hours Lottery
              </div>
              <div className="card-body">
                <table className="table">
                  <tr>
                    <td>Your Balance</td>
                    <td style={{ textAlign: "right" }}>{Number(balance).toFixed(2)} BUSD</td>
                  </tr>
                  <tr>
                    <td>Entry Fee</td>
                    <td style={{ textAlign: "right" }}>1 BUSD</td>
                  </tr>
                  <tr>
                    <td>Participated</td>
                    <td style={{ textAlign: "right" }}>{(lotto3 / 10e17) / 1}</td>
                  </tr>

                  <tr>
                    <td>Your Entries</td>
                    <td style={{ textAlign: "right" }}>{ticketCount3}</td>
                  </tr>

                </table>
                <div className="row">
                  <div className="col-sm-8">
                    <input type="number" placeholder="Tickets" className="form-control"
                      value={value3}
                      onChange={(e) => setValue3(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-4">
                    {allowance > 0 ? <>
                      <button className="btn btn-warning" onClick={Deposit3}>Purchase</button>
                    </> : <>
                      <button className="btn btn-warning" onClick={Approve}>Approve</button>
                    </>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <center> <h4>Buy Multiple Tickets by paying one-time gas fee </h4></center>
      <br />

      <center>
        <h2>Audit Partner</h2>
        <a href="audit.pdf"><img src={audit} alt={audit} className="img-fluid" style={{ width: "300px" }} /></a>
      </center>
      <br />



      <br />
      <center>
        <br />
        <h2>Featured On</h2>

        <a href="https://dappradar.com/binance-smart-chain/other/dinobusd"><img src={dapprader} alt="dapprader" width={200} /></a>

        <a href="https://www.dapp.com/app/dinobusd"><img src={dapp} alt="dapprader" width={200} /> </a>

      </center>
      <br />
      <center><h5> <a href="https://twitter.com/dinobusd" style={{ color: "#f68f19", textDecoration: "none" }}><i class="fa fa-twitter"></i> Twitter </a> || <a href="https://t.me/DinoBusdOfficial" style={{ color: "#f68f19", textDecoration: "none" }}><i class="fa fa-telegram"></i> Telegram </a> || <a href="audit.pdf" style={{ color: "#f68f19", textDecoration: "none" }}><i class="fa fa-file-code-o"></i> Audit </a>|| <a href="https://www.bscscan.com/address/0x620ac49AE89a7CD6757D3F029890a67a56ed277E#code" style={{ color: "#f68f19", textDecoration: "none" }}><i class="fa fa-line-chart"></i> Bscscan </a></h5></center>


      <br />
    </>

  );
}

export default Interface;
