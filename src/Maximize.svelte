<!-- Maximize -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 3h18v2H3z"/>
</svg>
