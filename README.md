# Kogan Relevant README

## What is this widget?

This widget is part of PowerShop React App that we are overriding. For Kogan Energy this widget
is uploaded and mounted to our Kogan Energy Wordpress flat pages.

## Worflow

If I want to change styling or how the widget works I should:

1. Modify the widget app e.g SwitchApp or BasicPlanApp
2. Build the widget using `yarn blendid -- build`
3. Find the built Javascript and CSS at `public/javascripts` and `public/stylesheets`
4. Give the widget and the CSS to DT (daniel.thompson@kogan.com.au)
5. He will upload it to the Kogan Energy Wordpress

Wordpress Interim Link: `https://s31177.p495.sites.pressdns.com/` (Ask DT if you need access)


# This section is from Powershop README

Main repo for https://www.powershop.com.au/ Wordpress marketing site.

* Project Documentation: https://visualjazz.jira.com/wiki/spaces/POW/

# Designs

https://isobar.invisionapp.com/share/FQIE9ORY64K#/screens

# Front End Development

## Static Build Framework

https://github.com/vigetlabs/blendid

### Quick Start

1.  `nvm use` :point_left: ensure you are using right version of node
2.  `yarn` :point_left: ensure you've got all the packages from `package.json`
3.  `yarn blendid` :point_left: run it

## Browser Testing Baseline

1.  Chrome (latest 2 versions - Windows 8, 10 and OSX High Sierra)
2.  Firefox (latest 2 versions - Windows 8, 10 and OSX High Sierra)
3.  Safari (latest 2 versions - OSX High Sierra)
4.  IE Edge (Windows 10)
5.  IE 11 (Windows 8 and 10)
6.  iOS 9 - 11 Chrome + Safari (iPhone 6, 7, X)
7.  Android 6 Chrome + Native (Galaxy S7)

## CSS Framework

https://github.com/inuitcss/inuitcss

## Fonts via Typekit

| Variation | font-family | font-weight | font-style |
| --------- | ----------- | ----------- | ---------- |
| Regular   | "omnes-pro" | 400         | normal     |
| Medium    | "omnes-pro" | 500         | normal     |
| Semibold  | "omnes-pro" | 600         | normal     |
| Bold      | "omnes-pro" | 700         | normal     |

```
<script>
  (function(d) {
    var config = {
      kitId: 'xiq5mje',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
</script>
```

# Back End Development

