<script>
  import { goto } from '$app/navigation'
  import AuthStore from '$lib/stores/AuthStore'

  const isAuthenticated = AuthStore.isAuthenticated()
  if (!isAuthenticated) goto('/')
</script>

<!-- /a is for authenticated routes -->

{#if isAuthenticated}
  <slot />
{/if}
