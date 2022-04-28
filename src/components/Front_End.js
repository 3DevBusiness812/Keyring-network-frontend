import { Button, Popover, Box, setRef } from "@mui/material"
import Executing from "./Executing"
import WhiteListed from "./WhiteListed"
import ExpiredNFT from './ExpiredNFT';
import NoNFT from "./NoNFT";
import Validate from "./Validate";
import React, { useState, useRef, useEffect } from 'react'
// import { useWeb3React } from "@web3-react/core"
// import { useWalletModal } from 'redrum-pancake-uikit';
// import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";
// import { injected } from "./components/injected"
// import {useWallet} from "use-react-wallet";

function Front_End() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const [popupIndex, setPopupIndex] = useState(0);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Use Metamask!");
      } else {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Account connected ", accounts[0]);

        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const onNewSigner = async () => {
      let addr;
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        if (signer) {
          addr = await signer.getAddress();
          setUserAddress(addr.toString());
        }
      }
    }

    onNewSigner();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopupIndex((popupIndex + 1) % 5);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');


  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor((total / 1000 * 60 * 60) % 24);
    const hours = Math.floor(total / 3600000);
    return {
      total, hours, minutes, seconds
    };
  }


  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }
  const clearTimer = (e) => {
    setTimer('05:12:34');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + (3600 * 5 + 12 * 60 + 34));
    return deadline;
  }
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.(handleaccounts)');
      setCurrentAccount("");
      setUserAddress("");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]); console.log("Account connected ", accounts[0]);
      setUserAddress(accounts[0]);
    }
  }
  window.ethereum.on('accountsChanged', handleAccountsChanged);
  return (
    <>
      {/* {!currentAccount && (
          <Button aria-describedby={id} variant="contained" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )} */}
      <Box marginTop="700px" > <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Ooops</Button>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {popupIndex === 0 && <Executing userAddress={userAddress}></Executing>}
        {popupIndex === 1 && <WhiteListed userAddress={userAddress} timer={timer}></WhiteListed>}
        {popupIndex === 2 && <ExpiredNFT userAddress={userAddress} ></ExpiredNFT>}
        {popupIndex === 3 && <NoNFT userAddress={userAddress}></NoNFT>}
        {popupIndex === 4 && <Validate userAddress={userAddress}></Validate>}
      </Popover>
      {/* <img src={logo} className="App-logo" alt="logo"/> */}
    </>
  );
}

export default Front_End;
