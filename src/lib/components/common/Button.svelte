<script>
  import Fa from 'svelte-fa'
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
  export let type, text, loading
</script>

<button
  {type}
  class="group relative flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-gradient focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-100 ease-in-out shadow-lg"
>
  {#if loading}
    <span class="flex items-center">
      <Fa icon={faCircleNotch} spin />
      <span class="ml-2">Loading...</span>
    </span>
  {:else}
    <span>{text}</span>
  {/if}
</button>
