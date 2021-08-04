<script>
  export let ariaLabel, name, type, placeholder, required, value //, field
</script>

<!-- used to have {...field} for formik -->

{#if type == 'text'}
  <input
    aria-label={ariaLabel}
    {name}
    type="text"
    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
    {placeholder}
    {required}
    bind:value
  />
{:else if type == 'password'}
  <input
    aria-label={ariaLabel}
    {name}
    type="password"
    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
    {placeholder}
    {required}
    bind:value
  />
{/if}
