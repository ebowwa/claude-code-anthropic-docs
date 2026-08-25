# bun add

> Add packages to your project with Bun's fast package manager

To add a particular package:

```bash terminal icon="terminal"
bun add preact
```

To specify a version, version range, or tag:

```bash terminal icon="terminal"
bun add zod@3.20.0
bun add zod@^3.0.0
bun add zod@latest
```

Bun writes the package to `dependencies` unless you pass `--dev`, `--optional`, or `--peer`. If `package.json` already lists it in another group, Bun updates that entry in place.

## `--dev`

<Note>**Alias** — `--development`, `-d`, `-D`</Note>

To add a package as a dev dependency (`"devDependencies"`):

```bash terminal icon="terminal"
bun add --dev @types/react
bun add -d @types/react
```

## `--optional`

To add a package as an optional dependency (`"optionalDependencies"`):

```bash terminal icon="terminal"
bun add --optional lodash
```

## `--peer`

To add a package as a peer dependency (`"peerDependencies"`):

```bash terminal icon="terminal"
bun add --peer @types/bun
```

Bun installs peer dependencies by default, so no additional `devDependencies` entry is needed.

## `--exact`

<Note>**Alias** — `-E`</Note>

To pin a package to the resolved version, use `--exact`. Bun writes the exact version number to your `package.json` instead of a version range.

```bash terminal icon="terminal"
bun add react --exact
bun add react -E
```

The difference in `package.json`:

```json package.json icon="file-json"
{
  "dependencies": {
    // without --exact
    "react": "^18.2.0", // this matches >= 18.2.0 < 19.0.0

    // with --exact
    "react": "18.2.0" // this matches only 18.2.0 exactly
  }
}
```

To view a complete list of options for this command:

```bash terminal icon="terminal"
bun add --help
```

## `--catalog`

In a workspace, `--catalog` writes the version to the root `package.json` [catalog](/pm/catalogs) and adds `"catalog:"` to the current package. `--catalog=<name>` uses a named catalog (`workspaces.catalogs.<name>`) and writes `"catalog:<name>"`.

```bash terminal icon="terminal"
bun add react --catalog
bun add vitest --catalog=testing
```

```json package.json icon="file-json"
// root package.json
{
  "workspaces": {
    "packages": ["packages/*"],
    "catalog": {
      "react": "^18.2.0" // [!code ++]
    }
  }
}
```

```json packages/app/package.json icon="file-json"
{
  "dependencies": {
    "react": "catalog:" // [!code ++]
  }
}
```

- If the catalog already has an entry, Bun reuses it and writes only `"catalog:"` to the current package. Pass an explicit version (`bun add react@19 --catalog`) to replace the entry — this affects every package that references it.
- If you omit the version and the current `package.json` already has a range (`"react": "^18.2.0"`), Bun catalogs that range.
- A package that already references `"catalog:<name>"` keeps using that catalog.
- Attach the name with `=`: `--catalog=testing`, not `--catalog testing`.
- Bun catalogs tarball and git specifiers under the package's real name. It rejects relative paths and workspace packages.

Even without the flag, `bun add react` (no version) writes `"catalog:"` if the default catalog already lists `react`. Pass a version to write a concrete range instead.

## `--filter`

<Note>**Alias** — `-F`</Note>

In a monorepo, add the package to the matching workspace(s) instead of the current directory's package. See [filtering](/pm/filter) for the pattern syntax. Repeat the flag to combine patterns; `!pattern` excludes.

```bash terminal icon="terminal"
bun add zod --filter api
bun add -d typescript --filter './packages/*'
bun add ./vendor/logger --filter '*'
bun remove zod --filter '*' --filter '!api'
```

- `*` matches every workspace package but not the root. To include the root, name it: `--filter '*' --filter '<root-name>'`.
- If no workspace matches, Bun writes nothing and the command fails.
- Bun resolves local paths from the current directory and rewrites them relative to each selected package.
- Bun updates `bun.lock` for the whole repo but links only the selected workspaces into `node_modules`, as with `bun install --filter`.
- Cannot be combined with `--global`.

