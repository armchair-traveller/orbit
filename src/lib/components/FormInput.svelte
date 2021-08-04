<!-- Originally uses Formik, but... not the point of this app -->
<script>
  // import FormError from '$lib/components/common/FormError'
  import Input from '$lib/components/common/Input'

  export let ariaLabel, name, type, placeholder, required, value
</script>

<Input {ariaLabel} {name} {type} {placeholder} {required} bind:value />

<!--
  const FormInput = ({ ariaLabel, name, type, placeholder }) => {
    const [field, meta] = useField(name)
    return (
      <>
      <Input
      field={field}
      ariaLabel={ariaLabel}
      name={field.name}
      type={type}
      placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
        ) : null}
        </>
        )
      }
      
    -->
