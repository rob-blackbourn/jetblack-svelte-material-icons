<!-- CropSquareSharp -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4v16h16V4zm-2 14H6V6h12v12z"/>
</svg>
