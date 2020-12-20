const fetch = require("node-fetch");
const { retry, sanitizeName } = require("./utils");
const { pascalCase, paramCase } = require("change-case");
const fse = require("fs-extra");

const familyMap = {
  "Material Icons": "",
  "Material Icons Outlined": "outlined",
  "Material Icons Round": "round",
  "Material Icons Sharp": "sharp",
  "Material Icons Two Tone": "twotone",
};

function makeIconUrl(name, familySuffix, version, size) {
  const baseUrl = "https://fonts.gstatic.com/s/i/materialicons";
  return `${baseUrl}${familySuffix}/${name}/v${version}/${size}px.svg`;
}

function makeIconName(name, familySuffix) {
  const fullName = `${name.replace(/_/g, " ")}${
    familySuffix === "" ? "" : " " + familySuffix
  }`;
  const iconName = pascalCase(fullName);
  return iconName;
}

function enrichMetadata(metadata, size) {
  return metadata.icons
    .filter((icon) => icon.sizes_px.includes(24))
    .map((icon) =>
      metadata.families
        .filter(
          (family) =>
            family in familyMap && !icon.unsupported_families.includes(family)
        )
        .map((family) => ({
          categories: icon.categories,
          name: icon.name,
          tags: icon.tags,
          version: icon.version,
          size,
          family,
          url: makeIconUrl(icon.name, familyMap[family], icon.version, size),
          originalName: makeIconName(icon.name, familyMap[family]),
          name: sanitizeName(makeIconName(icon.name, familyMap[family])),
        }))
    )
    .flat();
}

async function downloadIcon(url) {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`status ${response.status}`);
  }
  const text = await response.text();
  return text;
}

async function getIconMetadata() {
  const response = await fetch("https://fonts.google.com/metadata/icons");
  const text = await response.text();
  const data = JSON.parse(text.replace(")]}'", ""));
  return data;
}

function prepareSvelte(name, originalName, svg) {
  const title = name + (name === originalName ? "" : ` (${originalName})`);
  return (
    `<!-- ${title} -->
<script>
  export let width = 24, height = 24, viewBox = [0, 0, 24, 24]
</script>

` +
    svg
      .replace(' xmlns="http://www.w3.org/2000/svg"', "")
      .replace('<path d="M0 0h24v24H0z" fill="none"/>', "")
      .replace(/\s+(width|height)="\d+"/g, "")
      .replace(/\s+viewBox="\d+\s+\d+\s+\d+\s+\d+"/g, "")
      .replace("><path", ">\n  <path")
      .replace("></svg", ">\n</svg")
      .replace(
        "<svg",
        '<svg {width} {height} viewBox={viewBox.join(" ")} {...$$$$restProps}'
      ) +
    "\n"
  );
}

async function writeNestedIndices(nestedIndices, folderName) {
  await fse.mkdir(`./src/${folderName}`);
  for (const [groupName, groupValues] of Object.entries(nestedIndices)) {
    await fse.mkdir(`./src/${folderName}/${groupName}`);
    const imports = Object.keys(groupValues).map(
      (name) => `import ${name} from '../../${name}.svelte'`
    );
    const index = `${imports.join("\n")}
  
export {
  ${Object.keys(groupValues).join(",\n\t")}
}
`;
    const indexFileName = `./src/${folderName}/${groupName}/index.js`;
    console.log("Writing: " + indexFileName);
    await fse.writeFile(indexFileName, index);

    for (const name of Object.keys(groupValues)) {
      const text = `import ${name} from '../../${name}.svelte'
  
export default ${name}
`;
      const componentFileName = `./src/${folderName}/${groupName}/${name}.js`
      console.log('Writing: ' + componentFileName)
      await fse.writeFile(componentFileName, text);
    }
  }
}

async function writeIndex(iconIndex) {
  const imports = Object.keys(iconIndex).map(
    (name) => `import ${name} from './${name}.svelte'`
  );
  const index = `${imports.join("\n")}

export {
  ${Object.keys(iconIndex).join(",\n\t")}
}
`;
  const fileName = `./src/index.js`;
  console.log("Writing: " + fileName);
  await fse.writeFile(`./src/index.js`, index);
}

async function writeIcon(iconMetadata) {
  const svg = await retry(() => downloadIcon(iconMetadata.url));
  const svelte = prepareSvelte(
    iconMetadata.name,
    iconMetadata.originalName,
    svg
  );
  const fileName = `./src/${iconMetadata.name}.svelte`;
  console.log("Writing: " + fileName);
  await fse.writeFile(fileName, svelte);
}

async function run() {
  const iconMetadata = await getIconMetadata();
  const enrichedIconMetaData = enrichMetadata(iconMetadata, 24);
  await fse.remove("./src");
  await fse.mkdir("./src");
  const iconIndex = {};
  const categoryIndex = {};
  const tagIndex = {};
  // let count = 0
  for (const iconMetadata of enrichedIconMetaData) {
    // if (++count > 100) {
    //     break
    // }

    await writeIcon(iconMetadata);

    iconIndex[iconMetadata.name] = iconMetadata;

    for (const category of iconMetadata.categories) {
      if (!(category in categoryIndex)) {
        categoryIndex[category] = {};
      }
      categoryIndex[category][iconMetadata.name] = iconMetadata;
    }

    for (const rawTag of iconMetadata.tags.filter(
      (tag) =>
        tag !== iconMetadata.originalName &&
        tag.length > 1 &&
        tag.match(/^[a-zA-Z]+.*$/g)
    )) {
      const tag = paramCase(rawTag.toLowerCase());
      if (!(tag in tagIndex)) {
        tagIndex[tag] = {};
      }
      tagIndex[tag][iconMetadata.name] = iconMetadata;
    }
  }

  await writeIndex(iconIndex);
  await writeNestedIndices(categoryIndex, "categories");

  console.log("Hello, World!");
}

run();
