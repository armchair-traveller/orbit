<script>
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faCaretDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
  import defaultAvatar from '$lib/images/defaultAvatar.png'
  import AuthStore from '$lib/stores/AuthStore'

  const dropdownItems = [
    {
      title: 'Log Out',
      icon: faSignOutAlt,
      onClick: AuthStore.logout,
    },
  ]
  let dropdownOpen = false
  let node
  onMount(() => {
    const handleClick = (e) => {
      if (!node.current.contains(e.target)) {
        dropdownOpen = false
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })
</script>

<button
  bind:this={node}
  class="flex rounded-full items-center py-2 px-3 bg-gradient focus:outline-none shadow-lg"
  on:click={() => (dropdownOpen = !dropdownOpen)}
>
  <img
    src={$AuthStore.userInfo?.avatar || defaultAvatar}
    class="rounded-full w-6 border-2 border-white"
    alt="Avatar"
  />
  <div class="px-3">
    <p class="text-white">Fang</p>
  </div>
  <div class="mr-1 text-white">
    <Fa icon={faCaretDown} />
  </div>
</button>

{#if dropdownOpen}
  <div class="relative">
    <div class="bg-white w-full absolute p-4 shadow-lg rounded-lg mt-2">
      {#each dropdownItems as item, i (i)}
        <div class="mt-1">
          <button
            class="text-gray-700 flex items-center"
            on:click={item.onClick}
          >
            <Fa icon={item.icon} />
            <p class="ml-2">{item.title}</p>
          </button>
        </div>
      {/each}
    </div>
  </div>
{/if}
