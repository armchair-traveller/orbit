<script>
  import PageTitle from '$lib/components/common/PageTitle.svelte'
  import Card from '$lib/components/common/Card.svelte'
  import query from '$lib/util/query'
  import AuthStore from '$lib/stores/AuthStore'

  let successMessage, errorMessage

  const setUserRole = async (role) => {
    try {
      const data = await query('user-role', {
        method: 'PATCH',
        body: { role },
      })
      successMessage = data.message
    } catch (err) {
      errorMessage = err.response.data.message
    }
  }
</script>

<PageTitle title="Account" />
<Card>
  <p class="font-bold">User Role</p>
  <div class="mt-4">
    <p>Select a role for yourself</p>
    <div class="mt-2 flex">
      <select
        bind:value={$AuthStore.userInfo.role}
        on:change={(e) => setUserRole(e.target.value)}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      {#if successMessage}
        <p class="text-green-700 ml-4">
          {successMessage}
        </p>
      {:else if errorMessage}
        <p class="text-red-500 ml-4">
          {errorMessage}
        </p>
      {/if}
    </div>
  </div>
</Card>
