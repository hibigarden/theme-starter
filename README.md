# Hibi theme starter

This repository is a starting point for [Hibi](https://hibi.garden) themes. `themes/hello-theme` is a ready-to-install theme with a warm light color scheme and a matching dark one.

A theme contains color data only. It has no code, so you do not need a build step or any dependencies. To make an extension that adds commands or other features, start from the [addon starter](https://github.com/hibigarden/addon-starter) instead.

## Start a new theme

Choose **Use this template** on GitHub to create your own repository, then clone it. You need Node.js 22.18 or later to run the checks.

```sh
npm run check
npm test
```

`npm run check` finds the theme the way Hibi does and reports common mistakes, such as a missing readme, an unknown color name, an invalid color, or a file type that Hibi will not install. `npm test` runs the starter's own tests. Hibi's installer has the final say, so also install your theme in Hibi before you share it.

## Try it in Hibi

Themes from this starter are unsigned. Before you install one, turn on **Allow unsigned addons** under **Settings → Addon Manager → Security**.

1. Run **Install addon…** from Hibi's command palette.
2. Select this repository's folder, or the `themes/hello-theme` folder.
3. Review the theme and install it. Hibi installs addons turned off.
4. Enable it in **Settings → Addons**.
5. Choose **Hello light** or **Hello dark** in **Settings → Appearance** under **Colors**.

After you change a color, install the theme again to see it. Hibi replaces the installed copy after you confirm.

## Make it yours

Rename the `themes/hello-theme` folder, then update `hibi-addon.json` in it:

- `id` must be unique. Use up to 48 lowercase letters, numbers, and hyphens, starting with a letter.
- Change `name`, `description`, and `authors` to describe your theme.
- Increase `version` whenever you share a new release.
- `themes` lists the color scheme files. A theme can have up to 20.

Each color scheme file describes one scheme:

- `id` names the scheme inside your theme. Use lowercase letters, numbers, and hyphens.
- `name` is what people see in **Settings → Appearance**.
- `appearance` is `light` or `dark`. Hibi offers each scheme for its matching mode.
- `author` and `license` credit the palette. Change them if you adapt someone else's colors, and keep any notice their license requires.
- `colors` needs six-digit hex values for `background`, `surface`, `ink`, `muted`, `accent`, and `border`.

The example also sets the optional colors for the sidebar, hover and selection states, the caret, code blocks, syntax highlighting, and status messages. Remove any optional color to let Hibi derive it from the required ones. [Creating a theme](https://docs.hibi.garden/#page=development%2Faddons%2Fcreating-a-theme.md) lists every color name.

Then edit the theme's `README.md`. Hibi shows it as the theme's documentation, so write it for the people who will use the theme.

Keep `hibi-addon.json`, the scheme files, `README.md`, and `LICENSE.txt` together in the theme's folder. Hibi installs only that folder, and it refuses files without an extension, such as `LICENSE`.

## Share it

Push your repository to a public HTTPS Git host such as GitHub. Anyone can then choose **Install from URL** in Hibi's Addon Manager and enter the repository URL, for example `https://github.com/you/your-theme`. You can also attach a ZIP file of the theme folder to a release and share its download link.

To list your theme in Hibi garden, open a pull request in [hibigarden/addons-repository](https://github.com/hibigarden/addons-repository). After a maintainer reviews and merges your listing, Hibi garden signs the listed files automatically, so you do not need a signing key. People who install your theme from Hibi garden do not need to allow unsigned addons. Installing it from your own repository URL stays unsigned and needs **Allow unsigned addons**. See [sideloading and sharing](https://docs.hibi.garden/#page=development%2Faddons%2Fsideloading.md) for package limits and updates.

## License

The starter is available under the [MIT License](LICENSE). The theme carries its own copy in `LICENSE.txt`, because Hibi installs only the theme folder. You can change the license of your own theme; update both files and the `license` fields in the scheme files if you do.
