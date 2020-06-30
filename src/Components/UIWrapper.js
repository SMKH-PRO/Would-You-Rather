import React, { useState } from 'react'
import { setState } from '../Redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined, CaretDownOutlined
} from '@ant-design/icons';
import Logo from '../Assets/Images/icon.png'
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const SideBarWrapper = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const isLogedIn = useSelector((state) => state.isLoggedIn);
    const title = useSelector((state) => state.title);

    const [collapsed, setCollapsed] = useState(true)


    const Logout = () => {
        dispatch(setState({ isLoggedIn: false, user: null }))
    }
    const toggle = () => {
        setCollapsed(!collapsed)
    };

    const isLoggedIn = isLogedIn && user && user.avatarURL
    const avatarURL = isLoggedIn ? user.avatarURL : ''
    const { children, ...rest } = props
    return (
        <Layout style={{ minHeight: '100vh', maxWidth: '100vw',overflow: 'hidden', }}>
            <Sider trigger={null} collapsible collapsed={collapsed} width={230}>
                <div className="logo" style={{ textAlign: 'center' }} >
                    <img className="SideBarLogo" src={Logo} width={collapsed ? 50 : 180} style={{ ...collapsed ? { marginTop: 10 } : {} }} />
                    <h1 className={collapsed ? "menuH1Collapsed menuH1" : "menuH1"}   >Would You Rather</h1>
                </div>
                <hr className="menuDivider" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                       <Link to="/add">Add Poll</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                       <Link to="/Leaderboard">Leaderboard</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}

                    {title && <span style={{ fontSize: 16 }}> <b>{title}</b>  <span style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}> - WOULD YOU RATHER</span></span>}

                    {isLoggedIn &&
                        <Dropdown overlay={

                            <Menu>
                                <Menu.Item onClick={Logout}>
                                    <span>Logout</span>
                                </Menu.Item>
                            </Menu>
                        }
                            placement="bottomRight">
                            <div className="userHeader">
                                <Avatar style={{ marginTop: -10 }} src={avatarURL} />
                                <span >{user.name}  <CaretDownOutlined /></span>

                            </div>
                        </Dropdown>
                    }

                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}



                </Content>
            </Layout>
        </Layout>
    );

}

export default SideBarWrapper
