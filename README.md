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
- Observations:
  - the test-dependencies have a noticable impact on build speed.
      - upgrading qunit-dom from v2 to v3 appears to have shaved ~ 0.18s off the build (webpack)
      - `@ember/test-helpers` costs the broccoli build 1702ms -- as this is moved to a v2, that should approach 0
      - improves the "compat" build with vite too.
        - Once all addons are using the "v2 format", we can get rid of the "compat build" entirely.
  - with a _nearly_ default blueprint, the legacy build is faster than embroider + webpack -- I have a hunch this has to do with embroider being a broccoli plugin and webpack being inside there (as well as re-writing the app (in node_modules/.embroider) to fix ecosystem mishaps). I expect the inversion of control coming in the next embroider release should fix all this.

<details><summary>default blueprint(~ish)</summary>

Broccoli (legacy)
```bash
LEGACY_BUILD=true pnpm start

# initial: 4.2s
# warm: 1.3s
# rebuild: 75ms
```

Embroider + Webpack
```bash
pnpm start

# initial: 4.8s
# warm: 2.8s
# rebuild: 61ms to 154ms
```

Embroider + Vite
```bash
VITE=true pnpm start

# COMPAT:
#   initial: ~500ms
#   warm: ~501ms 
#   rebuild: 16ms to 30ms
# VITE:
#   initial: 376ms 
#   warm: same
#   rebuild:
# Browser:
#   initial:
#   warm:
#   rebuild:
```

</details>
