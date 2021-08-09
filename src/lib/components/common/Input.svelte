<script>
  export let ariaLabel, name, type, placeholder, required, value //, field
  $: params = {
    'aria-label': ariaLabel,
    name,
    placeholder,
    required,
    class:
      'appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5',
  }
</script>

<!-- used to have {...field} for formik -->

{#if type == 'text'}
  <input {...params} type="text" bind:value />
{:else if type == 'password'}
  <input {...params} type="password" bind:value />
{:else if type == 'email'}
  <input {...params} type="email" bind:value />
{/if}
