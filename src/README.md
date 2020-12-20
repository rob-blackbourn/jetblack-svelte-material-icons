# @jetblack/svelte-material-icons

Icons from Material Design imported as svelte components.

## Installation

```bash
npm install --save @jetblack/svelte-material-icons
```

## Getting Started

```html
<script>
  	import Home from '@jetblack/svelte-material-icons/Home.svelte'
</script>

<div>
    <Home />
</div>
```

## Usage

Here is how an icon component is implemented.

```html
<!-- Home -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

<svg {width} {height} viewBox={viewBox.join(" ")} {...$$restProps}>
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>
```

The icons have a native resolution of 24x24 which can be altered by the
`width` and `height` properties. For example:

```html
<script>
  	import Home from '@jetblack/svelte-material-icons/Home.svelte'
</script>

<div>
    <Home width={48} height={48} />
</div>
```

Other `svg` properties will be passed on. For example:

```html
<script>
  	import Home from '@jetblack/svelte-material-icons/Home.svelte'
</script>

<div>
    <Home stroke="red" fill="blue" />
</div>
```

I don't have a good solution for classes at the moment. Class names will be
propagated to the component, so global styles will work.
