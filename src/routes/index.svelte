<script>
  import GradientLink from '$lib/components/common/GradientLink.svelte'
  import GradientBar from '$lib/components/common/GradientBar.svelte'
  import logo from '$lib/images/logo.png'
  import AuthStore from '$lib/stores/AuthStore'
</script>

<GradientBar />
<div class="w-full top-0 bg-white px-10 py-5">
  <div class="flex justify-between">
    <img class="w-32 h-full" src={logo} alt="Logo" />
    <div class="flex items-center">
      <a href="/signup" class="text-blue-700 mr-6"> Sign Up </a>
      <GradientLink
        href={AuthStore.isAuthenticated() ? '/a/dashboard' : '/login'}
        text="Log In"
      />
    </div>
  </div>
</div>
<div class="h-full bg-blue-900">
  <div class="opacity-30">
    <img
      class="object-fill w-full"
      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
      alt="Home"
    />
  </div>
  <div class="absolute left-0 top-0 mt-32 lg:mt-48 px-12 nato-sans">
    <div class="w-full lg:w-2/3">
      <h1
        class="text-gray-200 text-2xl lg:text-6xl sm:text-5xl font-bold leading-tight"
      >
        Sales Data Management That Works For Your Team
      </h1>
      <h2 class="text-gray-400 text-md sm:text-2xl sm:mt-10 mt-4">
        Take the pain out of managing your sales data
      </h2>
      <div class="mt-4 sm:mt-10 w-48">
        <GradientLink
          text="Get Started"
          size="lg"
          href={AuthStore.isAuthenticated() ? '/a/dashboard' : '/login'}
        />
      </div>
    </div>
  </div>
</div>
