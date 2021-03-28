import React from 'react';
import { Component } from "react";
import { BigNumber, ethers } from 'ethers';
// import './App.css';
import { Alert, Jumbotron, Spinner } from 'react-bootstrap';
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
    <USDC></USDC>
    </Container>
  );
}

type USDCProps = {}
type USDCState = {
  address: string
  ethBalance: BigNumber,
  balance: BigNumber,
  waiting: boolean,
  txHash?: string,
};
class USDC extends Component<USDCProps,USDCState> {

  constructor(props: USDCProps) {
    super(props);
    this.state = {
      address: "waiting",
      ethBalance: BigNumber.from(0),
      balance: BigNumber.from(0),
      waiting: false,
      txHash: undefined,
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
    const balance = (await signer.getBalance())
    this.setState( {balance: usdcBalance, ethBalance: balance, address: address });
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
    this.setState( {waiting: true, txHash: tx.hash} );

    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    console.log(`Gas used: ${receipt.gasUsed.toString()}`);

    const usdcBalance = await contract.balanceOf(address);
    const balance = (await signer.getBalance())
    this.setState( {balance: usdcBalance, waiting: false, ethBalance: balance });
  }

 render() {
    let fragment = <></>
    let spinner = <></>
    if(this.state.waiting) {
      spinner = <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    }
    if(this.state.txHash) {
      fragment = <Alert>
        {spinner}
        <Alert.Link href={"https://ropsten.etherscan.io/tx/" + this.state.txHash}>Transaction</Alert.Link>
      </Alert>
    }
    return (
      <>
      <Row>
        <Col>
          <h2>User Address</h2>
          <p> {this.state.address} </p>
        </Col>
        <Col>
          <h2>
            User ETH Balance: {ethers.utils.formatUnits(this.state.ethBalance, 18)}
          </h2>
        </Col>
      </Row>
      <Row>
      <Col>
        <h2>
        User USDC Balance: {ethers.utils.formatUnits(this.state.balance, 6)}
        </h2>
      </Col>
      <Col>
        <Button onClick={async () => {await this.gimmeSome()}}>
          GimmeSome!
        </Button>
        {fragment}
      </Col>
      </Row>
      </>
    );
  }
}

export default App;
