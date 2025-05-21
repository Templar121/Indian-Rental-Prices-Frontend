import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface PriceChartProps {
  cityName: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ cityName }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();
  
  const generateChartData = () => {
    let historicalData;
    let predictedValues;
    
    switch(cityName.toLowerCase()) {
      case 'mumbai':
        historicalData = [105200, 25500, 44580.56, 59467.89, 54188.56, 69529.13];
        predictedValues = [76745.07, 84709.91, 93501.35, 103205.20, 113916.15];
        break;
      case 'delhi':
        historicalData = [175000, 28250, 79541, 57633, 283314, 232522];
        predictedValues = [438918.5, 828518.9, 1563943.1, 2952157.08, 5572601.3];
        break;
      case 'pune':
        historicalData = [15000, 27418, 18490, 18997, 20714, 24504];
        predictedValues = [28439.7, 33007.4, 38308.7, 44461.3, 51602.23];
        break;
      case 'kolkata':
        return null; // Return null for Kolkata to show "Coming Soon"
      default:
        historicalData = [70000, 65000, 68000, 72000, 76000, 80000];
        predictedValues = [84000, 89000, 94000, 99000, 105000];
    }
    
    const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];
    const actualData = [...historicalData, null, null, null, null, null];
    const predictedData = [null, null, null, null, null, null, ...predictedValues];
    
    return {
      labels: years,
      actualData,
      predictedData
    };
  };
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    if (cityName.toLowerCase() === 'kolkata') {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
        ctx.fillStyle = isDarkMode ? '#e2e8f0' : '#1e293b';
        ctx.font = '24px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Coming Soon', chartRef.current.width / 2, chartRef.current.height / 2);
      }
      return;
    }
    
    import('chart.js').then((ChartModule) => {
      const { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend } = ChartModule;
      
      Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend);
      
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;
      
      const { labels, actualData, predictedData } = generateChartData();
      
      const chartInstance = Chart.getChart(chartRef.current);
      if (chartInstance) {
        chartInstance.destroy();
      }
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Historical Rental Prices',
              data: actualData,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 3,
              tension: 0.3,
              pointBackgroundColor: '#3b82f6',
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: 'Predicted Rental Prices',
              data: predictedData,
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              borderWidth: 3,
              borderDash: [5, 5],
              tension: 0.3,
              pointBackgroundColor: '#f97316',
              pointRadius: 4,
              pointHoverRadius: 6,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: isDarkMode ? '#e2e8f0' : '#1e293b',
                font: {
                  family: "'Inter', sans-serif",
                  size: 12
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              titleColor: isDarkMode ? '#e2e8f0' : '#1e293b',
              bodyColor: isDarkMode ? '#e2e8f0' : '#1e293b',
              borderColor: isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(203, 213, 225, 0.5)',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    const value = context.parsed.y;
                    if (value >= 100000) {
                      label += '₹' + (value / 100000).toFixed(2) + ' Lakh';
                    } else {
                      label += '₹' + value.toFixed(2) + ' Thousand';
                    }
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(203, 213, 225, 0.5)',
              },
              ticks: {
                color: isDarkMode ? '#cbd5e1' : '#475569',
                font: {
                  family: "'Inter', sans-serif"
                }
              }
            },
            y: {
              grid: {
                color: isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(203, 213, 225, 0.5)',
              },
              ticks: {
                color: isDarkMode ? '#cbd5e1' : '#475569',
                font: {
                  family: "'Inter', sans-serif"
                },
                callback: function(value) {
                  if (value >= 100000) {
                    return '₹' + (value / 100000).toFixed(2) + ' L';
                  }
                  return '₹' + value + ' K';
                }
              }
            }
          }
        }
      });
    });
  }, [cityName, isDarkMode]);
  
  return (
    <div className="w-full h-80">
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default PriceChart;