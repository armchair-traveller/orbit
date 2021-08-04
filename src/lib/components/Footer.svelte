<script>
  import GradientButton from './common/GradientButton.svelte'
  import AuthDebugger from './AuthDebugger.svelte'
  let showAuthDebugger = false
</script>

<footer class="p-6">
  <div class="ml-2">
    <GradientButton
      text="Auth Debugger"
      on:click={() => (showAuthDebugger = !showAuthDebugger)}
    />
  </div>
  <div class="mt-4">
    {#if showAuthDebugger} <AuthDebugger />{/if}
  </div>
</footer>
