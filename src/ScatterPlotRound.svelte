<!-- ScatterPlotRound -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M0 0h24v24H0V0z" fill="none"/><circle cx="7" cy="14" r="3"/><circle cx="11" cy="6" r="3"/><circle cx="16.6" cy="17.6" r="3"/>
</svg>
