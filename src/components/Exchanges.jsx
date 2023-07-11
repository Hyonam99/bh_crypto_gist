import React from 'react';
import millify from 'millify';
import {Avatar, Col, Collapse, Row, Typography} from 'antd';

import {useGetExchangesQuery} from '../services/cryptoApi';
import {useGetExchangeDetailsQuery} from '../services/exchangeDetails';
import Loader from './Loader';

const {Text} = Typography;
const {Panel} = Collapse;

const Exchanges = () => {
    const {data, isFetching} = useGetExchangesQuery();
    const {data: exchangeDetails} = useGetExchangeDetailsQuery();
    const exchangesList = data?.data?.exchanges;

    if (isFetching) return <Loader/>;

    const getExchangeName = (checkName) => {
        return exchangeDetails?.find(
            ({name}) => name.toLowerCase().substring(0, 5) === checkName.toLowerCase().substring(0, 5)
        )
    }


    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Trust Score</Col>
            </Row>
            <Row>
                {exchangesList.map((exchange, i) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.uuid}
                                showArrow={false}
                                header={(
                                    <Row key={exchange.uuid}>
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image"
                                                    src={getExchangeName(exchange.name)?.image ?? exchange.iconUrl}
                                            />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                                        <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>{getExchangeName(exchange.name)?.trust_score ?? 2.4}%</Col>
                                    </Row>
                                )}
                            >
                                {getExchangeName(exchange.name)?.description || `${exchange.name}, established in 
                                    ${getExchangeName(exchange.name)?.year_established ?? 2012}, 
                                    is a prominent and widely-used cryptocurrency exchange platform. It was founded by 
                                    a well-known figure in the cryptocurrency industry. ${exchange.name} started its 
                                    operations in ${getExchangeName(exchange.name)?.country ?? 'United states'}`}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;