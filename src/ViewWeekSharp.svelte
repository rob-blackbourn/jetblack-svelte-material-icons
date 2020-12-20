<!-- ViewWeekSharp -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 5H2v14h5V5zm14 0h-5v14h5V5zm-7 0H9v14h5V5z"/>
</svg>
