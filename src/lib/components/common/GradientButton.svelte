<script>
  import Fa from 'svelte-fa'
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
  import classNames from 'classnames'
  export let type, text, size, loading

  const classes = classNames({
    'flex rounded-full items-center py-2 px-6 bg-gradient focus:outline-none shadow-lg text-white': true,
    'text-2xl': size === 'lg',
  })
</script>

<button {type} class={classes} on:click>
  {#if loading}
    <span class="flex items-center">
      <Fa icon={faCircleNotch} spin />
      <span class="ml-2">Loading...</span>
    </span>
  {:else}
    <span>{text}</span>
  {/if}
</button>
