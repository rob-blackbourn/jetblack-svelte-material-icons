<!-- ArrowRight -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M10 17l5-5-5-5v10z"/><path d="M0 24V0h24v24H0z" fill="none"/>
</svg>
