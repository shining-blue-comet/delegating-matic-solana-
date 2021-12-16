import React from 'react'
import { Button, Layout } from 'antd';

import { MaticPOSClient } from '@maticnetwork/maticjs'
// import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3';

// use(Web3ClientPlugin);

const { Header } = Layout;

export default function AppHeader() {
  const maticClient = new MaticPOSClient();

  const provider = window.ethereum;
  console.log(provider, maticClient);
  
  return (
    <Header className='header'>
      <Button
        size='large'
        type='primary'
      >
        connect wallet
      </Button>
    </Header>
  )
}
