<script>
  import PageTitle from '$lib/components/common/PageTitle.svelte'
  import Card from '$lib/components/common/Card.svelte'
  import GradientButton from '$lib/components/common/GradientButton.svelte'
  import query from '$lib/util/query'
  import FormError from '$lib/components/FormError.svelte'
  import FormSuccess from '$lib/components/FormSuccess.svelte'
  import { onMount } from 'svelte'

  let bio, successMessage, errorMessage

  onMount(() => {
    const getBio = async () => {
      try {
        const data = await query('bio', {
          method: 'GET',
        })
        bio = data.bio
      } catch (err) {
        console.log(err)
      }
    }
    getBio()
  })

  const saveBio = async (bio) => {
    try {
      const data = await query('bio', {
        method: 'PATCH',
        body: bio,
      })
      errorMessage = null
      successMessage = data.message
    } catch (err) {
      const data = err.response
      successMessage = null
      errorMessage = data.message
    }
  }
</script>

<PageTitle title="Settings" />
<Card>
  <h2 class="font-bold mb-2">Fill Out Your Bio</h2>
  {#if successMessage}<FormSuccess
      text={successMessage}
    />{:else if errorMessage}<FormError text={errorMessage} />{/if}

  <form
    on:submit={() =>
      saveBio({
        bio,
      })}
  >
    <textarea
      class="border border-gray-300 rounded p-1 w-full h-56 mb-2"
      name="bio"
      placeholder="Your bio here"
      bind:value={bio}
    />
    <GradientButton text="Save" type="submit" />
  </form>
</Card>
