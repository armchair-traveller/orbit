<script>
  import classNames from 'classnames'
  import Fa from 'svelte-fa'
  import {
    faChartLine,
    faAddressCard,
    faChartPie,
    faCogs,
    faDoorOpen,
  } from '@fortawesome/free-solid-svg-icons'
  import logo from '$lib/images/logo.png'
  import AuthStore from '$lib/stores/AuthStore'
  import { page } from '$app/stores'
  const navItems = [
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: faChartLine,
      allowedRoles: ['user', 'admin'],
    },
    {
      label: 'Inventory',
      path: 'inventory',
      icon: faChartPie,
      allowedRoles: ['admin'],
    },
    {
      label: 'Account',
      path: 'account',
      icon: faAddressCard,
      allowedRoles: ['user', 'admin'],
    },
    {
      label: 'Settings',
      path: 'settings',
      icon: faCogs,
      allowedRoles: ['user', 'admin'],
    },
    {
      label: 'Users',
      path: 'users',
      icon: faDoorOpen,
      allowedRoles: ['admin'],
    },
  ]
</script>

<section class="h-screen">
  <div class="w-16 sm:w-24 m-auto">
    <img src={logo} rel="logo" alt="Logo" />
  </div>
  <div class="mt-20">
    {#each navItems as navItem, i (i)}
      <div>
        {#if navItem.allowedRoles.includes($AuthStore.userInfo)}
          (
          <a
            href={navItem.path}
            class={classNames({
              'px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex': true,
              'text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100':
                $page.path != `/a/${navItem.path}`,
              'bg-gradient text-gray-100 shadow-lg':
                $page.path == `/a/${navItem.path}`,
            })}
          >
            <div class="flex items-center">
              <div class="mr-0 sm:mr-4">
                <Fa icon={navItem.icon} />
              </div>
              <span class="hidden sm:block">{navItem.label}</span>
            </div>
          </a>
        {/if}
      </div>
    {/each}
  </div>
</section>
