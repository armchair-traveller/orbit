<script>
  import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import AvatarDropdown from './AvatarDropdown.svelte'
</script>

<nav class="flex justify-between px-4">
  <div class="">
    <div class="flex">
      <input
        class="py-2 px-4 border bg-gray-100 border-gray-300 rounded-full focus:outline-none w-32 sm:w-64"
        placeholder="Search"
      />
      <button
        class="rounded-full bg-gradient px-4 ml-2 text-white flex items-center text-xs focus:outline-none shadow-lg"
      >
        <Fa icon={faArrowRight} />
      </button>
    </div>
  </div>
  <div class="">
    <AvatarDropdown />
  </div>
</nav>
