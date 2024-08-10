import React, { useContext } from 'react'
import './BarChart.css'
import { StoreContext } from '../context/StoreContext'
import { BarChart } from '@mui/x-charts/BarChart';

const BarChart = () => {
    const {barChartData, selectedMonth} = useContext(StoreContext)
  return (
    <div>
       <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={300}
    />
    </div>
  )
}

export default BarChart