* [Wordpress](https://wordpress.org)
* Bedrock
* Homestead
* \_underscores

## Running the project

1.  Follow these instructions to setup homestead: https://laravel.com/docs/master/homestead
1.  Install composer via homebrew (or use composer on the vagrant box homestead)
1.  Setup your `.env` file in `./bedrock` based on `.env.example` \*note: set `WP_ENV=development` for local development
1.  Configure `powershop.local` as your local URL (ref: [homestead](https://laravel.com/docs/master/homestead) and [bedrock](https://roots.io/bedrock/))
1.  Install composer dependencies on homestead `cd ~/Homestead && vagrant ssh && cd ~/Code/powershop/bedrock && composer install`
1.  Update the following lines in your [path-config.json](config/path-config.json) from

```
...
"dest": "./public",
...
```

to

```
...
"dest": "./bedrock/web/app/themes/powershop/assets",
...
```

7.  Update the following lines in your [task-config.json](config/task-config.json)

from

```
...

module.exports = {
  html: true,

  ...

  browserSync: {

    server: {
    // should match `dest` in
    // path-config.json
    //  baseDir: "bedrock/web/app/themes/powershop/assets",
    baseDir: "public",
    },

    /*
    proxy: {
      target: "https://powershop.local",
    },
    files: [
      "bedrock/web/app/themes/powershop/assets",
    ],
    */
  },
...
};
```

to

```
...

module.exports = {
  html: false,

  ...

  browserSync: {
    /*
    server: {
    // should match `dest` in
    // path-config.json
    //  baseDir: "bedrock/web/app/themes/powershop/assets",
    baseDir: "public",
    },
    */
    proxy: {
      target: "https://powershop.local",
    },
    files: [
      "bedrock/web/app/themes/powershop/assets",
      "bedrock/web/app/**/*.php",
    ],
  },
...
};

```

8.  In a new terminal from the root directory, run the quick-start front-end tasks above
9.  You should be good to go

## Wordpress Plugins and Updates

These are managed via composer for Bedrock - detailed documentation found here: https://roots.io/bedrock/docs/composer/.

# The gist...

You can search for and install plugins as per standard WordPress practice on the local server.
Your plugin should only require style changes, do not change plugin files or add any javascript.
To change styles, add stylesheet in src/stylesheets/components/plugin-[name-of-plugin].scss (check folder for examples).
Once happy with look and functionality, commit any files and deactive/delete the plugin.

####Adding a plugin####

1.  Find the plugin here https://wpackagist.org/
2.  Click on latest version button to get the correct code to install in composer. E.g. "wpackagist-plugin/google-language-translator":"5.0.48"
3.  CD to code/powershop/bedrock and to install new plugin: "composer require wpackagist-plugin/google-language-translator" (note: it may take a while but it should update composer.json file and display in local install)
4.  Commit changes to `composer.lock` and `composer.json`
5.  During the next deploy on the server via `git pull origin <branch-name>` a git hook will run `composer install -d ./bedrock` to install the new dependency

####Removing a plugin####

1. CD to _code/powershop/bedrock_ and to remove a plugin: "composer remove wpackagist-plugin/google-language-translator"

####Updating a plugin####

**For updates - proceed with caution.**

1. On local server: View plugins page to identify updates available.
2. Click the 'View version details' link to see if any major changes that might require planning for. There will be warnings on the page about what you may need to consider.
3. When ready to update, find the plugin here https://wpackagist.org/
4. Find latest version number and change version number only this in composer.json. E.g. `"wpackagist-plugin/akismet": "^4.1.1",` and update is for version 4.1.2, then change to `"wpackagist-plugin/akismet": "^4.1.2"`
5. CD to code/powershop/bedrock and run `"composer require wpackagist-plugin/akismet"` (for example). Repeat this for each plugin.
6. To update everything that has updates (not advised), run `"composer update"`
7. Push to repo and SSH / checkout the branch. If any issues with no updates make sure to run through steps 3 and 4 for at least one plugin. You may need to manually change version number for one updated item, and this should kick in all updates.


If you need to revert, hard code the version number in composer.json and run composer update

_Premium Plugins_ If updating premium plugins (e.g. ACF) you can update these via the standard WP admin process on your local machine. As these files are included in GIT, they will be deployed with your next push/pull deployment. If you need to remove one of these plugins altogether, you can follow this same process on your local WP installation and delete via admin panel or just remove the files from the repo.

To add premium plgins to this repo you need to add it to the **bedrock gitignore** file as a NOT ignore rule. E.g.

```
# Pro or Custom Plugins (e.g. not available via composer)
!web/app/mu-plugins/advanced-custom-fields-pro
!web/app/mu-plugins/powershop-*
```

Highly recommended to ensure that if after running `composer update` a database upgrade is required to access the WP Admin that after deploying to staging/production you login to the admin immediately to approve the database upgrade on these environments.

####Updating Wordpress core####

To update the Wordpress core, CD to code/powershop/bedrock and run `"composer update"`. Ensure that all plugins are up to date first.

# Devops

# Third-Party Integrations / Tools

###(Advanced Custom Fields)[https://www.advancedcustomfields.com/pro/]
License Key: `b3JkZXJfaWQ9NzA1MDN8dHlwZT1kZXZlbG9wZXJ8ZGF0ZT0yMDE1LTEyLTA4IDExOjI0OjM4` (note: normally this would go into .env, but has to be stored in database, ACF license is ACF PRO (Developer license) licensed to honestfox which allows unlimited use across sites)

# Jotform integration

## Notes

* Forms created in jotform.com and tested in preview that functioning correctly. If you need login contact Powershop Marketing.
* Grab source code straight from jotform.
* Beautify the html using online tool: https://www.cleancss.com/html-beautify/
* Delete any inline styles and stylesheets in sourcecode.
* Submit button remove inline styles.
* Remove width inline style on selects
* Create static form file and paste html here
* Call the file in (src/html/index.njk)
* Copy script js and paste inside data module. E.g. (src/javascripts/modules/FormBetterSolar.js)
* yarn blendid to test and refine form

# Workflow for adding to codebase

## Notes

to be updated after handover. Jira, bitbucket etc.

* Plan the change
* Add task or story or other in Jira
* Make sure yo have latest with checkout develop, fetch and pull of origin develop
* Create LOCAL branch based on Jira ID
* Develop and test locally by changing [path-config.json](config/path-config.json) and [task-config.json](config/task-config.json) to local dev settings (see above)
* Commit as required
* Change config to test on local CMS environment
* All happy? Push your branch to remote repo
* ssh to staging and git fetch, git checkout feature/[feature-name]
* if new branch, changes will take effect on staging URL. If they don't run yarn blendid build in terminal to rebuild the assets folder.
* if existing branch with an update, run git pull origin feature/[feature-name]
* You may need to yarn add and build the website if any changes or updates were made (adding js library or plugin for example). Run yarn add [dependency]. Then yarn blendid build on the environment to allow for the updates to kick in.
* test change on staging
* Create Pull Request in BitBucket of the feature branch to develop branch
* Approve PR and MERGE with notes to develop
* Happy? Delete feature branch on local and bitbucket
* ssh staging and git checkout develop (make sure you're on develop!)
* git fetch origin && git pull origin develop to pull the PR to staging
* Test thoroughly in staging
* Create Pull Request in BitBucket of the develop to master
* Approve PR and MERGE with notes to master
* ssh production, git checkout origin master (make sure you're on master!)
* git fetch origin && git pull origin master
* Your change is live and ready to use!

# Adding javascript libraries (dependencies)

## Using yarn - not npm

https://yarnpkg.com/lang/en/docs/managing-dependencies/

yarn finds npm package (usually from github) hosted on npmjs.com

If you want to use another package, you first need to add it as a dependency. In order to do that you should run:

`yarn add [package]`

This will automatically add the [package] to your dependencies in your (package.json). It will also update your (yarn.lock) to reflect the change.

To remove a package:

`yarn remove [package]`

Then run yarn add and blendid build steps above on the environment to allow for the updates to kick in.


# Shortcodes

Custom shortcodes added in [template-functions.php](template-functions.php)


### Asknicely testimonials API
To be added wherever a curated list of customer testimonials will add value.
```
[asknicely]
```
Shortcode can be extended to add a data attiributes for *company* (for early testing/review without powershop data), *number* (default is 10), filter *name* and  *value* (to display specific testimonials to enhance content).
The below shortcode will display a testimonial from AskNicely database with name of Brett.
```
[asknicely data-company="asknicely" data-number="2" filter-name="publishname" filter-value="brett"]
```
