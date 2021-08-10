<script>
  import { goto } from '$app/navigation'
  import AuthStore from '$lib/stores/AuthStore'
  import GradientBar from '$lib/components/common/GradientBar.svelte'
  import Navbar from '$lib/components/Navbar.svelte'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import Footer from '$lib/components/Footer.svelte'

  // AUTH CURRENTLY DISABLED. Re-enable later as we get to that point
  // const isAuthenticated = AuthStore.isAuthenticated()
  // if (!isAuthenticated) goto('/')
</script>

<!-- /a is for the app routes, which operates on authenticated routes + app layout -->

<!-- {#if isAuthenticated} -->
<GradientBar />
<div class="flex">
  <div class="sm:w-64 px-4 sm:px-8 pt-6 bg-white">
    <Sidebar />
  </div>
  <div class="flex flex-col w-full border-l border-gray-200">
    <div class="p-4 border-b border-gray-200 bg-white">
      <Navbar />
    </div>
    <div class="px-4 sm:px-8 py-2 bg-gray-100">
      <slot />
    </div>
    <Footer />
  </div>
</div>
<!-- {/if} -->
