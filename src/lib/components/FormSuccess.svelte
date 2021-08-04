<script>
  import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  export let text
</script>

<section
  class="text-center p-2 mb-2 rounded border border-green-600 bg-green-100"
>
  <p class="text-green-700 font-bold">
    <Fa icon={faCheckCircle} />
    <span class="ml-1">{text}</span>
  </p>
</section>
