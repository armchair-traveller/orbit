<script>
  import Fa from 'svelte-fa'
  export let title, value, icon
</script>

<div class="bg-white rounded-lg shadow-lg p-4 border-t-4 border-blue-500">
  <p class="text-gray-600 uppercase text-xs">
    <Fa {icon} class="mr-2" />
    {title}
  </p>
  <p class="text-3xl text-blue-600 font-bold">{value}</p>
</div>
