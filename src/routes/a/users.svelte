<script>
  import PageTitle from '$lib/components/common/PageTitle.svelte'
  import query from '$lib/util/query'
  import Card from '$lib/components/common/Card.svelte'
  import defaultAvatar from '$lib/images/defaultAvatar.png'
  import { onMount } from 'svelte'

  let users = []

  onMount(() => {
    const getUsers = async () => {
      try {
        const data = await query.get('users')
        users = data.users
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  })
</script>

<PageTitle title="Users" />
<div class="flex flex-col">
  {#if !!users.length}
    {#each users as user (user._id)}
      <div class="m-2">
        <Card>
          <div class="flex">
            <div class="w-24">
              <img src={user.avatar || defaultAvatar} alt="avatar" />
            </div>

            <div>
              <p class="font-bold text-lg">
                {user.firstName}
                {user.lastName}
              </p>

              <div class="mt-2">
                <p class="mt-2 uppercase font-bold text-gray-500 text-xs">
                  Bio
                </p>
                {#if user.bio}
                  <div>{@html user.bio}</div>
                {:else}
                  <p class="text-gray-500 italic">No bio set</p>
                {/if}
              </div>
            </div>
          </div>
        </Card>
      </div>
    {/each}
  {/if}
</div>
