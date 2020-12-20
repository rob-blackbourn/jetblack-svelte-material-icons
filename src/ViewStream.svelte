<!-- ViewStream -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"/>
</svg>
