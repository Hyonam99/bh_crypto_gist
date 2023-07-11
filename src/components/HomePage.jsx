import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic} from 'antd';
import {Link} from 'react-router-dom';
import {useGetCryptosQuery} from "../services/cryptoApi";
import {CryptoCurrencies, News} from "./component-exports";
import Loader from "./Loader";

const HomePage = () => {
    const {data, isFetching} = useGetCryptosQuery(10);
    const {Title} = Typography;
    const globalStats = data?.data?.stats

    if (isFetching) {
        return <Loader/>;
    }

    return (
        <>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={millify(Number(globalStats.total))}/></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(Number(globalStats.totalExchanges))}/></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(Number(globalStats.totalMarkets))}/></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(Number(globalStats.totalMarketCap))}/></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(Number(globalStats.total24hVolume))}/></Col>
            </Row>

            <div className='home-heading-container'>
                <Title level={2} className='bome-title'>Top 10 Crypto currencies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
            </div>

            <CryptoCurrencies simplified />

            <div className='home-heading-container'>
                <Title level={2} className='bome-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
            </div>

            <News simplified />
        </>
    )
}

export default HomePage