<!-- This was supposed to use some sort of React chart, but not going to bother for now. That's not the important part.
  However, if you have time, I suggest usimg svelte-frappe-charts for your charting lib.  
 Though it might involve some data massaging, which is easy since this is fixed data from the API -->
<script>
  export let salesData
</script>

<p>
  {JSON.stringify(salesData, null, 2)}
</p>

<!-- import { Line as LineChart } from 'react-chartjs-2'
import { formatCurrency } from './../util'


const DashboardChart = ({ salesData }) => {
  const chartLabels = salesData.map((sale) => sale.date)
  const chartValues = salesData.map((sale) => sale.amount)

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d')
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 250)
    gradientFill.addColorStop(0, 'rgba(0, 97, 215, 0.3)')
    gradientFill.addColorStop(1, 'rgba(0, 200, 255, 0)')
    return {
      labels: chartLabels,
      datasets: [
        {
          label: 'Sales',
          borderColor: '#3182ce',
          data: chartValues,
          backgroundColor: gradientFill,
        },
      ],
    }
  }

  return (
    <LineChart
      height={100}
      data={chartData}
      options={{
        elements: {
          line: {
            tension: 0.3,
            borderWidth: 1.5,
          },
          point: { radius: 0 },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value) => formatCurrency(value),
              },
            },
          ],
        },
      }}
    />
  )
} -->
