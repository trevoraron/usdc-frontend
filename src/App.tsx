import React from 'react';
import { Component } from "react";
import { BigNumber, ethers } from 'ethers';
// import './App.css';
import { Jumbotron } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  return (
    <Container>
    <Jumbotron>
      <h1 className="header">
      USDC FrontEnd Example
      </h1>
    </Jumbotron>
    <Row><Eth></Eth></Row>
    <Row><USDC></USDC></Row>
    </Container>
  );
}

type Props = {}
type State = {
  address: String,
  balance: BigNumber
};
class Eth extends Component<Props,State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      address: "waiting",
      balance: BigNumber.from(0)
    };
  }

  async componentDidMount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress()
    const balance = (await signer.getBalance())
    this.setState( {address: address, balance: balance} );
  }

 render() {
    return (
      <>
      <Col>
      <h2>User Address</h2>
      <p> {this.state.address} </p>
      </Col>
      <Col>
        <h2>
        User ETH Balance: {ethers.utils.formatUnits(this.state.balance, 18)}
        </h2>
      </Col>
      </>
    );
  }
}

type USDCProps = {}
type USDCState = {
  balance: BigNumber
};
class USDC extends Component<USDCProps,USDCState> {

  constructor(props: USDCProps) {
    super(props);
    this.state = {
      balance: BigNumber.from(0)
    };
  }

  async componentDidMount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4",
      [
        "function balanceOf(address _owner) public view returns (uint256 balance)",
      ],
      signer
    )
    const address = await signer.getAddress()
    const usdcBalance = await contract.balanceOf(address);
    this.setState( {balance: usdcBalance });
  }

  async gimmeSome() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4",
      [
        "function gimmeSome() external",
        "function balanceOf(address _owner) public view returns (uint256 balance)",
      ],
      signer
    )
    const address = await signer.getAddress()

    const tx = await contract.gimmeSome({ gasPrice: 40e9 });
    console.log(`Transaction hash: ${tx.hash}`);
  
    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    console.log(`Gas used: ${receipt.gasUsed.toString()}`);

    const usdcBalance = await contract.balanceOf(address);
    this.setState( {balance: usdcBalance });
  }

 render() {
    return (
      <>
      <Col>
        <h2>
        User USDC Balance: {ethers.utils.formatUnits(this.state.balance, 6)}
        </h2>
      </Col>
      <Col>
        <Button onClick={async () => {await this.gimmeSome()}}>
          GimmeSome!
        </Button>
      </Col>
      </>
    );
  }
}

export default App;
