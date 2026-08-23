# bun update

> Update dependencies to the newest versions their ranges allow

<Note>To upgrade your Bun CLI version, see [`bun upgrade`](/installation#upgrading).</Note>

`bun update` (alias `bun up`) updates every dependency, direct and transitive, to the newest version allowed by the ranges that request it. It then rewrites `package.json` and `bun.lock`. To ignore your declared ranges, use [`--latest`](#--latest).

```sh terminal icon="terminal"
bun update
```

To update specific packages, pass their names. Names can be glob patterns, and `!` excludes:

```sh terminal icon="terminal"
bun update zod
bun update jquery@3            # move the package.json entry to the newest 3.x
bun update '@types/*'
bun update '@babel/*' '!@babel/core'
```

`bun update <package>` updates `<package>` everywhere it appears in `bun.lock` and leaves everything else alone. This works for transitive dependencies too — `bun update caniuse-lite` picks up a nested fix without adding it to your `package.json`. A name that isn't in `bun.lock` is an error.

Updated packages appear in the install summary as `↑ name old → new`, with `(v3.0.0 available)` when a newer major is out of range. Use `--dry-run` to preview.

### How `package.json` is rewritten

- `^1.1.0` → `^1.2.0`, `~1.1.0` → `~1.1.5`. Bun preserves the operator. With [`install.exact`](/runtime/bunfig#install-exact) or `--exact`, Bun writes an exact version instead.
- Exact pins, dist-tags (`"latest"`, `"next"`), and other range forms (`*`, `1.x`, `>=1.0.0`) are left as written; only `bun.lock` moves. `--latest` rewrites them.
- Bun never rewrites `catalog:` references; it updates the catalog entry in the root `package.json` instead.
- `--no-save` updates `node_modules` only, leaving `package.json` and `bun.lock` untouched.

### What is held back

- Bun never widens ranges. A package that depends on `foo@^1.0.0` never gets `foo@2.x`.
- Versions in `patchedDependencies` stay put as long as their range allows. Bun reports them as `kept name@version (patched, v1.2.3 available)`. `--latest` and [`bun audit fix`](/pm/cli/audit#bun-audit-fix) do move them; re-create the patch with [`bun patch`](/pm/cli/patch) afterwards.
- If a registry request for a transitive package fails, that package keeps its locked version and Bun prints a warning. A failed request for a direct dependency is an error.

## `--interactive`

Use the `--interactive` flag to choose which packages to update:

```sh terminal icon="terminal"
bun update --interactive
bun update -i
```

`--interactive` opens a terminal interface listing every outdated direct dependency. Bun updates the packages you select as if you had run `bun update <name> ...`; everything else keeps its locked version.

### Interactive Interface

The interface displays packages grouped by dependency type:

```txt
? Select packages to update - Space to toggle, Enter to confirm, a to select all, n to select none, i to invert, l to toggle latest

  dependencies                Current  Target   Latest
    □ react                   17.0.2   18.2.0   18.3.1
    □ lodash                  4.17.20  4.17.21  4.17.21

  devDependencies             Current  Target   Latest
    □ typescript              4.8.0    5.0.0    5.3.3
    □ @types/node             16.11.7  18.0.0   20.11.5

  optionalDependencies        Current  Target   Latest
    □ some-optional-package   1.0.0    1.1.0    1.2.0
```

**Sections:**

- Packages are grouped under section headers: `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`
- Each section shows column headers aligned with the package data

**Columns:**

- **Package**: Package name (may have a suffix such as ` dev`, ` peer`, or ` optional`)
- **Current**: Currently installed version
- **Target**: Version that would be installed (respects semver constraints)
- **Latest**: Latest available version

### Keyboard Controls

**Selection:**

- **Space**: Toggle package selection
- **Enter**: Confirm selections and update
- **a/A**: Select all packages
- **n/N**: Select none
- **i/I**: Invert selection

**Navigation:**

- **↑/↓ Arrow keys** or **j/k**: Move cursor
- **l/L**: Toggle between target and latest version for current package

**Exit:**

- **Ctrl+C** or **Ctrl+D**: Cancel without updating

### Visual Indicators

- **■** Selected packages (will be updated)
- **□** Unselected packages
- **❯** Current cursor position
- **Colors**: Red (major), yellow (minor), green (patch) version changes
- **Underlined**: Currently selected update target

### Package Grouping

Packages are organized in sections by dependency type:

- **dependencies** - Regular runtime dependencies
- **devDependencies** - Development dependencies
- **peerDependencies** - Peer dependencies
- **optionalDependencies** - Optional dependencies

Within each section, individual packages may have a suffix (` dev`, ` peer`, ` optional`).

## `--recursive` and `--filter`

In a monorepo, `bun update` only rewrites the `package.json` of the workspace you run it in. From the root, it still updates the transitive dependencies of every workspace in `bun.lock`.

- `--recursive` (`-r`) updates every workspace's `package.json`.
- `--filter <pattern>` (`-F`) updates only the matching workspaces, using the [filter syntax](/pm/filter). As with `bun install --filter`, Bun links only the selected workspaces afterwards.

Both combine with package names, `--latest`, `--dry-run`, and `--interactive` (which adds a "Workspace" column).

```sh terminal icon="terminal"
bun update --recursive
bun update --filter './packages/*'
bun update -i -r
bun update zod -r
bun update zod --filter '...^ui'
```

## `--dev`, `--prod`, `--no-optional`

Restrict which `package.json` entries Bun updates:

- `--dev` (`-D`) updates `devDependencies` only.
- `--prod` (`-P`) updates `dependencies` and `optionalDependencies` only.
- `--no-optional` skips `optionalDependencies`.

They combine with names, patterns, `--latest`, and `--interactive`.

These flags only select what to update — `bun update --prod` still installs `devDependencies`.

```sh terminal icon="terminal"
bun update --dev
bun update --prod --latest
bun update -D '@types/*'
bun update -i --prod
```

## `--global`

`bun update -g` updates packages installed with `bun add -g`:

```sh terminal icon="terminal"
bun update -g
bun update -g typescript
```

## `--latest`

By default, `bun update` updates each dependency to the latest version that satisfies the version range in your `package.json`.

To update direct dependencies to the latest version regardless of the declared range, use `--latest` (`-L`). Bun rewrites the `package.json` entry to a range of the same style on the new version. Transitive dependencies still respect the ranges their dependents declare. Bun does not downgrade a dependency that is already ahead of `latest` (e.g. a prerelease).

```sh terminal icon="terminal"
bun update --latest
bun update -L
```

In interactive mode, press **l** to toggle a package between its target version (respecting semver) and the latest version.

For example, with the following `package.json`:

```json package.json icon="file-json"
{
  "dependencies": {
    "react": "^17.0.2"
  }
}
```

- `bun update` would update to a version that matches `17.x`.
- `bun update --latest` would update to a version that matches `18.x` or later.

---

## CLI Usage

```bash terminal icon="terminal"
bun update [<name>[@<version>] | <pattern>]...
bun up
```

### Update Strategy

<ParamField path="--force" type="boolean">
  Always request the latest versions from the registry &amp; reinstall all dependencies. Alias: <code>-f</code>
</ParamField>

<ParamField path="--latest" type="boolean">
  Update packages to their latest versions. Alias: <code>-L</code>
</ParamField>

### Dependency Scope

<ParamField path="--dev" type="boolean">
  Only update <code>devDependencies</code>. Alias: <code>-D</code>
</ParamField>

<ParamField path="--prod" type="boolean">
  Only update <code>dependencies</code> and <code>optionalDependencies</code>. Aliases: <code>-P</code>,{" "}
  <code>--production</code>
</ParamField>

<ParamField path="--no-optional" type="boolean">
  Don't update <code>optionalDependencies</code>
</ParamField>

<ParamField path="--global" type="boolean">
  Install globally. Alias: <code>-g</code>
</ParamField>

<ParamField path="--omit" type="string">
  Exclude <code>dev</code>, <code>optional</code>, or <code>peer</code> dependencies from install
</ParamField>

### Project File Management

<ParamField path="--yarn" type="boolean">
  Write a <code>yarn.lock</code> file (yarn v1). Alias: <code>-y</code>
</ParamField>

<ParamField path="--no-save" type="boolean">
  Don't update <code>package.json</code> or save a lockfile
</ParamField>

<ParamField path="--save" type="boolean" default="true">
  Save to <code>package.json</code> (true by default)
</ParamField>

<ParamField path="--frozen-lockfile" type="boolean">
  Disallow changes to lockfile
</ParamField>

<ParamField path="--save-text-lockfile" type="boolean">
  Save a text-based lockfile
</ParamField>

<ParamField path="--lockfile-only" type="boolean">
  Generate a lockfile without installing dependencies
</ParamField>

### Network & Registry

<ParamField path="--ca" type="string">
  Provide a Certificate Authority signing certificate
</ParamField>

<ParamField path="--cafile" type="string">
  Same as <code>--ca</code>, but as a file path to the certificate
</ParamField>

<ParamField path="--registry" type="string">
  Use a specific registry by default, overriding <code>.npmrc</code>, <code>bunfig.toml</code> and environment variables
</ParamField>

<ParamField path="--network-concurrency" type="number" default="48">
  Maximum number of concurrent network requests (default 48)
</ParamField>

### Caching

<ParamField path="--cache-dir" type="string">
  Store &amp; load cached data from a specific directory path
</ParamField>

<ParamField path="--no-cache" type="boolean">
  Ignore manifest cache entirely
</ParamField>

### Output & Logging

<ParamField path="--silent" type="boolean">
  Don't log anything
</ParamField>

<ParamField path="--verbose" type="boolean">
  Excessively verbose logging
</ParamField>

<ParamField path="--no-progress" type="boolean">
  Disable the progress bar
</ParamField>

<ParamField path="--no-summary" type="boolean">
  Don't print a summary
</ParamField>

### Script Execution

<ParamField path="--ignore-scripts" type="boolean">
  Skip lifecycle scripts for all packages, including the project's <code>package.json</code> and trusted dependencies
</ParamField>

<ParamField path="--concurrent-scripts" type="number">
  Maximum number of concurrent jobs for lifecycle scripts (default: 2x CPU cores)
</ParamField>

### Installation Controls

<ParamField path="--no-verify" type="boolean">
  Skip verifying integrity of newly downloaded packages
</ParamField>

<ParamField path="--trust" type="boolean">
  Add to <code>trustedDependencies</code> in the project's <code>package.json</code> and install the package(s)
</ParamField>

<ParamField path="--backend" type="string">
  Platform-specific optimizations for installing dependencies. Possible values: <code>clonefile</code> (default on
  macOS), <code>hardlink</code> (default on Linux and Windows), <code>symlink</code>, <code>copyfile</code>
</ParamField>

### General & Environment

<ParamField path="--config" type="string">
  Specify path to config file (<code>bunfig.toml</code>). Alias: <code>-c</code>
</ParamField>

<ParamField path="--dry-run" type="boolean">
  Resolve updates but don't install packages, update <code>package.json</code>, or save a lockfile (the project's own
  lifecycle scripts still run)
</ParamField>

<ParamField path="--cwd" type="string">
  Set a specific cwd
</ParamField>

<ParamField path="--help" type="boolean">
  Print this help menu. Alias: <code>-h</code>
</ParamField>
