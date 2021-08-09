<!-- Admin route -->
<script>
  import { goto } from '$app/navigation'
  import AuthStore from '$lib/stores/AuthStore'
  import PageTitle from '$lib/components/common/PageTitle.svelte'
  import query from '$lib/util/query'
  import { formatCurrency } from '$lib/util'
  import InventoryItemForm from '$lib/components/InventoryItemForm.svelte'
  import DangerButton from '$lib/components/common/DangerButton.svelte'
  import FormError from '$lib/components/FormError.svelte'
  import FormSuccess from '$lib/components/FormSuccess.svelte'
  import { onMount } from 'svelte'

  const isAdmin = AuthStore.isAdmin()
  if (!isAdmin) goto('/')

  let inventory = [],
    successMessage,
    errorMessage

  onMount(() => {
    const getInventory = async () => {
      try {
        const data = await query('inventory', { method: 'GET' })
        inventory = data
      } catch (err) {
        console.log('the err', err)
      }
    }

    getInventory()
  })

  const onSubmit = async (values, resetForm) => {
    try {
      const data = await query('inventory', { method: 'POST', body: values })
      inventory = [...inventory, data.inventoryItem]
      resetForm()
      successMessage = data.message
      errorMessage = null
    } catch (err) {
      const data = err.response
      successMessage = null
      errorMessage = data.message
    }
  }

  const onDelete = async (item) => {
    try {
      if (window.confirm('Are you sure you want to delete this item?')) {
        const data = await query(`inventory/${item._id}`, {
          method: 'DELETE',
        })
        inventory = inventory.filter(
          (item) => item._id !== data.deletedItem._id
        )
      }
    } catch (err) {
      const data = err.response
      errorMessage = data.message
    }
  }
</script>

{#if isAdmin}
  <PageTitle title="Inventory" />
  {#if successMessage}
    <FormSuccess text={successMessage} />
  {:else if errorMessage}
    <FormError text={errorMessage} />
  {/if}

  <div class="mb-4">
    <section class="bg-white p-4 shadow-md rounded-md">
      <p class="font-bold mb-2">New Inventory Item</p>
      <InventoryItemForm {onSubmit} />
    </section>
  </div>
  {#if inventory && inventory.length}
    {#each inventory as item (item._id)}
      <div class="bg-white rounded shadow-md mb-4 p-4">
        <div class="flex">
          <img class="rounded w-32 h-full" src={item.image} alt="inventory" />
          <div class="flex justify-between w-full">
            <div class="flex flex-col ml-4 justify-between">
              <div>
                <p class="font-bold text-xl text-gray-900">
                  {item.name}
                </p>
                <p class="text-sm text-gray-600">
                  {item.itemNumber}
                </p>
              </div>
              <div>
                <p class="text-gray-700 text-xl">
                  {formatCurrency(item.unitPrice)}
                </p>
              </div>
            </div>
            <div class="self-end">
              <DangerButton text="Delete" on:click={() => onDelete(item)} />
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:else}No Inventory Items
  {/if}
{/if}
