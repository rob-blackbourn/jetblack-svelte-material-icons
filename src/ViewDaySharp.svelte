<!-- ViewDaySharp -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 21h19v-3H2v3zM21 8H2v8h19V8zM2 3v3h19V3H2z"/>
</svg>
