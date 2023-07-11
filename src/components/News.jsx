import React, {useState} from 'react';
import {Typography, Row, Col, Select, Avatar, Card} from 'antd';
import moment from "moment";
import {useGetNewsQuery} from "../services/newsApi";
import {useGetCryptosQuery} from "../services/cryptoApi";
import {Link} from "react-router-dom";
import millify from "millify";
import Loader from "./Loader";


const News = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const {data: cryptoNews, isFetching} = useGetNewsQuery({
        newsCategory,
        count: simplified ? 4 : 10
    });
    const {data} = useGetCryptosQuery(100);
    const {Title, Text} = Typography;

    if (isFetching) {
        return <Loader/>;
    }

    return (
        <>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='select a cypto'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            <Row gutter={[24, 24]} className='crypto-card-container'>
                {cryptoNews?.value?.map((news, i) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={`${i + 1}-crypto-news-${i * 2}`}>
                        <Card className='news-card' hoverable>
                            <Link to={news.url} target='_blank' rel='noreferrer'>
                                <div className='news-image-container'>
                                    <Title level={5} className='news-title'>{news.name}</Title>
                                    <img style={{maxWidth: '200px', maxHeight: '80px'}}
                                         src={news?.image?.thumbnail?.contentUrl} alt='news'/>
                                </div>
                                <p>
                                    {news.description > 40 ? `${news.description.substring(0, 40)}...` : news.description}
                                </p>

                                <div className='provider-container'>
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt='news-avatar'/>
                                        <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News;
