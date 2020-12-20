<!-- ViewCarousel -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"/>
</svg>
