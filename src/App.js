import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {NavBar, HomePage, Exchanges, CryptoCurrencies, CryptoDetails, News} from './components/component-exports'
import './App.css';

const App = () => {
  return (
    <main className='app'>
        <nav className='navbar'>
            <NavBar />
        </nav>
        <section className='main'>
            <Layout>
                <section className='routes'>
                    <Routes>
                        <Route path='/' element={<HomePage />}/>
                        <Route path='/exchanges' element={<Exchanges />}/>
                        <Route path='/cryptocurrencies' element={<CryptoCurrencies />}/>
                        <Route path='/crypto/:coinId' element={<CryptoDetails />}/>
                        <Route path='/news' element={<News />}/>
                    </Routes>
                </section>
            </Layout>
            <footer className='footer'>
                <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                    Cryptoverse <br /> All Rights reserved
                </Typography.Title>

                <Space>
                    <Link to='/'>Home</Link>
                    <Link to='/exchanges'>Exchanges</Link>
                    <Link to='/cryptocurrencies'>Cyptocurrencies</Link>
                    <Link to='/news'>News</Link>
                </Space>
            </footer>
        </section>
    </main>
  )
}

export default App
