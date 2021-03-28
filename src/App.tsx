import React from 'react';
import { Component } from "react";
import { BigNumber, ethers } from 'ethers';
// import './App.css';
import { Jumbotron } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {Col, Row} from 'react-bootstrap'

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
    const balance = (await signer.getBalance()).div(ethers.constants.WeiPerEther)
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
        User ETH Balance: {this.state.balance.toString()}
        </h2>
      </Col>
      </>
    );
  }
}

export default App;
