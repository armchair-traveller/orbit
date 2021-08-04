<!-- Admin route -->
<script>
  import { goto } from '$app/navigation'
  import AuthStore from '$lib/stores/AuthStore'

  const isAdmin = AuthStore.isAdmin()
  if (!isAdmin) goto('/')
</script>

{#if isAdmin}
  <!-- inventory page content here! -->
{/if}
