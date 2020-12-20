<!-- ControlCamera -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M15.54 5.54L13.77 7.3 12 5.54 10.23 7.3 8.46 5.54 12 2zm2.92 10l-1.76-1.77L18.46 12l-1.76-1.77 1.76-1.77L22 12zm-10 2.92l1.77-1.76L12 18.46l1.77-1.76 1.77 1.76L12 22zm-2.92-10l1.76 1.77L5.54 12l1.76 1.77-1.76 1.77L2 12z"/><circle cx="12" cy="12" r="3"/>
</svg>
