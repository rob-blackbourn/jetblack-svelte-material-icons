<!-- ViewArraySharp -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"/>
</svg>
