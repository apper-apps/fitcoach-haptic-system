import React from 'react';
import Chart from 'react-apexcharts';

const WeightChart = ({ data, timeframe }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['#4F46E5'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    grid: {
      show: true,
      borderColor: '#f1f5f9',
      strokeDashArray: 0,
      position: 'back'
    },
    xaxis: {
      categories: data.map(item => item.date),
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        },
        formatter: (value) => `${value}kg`
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: (value) => `${value} kg`
      }
    },
    markers: {
      size: 6,
      colors: ['#4F46E5'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        gradientToColors: ['#7C3AED'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 0.8,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    }
  };

  const series = [{
    name: 'Weight',
    data: data.map(item => item.weight)
  }];

  const latestWeight = data[data.length - 1]?.weight || 0;
  const initialWeight = data[0]?.weight || 0;
  const totalChange = latestWeight - initialWeight;
  const changePercentage = initialWeight > 0 ? ((totalChange / initialWeight) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Current</p>
          <p className="text-xl font-bold text-gray-900">{latestWeight}kg</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Change</p>
          <p className={`text-xl font-bold ${totalChange < 0 ? 'text-success-600' : 'text-amber-600'}`}>
            {totalChange > 0 ? '+' : ''}{totalChange.toFixed(1)}kg
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Progress</p>
          <p className={`text-xl font-bold ${changePercentage < 0 ? 'text-success-600' : 'text-amber-600'}`}>
            {changePercentage > 0 ? '+' : ''}{changePercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
};

export default WeightChart;