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

  let loginSuccess,
    loginError,
    loginLoading = false
  let email = '',
    password = ''

  const submitCredentials = async () => {
    const credentials = {
      email,
      password,
    }
    try {
      loginLoading = true
    } catch (error) {
      loginLoading = false
      const { data } = error.response
      loginError = data.message
      loginSuccess = null
    }
  }
</script>

<section class="w-full sm:w-1/2 h-screen m-auto p-8 sm:pt-10">
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
            Log in to your account
          </h2>
          <p class="text-gray-600 text-center">
            Don't have an account?{' '}
            <Hyperlink to="signup" text="Sign up now" />
          </p>
        </div>

        <form on:submit|preventDefault={submitCredentials} class="mt-8">
          {#if loginSuccess}
            <FormSuccess text={loginSuccess} />
          {:else if loginError}
            <FormError text={loginError} />
          {/if}

          <div>
            <div class="mb-2">
              <div class="mb-1">
                <Label text="Email" />
              </div>
              <FormInput
                ariaLabel="Email"
                name="email"
                type="email"
                placeholder="Email"
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
                required
              />
            </div>
          </div>

          <div class="mt-6 flex justify-start">
            <div class="text-sm leading-5">
              <Hyperlink href="forgot-password" text="Forgot your password?" />
            </div>
          </div>

          <div class="mt-6">
            <GradientButton
              type="submit"
              text="Log In"
              loading={loginLoading}
            />
          </div>
        </form>
      </div>
    </div>
  </Card>
</section>