## `--global`

<Note>**Alias** — `bun add --global`, `bun add -g`, `bun install --global` and `bun install -g`</Note>

To install a package globally, use the `-g`/`--global` flag. This does not modify the `package.json` of your current project. Use it to install command-line tools.

```bash terminal icon="terminal"
bun add --global cowsay # or `bun add -g cowsay`
cowsay "Bun!"
```

```txt
 ______
< Bun! >
 ------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

<Accordion title="Configuring global installation behavior">

```toml bunfig.toml icon="settings"
[install]
# where `bun add --global` installs packages
globalDir = "~/.bun/install/global"

# where globally-installed package bins are linked
globalBinDir = "~/.bun/bin"
```

</Accordion>

## Trusted dependencies

Unlike other npm clients, Bun does not execute arbitrary lifecycle scripts for installed dependencies, such as `postinstall`. These scripts represent a potential security risk, as they can execute arbitrary code on your machine.

To tell Bun to allow lifecycle scripts for a particular package, add the package to `trustedDependencies` in your package.json.

```json package.json icon="file-json"
{
  "name": "my-app",
  "version": "1.0.0",
  "trustedDependencies": ["my-trusted-package"] // [!code ++]
}
```

Bun reads this field and runs lifecycle scripts for `my-trusted-package`.

## Git dependencies

To add a dependency from a public or private git repository:

```bash terminal icon="terminal"
bun add git@github.com:moment/moment.git
```

<Note>
  To install private repositories, your system needs the appropriate SSH credentials to access the repository.
</Note>

Bun supports a variety of protocols, including [`github`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#github-urls), [`git`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#git-urls-as-dependencies), `git+ssh`, and `git+https`.

```json package.json icon="file-json"
{
  "dependencies": {
    "dayjs": "git+https://github.com/iamkun/dayjs.git",
    "lodash": "git+ssh://github.com/lodash/lodash.git#4.17.21",
    "moment": "git@github.com:moment/moment.git",
    "zod": "github:colinhacks/zod"
  }
}
```

## Tarball dependencies

A package name can correspond to a publicly hosted `.tgz` file. Bun downloads and installs the package from that tarball URL rather than from the package registry.

```sh terminal icon="terminal"
bun add zod@https://registry.npmjs.org/zod/-/zod-3.21.4.tgz
```

`bun add` writes the URL to your `package.json`:

```json package.json icon="file-json"
{
  "dependencies": {
    "zod": "https://registry.npmjs.org/zod/-/zod-3.21.4.tgz"
  }
}
```

A tarball URL can carry credentials, such as `https://user:password@example.com/zod-3.21.4.tgz`. Bun sends them as an `Authorization: Basic` header and requests the URL without them, like npm. The URL, credentials included, is written to `package.json` and to the lockfile.

---

## CLI Usage

```bash
bun add <package> <@version>
```

### Dependency Management

<ParamField path="--production" type="boolean">
  Don't install devDependencies. Alias: <code>-p</code>
</ParamField>

<ParamField path="--omit" type="string">
  Exclude <code>dev</code>, <code>optional</code>, or <code>peer</code> dependencies from install
</ParamField>

<ParamField path="--global" type="boolean">
  Install globally. Alias: <code>-g</code>
</ParamField>

<ParamField path="--dev" type="boolean">
  Add dependency to <code>devDependencies</code>. Alias: <code>-d</code>
</ParamField>

<ParamField path="--optional" type="boolean">
  Add dependency to <code>optionalDependencies</code>
</ParamField>

<ParamField path="--peer" type="boolean">
  Add dependency to <code>peerDependencies</code>
</ParamField>

<ParamField path="--exact" type="boolean">
  Add the exact version instead of the <code>^</code> range. Alias: <code>-E</code>
</ParamField>

