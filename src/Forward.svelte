<!-- Forward -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
</svg>
