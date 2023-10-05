import React from 'react';
import { Chart } from 'react-google-charts';

const GooglePieChart = ({ data }) => {
const options = {
title: '',
is3D: true,
};

return (
<div className="chart-container">
  <Chart chartType="PieChart" data={data} options={options} width="100%" height="400px" />
</div>
);
};

export default GooglePieChart;