import React from "react";
import {CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart} from "chart.js";
import {Line} from 'react-chartjs-2';
import {Col, Row, Select, Typography} from "antd";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({coinHistory, coinName, currentPrice}) => {
    const {Title} = Typography;
    const {Option} = Select;

    const coinPrice = [];
    const coinTimeStamp = [];
    const paramData = coinHistory?.data?.history

    for (let i = 0; i < paramData?.length; i++) {
        coinPrice.push(paramData[i].price)

    }

    for (let i = 0; i < paramData?.length; i += 1) {
        coinTimeStamp.push(new Date(paramData[i].timestamp * 1000).toLocaleString('default', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }))
    }

    const chartData = {
        labels: coinTimeStamp.reverse(), datasets: [{
            label: 'Price in USD', data: coinPrice.reverse(), fill: false,
            backgroundColor: '#0071bd', borderColor: '#0071bd',
            pointStyle: false
        }]
    }

    const options = {
        animation: true,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        elements: {
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Specify your desired background color here
        },
    };


    return (<>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>{coinName} Price chart</Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>{coinHistory?.data?.change}</Title>
                <Title level={5} className='current-price'>Current {coinName} price: $ {currentPrice}</Title>
            </Col>
        </Row>
        <Line data={chartData} options={options}/>
    </>)
}

export default LineChart