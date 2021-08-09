<script>
  import PageTitle from '$lib/components/common/PageTitle.svelte'
  import DashboardMetric from '$lib/components/DashboardMetric.svelte'
  import Card from '$lib/components/common/Card.svelte'
  import {
    faChartArea,
    faDollarSign,
    faUserPlus,
  } from '@fortawesome/free-solid-svg-icons'
  import query from '$lib/util/query'
  import { formatCurrency } from '$lib/util'
  import DashboardChart from '$lib/components/DashboardChart.svelte'
  import { onMount } from 'svelte'

  let dashboardData

  onMount(() => {
    const getDashboardData = async () => {
      try {
        const data = await query('dashboard-data', { method: 'GET' })
        dashboardData = data
      } catch (err) {
        console.log(err)
      }
    }

    getDashboardData()
  })
</script>

<PageTitle title="Dashboard" />
{#if dashboardData}
  <div class="mb-4 flex flex-col sm:flex-row">
    <div class="w-full sm:w-1/3 sm:mr-2 mb-4 sm:mb-0">
      <DashboardMetric
        title="Sales Volume"
        value={formatCurrency(dashboardData.salesVolume)}
        icon={faChartArea}
      />
    </div>
    <div class="w-full sm:w-1/3 sm:ml-2 sm:mr-2 mb-4 sm:mb-0">
      <DashboardMetric
        title="New Customers"
        value={dashboardData.newCustomers}
        icon={faUserPlus}
      />
    </div>
    <div class="w-full sm:w-1/3 sm:ml-2 mb-4 sm:mb-0">
      <DashboardMetric
        title="Refunds"
        value={formatCurrency(dashboardData.refunds)}
        icon={faDollarSign}
      />
    </div>
  </div>
  <div class="w-full mt-4">
    <Card>
      {#if dashboardData}
        <DashboardChart salesData={dashboardData.graphData} />
      {/if}
    </Card>
  </div>
{:else}
  <p>Loading...</p>
{/if}
