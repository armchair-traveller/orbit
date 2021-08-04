<script>
  import classNames from 'classnames'
  export let href, text, size
  const classes = classNames({
    'flex justify-center rounded-full py-2 px-6 bg-gradient focus:outline-none shadow-lg text-white': true,
    'text-xl': size === 'lg',
  })
</script>

<a {href} class={classes}>
  {text}
</a>
