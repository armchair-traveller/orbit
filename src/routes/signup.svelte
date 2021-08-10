<script>
  import Card from '$lib/components/common/Card.svelte'
  import Hyperlink from '$lib/components/common/Hyperlink.svelte'
  import Label from '$lib/components/common/Label.svelte'
  import FormInput from '$lib/components/FormInput.svelte'
  import FormSuccess from '$lib/components/FormSuccess.svelte'
  import FormError from '$lib/components/FormError.svelte'
  import GradientBar from '$lib/components/common/GradientBar.svelte'
  import GradientButton from '$lib/components/common/GradientButton.svelte'
  import logo from '$lib/images/logo.png'
  import query from '$lib/util/query'
  import { goto } from '$app/navigation'

  let firstName = '',
    lastName = '',
    email = '',
    password = '',
    signupSuccess,
    signupError,
    loginLoading = false

  const submitCredentials = async () => {
    const credentials = {
      email,
      password,
      firstName,
      lastName,
    }
    try {
      loginLoading = true
      const data = await query('signup', {
        method: 'POST',
        body: credentials,
      })
      signupSuccess = data.message
      signupError = ''
      goto('/a/dashboard')
      console.log(data)
    } catch (error) {
      loginLoading = false
      const data = error.response
      signupError = data.message
      signupSuccess = null
    }
  }
</script>

<section class="w-1/2 h-screen m-auto p-8 sm:pt-10">
  <GradientBar />
  <Card>
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <div>
          <div class="w-32 m-auto mb-6">
            <img src={logo} alt="Logo" />
          </div>
          <h2
            class="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900"
          >
            Sign up for an account
          </h2>
          <p class="text-gray-600 text-center">
            Already have an account?{' '}
            <Hyperlink href="login" text="Log in now" />
          </p>
        </div>

        <form class="mt-8" on:submit|preventDefault={submitCredentials}>
          {#if signupSuccess}
            <FormSuccess text={signupSuccess} />
          {:else if signupError}
            <FormError text={signupError} />
          {/if}

          <input type="hidden" name="remember" value="true" />
          <div>
            <div class="flex">
              <div class="mb-2 mr-2 w-1/2">
                <div class="mb-1">
                  <Label text="First Name" />
                </div>
                <FormInput
                  ariaLabel="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  bind:value={firstName}
                  required
                />
              </div>
              <div class="mb-2 ml-2 w-1/2">
                <div class="mb-1">
                  <Label text="Last Name" />
                </div>
                <FormInput
                  ariaLabel="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  bind:value={lastName}
                  required
                />
              </div>
            </div>
            <div class="mb-2">
              <div class="mb-1">
                <Label text="Email address" />
              </div>
              <FormInput
                ariaLabel="Email address"
                name="email"
                type="email"
                placeholder="Email address"
                bind:value={email}
                required
              />
            </div>
            <div>
              <div class="mb-1">
                <Label text="Password" />
              </div>
              <FormInput
                ariaLabel="Password"
                name="password"
                type="password"
                placeholder="Password"
                bind:value={password}
                required
              />
            </div>
          </div>

          <div class="mt-6">
            <GradientButton
              type="submit"
              text="Sign Up"
              loading={loginLoading}
            />
          </div>
        </form>
      </div>
    </div>
  </Card>
</section>
