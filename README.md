# blank-app


perf notes

- ember-fetch is not compatible with vite.
  ```
  [plugin embroider-esbuild-resolver]
  
     node_modules/.embroider/rewritten-packages/ember-fetch.ccb5ad45/node_modules/ember-fetch/_fastboot_/instance-initializers/setup-fetch.js:1:30:
       1 │ import { setupFastboot } from 'fetch';
         ╵                               ~~~~~~~
  
  ```
  there is no `fetch` module -- see plan to fix here:
  https://github.com/ember-cli/ember-fetch/issues/738


<details><summary>default blueprint(~ish)</summary>

Broccoli (legacy)
```bash
LEGACY_BUILD=true pnpm start

# initial:
# warm:
# rebuild:
```

Embroider + Webpack
```bash
pnpm start

# initial: 5s
# warm: 3s
# rebuild: 61ms to 154ms
```

Embroider + Vite
```bash
VITE=true pnpm start

# COMPAT:
#   initial: ~1768ms
#   warm: ~525ms
#   rebuild: 16ms to 30ms
# VITE:
#   initial: 447ms
#   warm: same
#   rebuild:
# Browser:
#   initial:
#   warm:
#   rebuild:
```

</details>