<ParamField path="--only-missing" type="boolean">
  Only add dependencies to <code>package.json</code> if they are not already present
</ParamField>

<ParamField path="--catalog" type="string">
  Add the resolved version to the root <code>package.json</code> catalog and depend on it as <code>catalog:</code>;{" "}
  <code>--catalog=NAME</code> targets <code>catalogs.NAME</code>
</ParamField>

<ParamField path="--filter" type="string">
  Add the package(s) to the matching workspaces instead of the current package. Alias: <code>-F</code>
</ParamField>

### Project Files & Lockfiles

<ParamField path="--yarn" type="boolean">
  Write a <code>yarn.lock</code> file (yarn v1). Alias: <code>-y</code>
</ParamField>

<ParamField path="--no-save" type="boolean">
  Don't update <code>package.json</code> or save a lockfile
</ParamField>

<ParamField path="--save" type="boolean" default="true">
  Save to <code>package.json</code>
</ParamField>

<ParamField path="--frozen-lockfile" type="boolean">
  Disallow changes to lockfile
</ParamField>

<ParamField path="--trust" type="boolean">
  Add to <code>trustedDependencies</code> in the project's <code>package.json</code> and install the package(s)
</ParamField>

<ParamField path="--save-text-lockfile" type="boolean">
  Save a text-based lockfile
</ParamField>

<ParamField path="--lockfile-only" type="boolean">
  Generate a lockfile without installing dependencies
</ParamField>

### Installation Control

<ParamField path="--dry-run" type="boolean">
  Resolve the packages but don't install them, update <code>package.json</code>, or save a lockfile (the project's own
  lifecycle scripts still run)
</ParamField>

<ParamField path="--force" type="boolean">
  Always request the latest versions from the registry &amp; reinstall all dependencies. Alias: <code>-f</code>
</ParamField>

<ParamField path="--no-verify" type="boolean">
  Skip verifying integrity of newly downloaded packages
</ParamField>

<ParamField path="--ignore-scripts" type="boolean">
  Skip lifecycle scripts for all packages, including the project's <code>package.json</code> and trusted dependencies
</ParamField>

<ParamField path="--analyze" type="boolean">
  Recursively analyze &amp; install dependencies of files passed as arguments (using Bun's bundler). Alias:{" "}
  <code>-a</code>
</ParamField>

### Network & Registry

<ParamField path="--ca" type="string">
  Provide a Certificate Authority signing certificate
</ParamField>

<ParamField path="--cafile" type="string">
  Same as <code>--ca</code>, but as a file path to the certificate
</ParamField>

<ParamField path="--registry" type="string">
  Use a specific registry by default, overriding <code>.npmrc</code>, <code>bunfig.toml</code>, and environment
  variables
</ParamField>

<ParamField path="--network-concurrency" type="number" default="48">
  Maximum number of concurrent network requests
</ParamField>

### Performance &amp; Resource

<ParamField path="--backend" type="string">
  Platform-specific optimizations for installing dependencies. Possible values: <code>clonefile</code> (default on
  macOS), <code>hardlink</code> (default on Linux and Windows), <code>symlink</code>, <code>copyfile</code>
</ParamField>

<ParamField path="--concurrent-scripts" type="number">
  Maximum number of concurrent jobs for lifecycle scripts (default: 2x CPU cores)
</ParamField>

### Caching

<ParamField path="--cache-dir" type="string">
  Store &amp; load cached data from a specific directory path
</ParamField>

<ParamField path="--no-cache" type="boolean">
  Ignore manifest cache entirely
</ParamField>

### Output &amp; Logging

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

### Global Configuration &amp; Context

<ParamField path="--config" type="string">
  Specify path to config file (<code>bunfig.toml</code>). Alias: <code>-c</code>
</ParamField>

<ParamField path="--cwd" type="string">
  Set a specific current working directory
</ParamField>

### Help

<ParamField path="--help" type="boolean">
  Print this help menu. Alias: <code>-h</code>
</ParamField>
