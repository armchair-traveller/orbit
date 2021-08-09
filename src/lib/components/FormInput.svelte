<!-- Originally uses Formik, but... not the point of this app
You'd use svelte-forms-lib instead if you want forms (Formik-like API). Or look for an alternative form lib like Felte,
or optimally, svelte-use-form. But this app uses very simple validation that has no place using a form lib -->
<script>
  // import FormError from '$lib/components/common/FormError.svelte'
  import Input from '$lib/components/common/Input.svelte'

  export let ariaLabel, name, type, placeholder, required, value
</script>

<Input {ariaLabel} {name} {type} {placeholder} {required} bind:value />
