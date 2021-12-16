import React, {useState} from 'react'
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

export default function AppSider() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider 
      collapsible 
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div className='logo'>
        <img className='logo1' alt="logo" hidden={!collapsed} src="https://avatar.small.chat/team-TMMBM1YQN" />
        <img className='logo2' alt="logo" hidden={collapsed} src="https://delegate.team/wp-content/uploads/2019/07/Delegate-red-4.png" />
      </div>
      <Menu 
        theme='dark' 
        mode='inline'
        defaultSelectedKeys={'1'}
      >
        <Menu.Item 
          key='1' 
          icon={<img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" width={32} height={32} alt="MATIC" />}
        >
          Polygon Network
        </Menu.Item>
        <Menu.Item 
          key='2' 
          icon={<img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png" width={32} height={32} alt="SOL" />}
        >
          Solana Network
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
