<!-- be aware of where it uses onSubmit, you may have to do some data massaging if it's not correct -->
<script>
  import Label from '$lib/components/common/Label.svelte'
  import FormInput from './FormInput.svelte'
  import GradientButton from './common/GradientButton.svelte'
  export let onSubmit
  let name, itemNumber, unitPrice
</script>

<!-- this component also required formik and yup for validation... we're just going to assume all inputs are valid -->

<form
  on:submit|preventDefault={() =>
    onSubmit({ name, itemNumber, unitPrice }, function resetForm() {
      name = ''
      itemNumber = ''
      unitPrice = ''
    })}
>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
      <div class="mb-1">
        <Label text="Item Name" />
      </div>
      <FormInput
        ariaLabel="Name"
        bind:value={name}
        required
        name="name"
        type="text"
        placeholder="Item Name"
      />
    </div>
    <div class="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
      <div class="mb-1">
        <Label text="Item Number" />
      </div>
      <FormInput
        ariaLabel="Item Number"
        bind:value={itemNumber}
        required
        name="itemNumber"
        type="text"
        placeholder="Item Number"
      />
    </div>
    <div class="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
      <div class="mb-1">
        <Label text="Unit Price" />
      </div>
      <FormInput
        ariaLabel="Unit Price"
        bind:value={unitPrice}
        required
        name="unitPrice"
        type="number"
        placeholder="Unit Price"
      />
    </div>
  </div>
  <div class="flex">
    <div class="w-full sm:w-1/4 mt-4">
      <GradientButton type="submit" text="Submit" />
    </div>
  </div>
</form>
