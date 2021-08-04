<script>
  import AuthStore from '$lib/stores/AuthStore'

  const { token, expiresAt, userInfo } = $AuthStore
</script>

<section class="rounded-lg shadow bg-white p-4">
  {#each [{ title: 'Token', value: token }, { title: 'Expiry', value: expiresAt }, { title: 'User Info', value: JSON.stringify(userInfo, null, 2) }] as { title, value }}
    <div class="text-sm mb-2">
      <p class="font-bold mb-2">{title}</p>
      <pre
        class="whitespace-pre-wrap bg-gray-100 p-2 rounded">
    <code class="break-all">{value}</code>
  </pre>
    </div>
  {/each}
</section>
