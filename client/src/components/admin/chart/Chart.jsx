import React from 'react'
import "./chart.scss"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: false,
        text: 'Chart.js Bar Chart',
        },
    },
};
  

const Chart = ({orderStatus}) => {

    const array = []
    orderStatus.map((orderStatus)=>{
      return(
        array.push(orderStatus)
      )
    })
    const getOrderCount = (arr, value)=>{
      return arr.filter((n)=> n === value).length
    }
  
    const placed = getOrderCount(array, "Checking")
    const processing = getOrderCount(array, "Processing")
    const shipped = getOrderCount(array, "Shipped")
    const delivered = getOrderCount(array, "Delivered")
  
    const data = {
      labels:["Checking", "Processing", "Shipped", "Delivered"],
      datasets: [
        {
          label: 'Order count',
          data: [placed, processing, shipped, delivered],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    return (
      <div className='charts'>
        <div className="card">
          <h3>Order Status Chart</h3>
          <Bar options={options} data={data} />
        </div>
      </div>
    )
  }

export default Chart