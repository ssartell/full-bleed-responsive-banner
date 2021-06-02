---
marp: true
theme: uncover
style: |
  section {
    font-size: 28px;
    text-align: left;
  }
  ul {
      margin-left: 0;
  }
  h5 {
    color: grey;
    position: absolute;
    top: 60px;
  }
  h2 {
    padding-top: 20px;
    line-height: 16px
  }
paginate: true
header: 'Page Speed 101'
---
<!-- _class: invert -->
# Page Speed 101

---

Page speed is a direct ranking factor in Google search algorithm, making it a foundational part of good SEO. 

--- 

# Overview

- Audit your site with Lighthouse
- Profile your server-side code
- Enable HTTP/2
- Use a module bundler
- Avoid render-blocking resources
- Enable long-term browser caching
- Enable static file compression
- Optimize images
- Use server-side caching
- Reduce web font usage
- Prefetch DNS
- Strongly consider using a CDN

---
<!-- _class: invert -->
![alt](https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg)

# Audit your site with Lighthouse


---

##### Audit your site with Lighthouse

## Why

**Lighthouse (Google Pagespeed Insights)** scores based on metrics that search engines use to influence page rankings (FCP, FMP, Time to Interactive) AND provides suggestions on how to improve.

**Ideal:** audit prominent pages regularly during development to catch low-perf additions to the code base early. 

**At minimum:** audit the site before launch and remediate the major issues.

---

##### Audit your site with Lighthouse

# How

- [Google Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [Lighthouse (in Chrome)](https://developers.google.com/web/tools/lighthouse)
- [Lighthouse CLI for automation](https://github.com/GoogleChrome/lighthouse)

---
<!-- _class: invert -->
# Profile your server-side code
---
##### Profile your server-side code

## Why    
Over the last several years Google has de-emphasized the importance of [Time to First Byte](https://web.dev/time-to-first-byte/) (TTFB) and it is no longer considered a key metric for site performance.
 <!-- That said, it can still be a cause of poor site performance. Rely on Lighthouse to tell you if your server load times are causing an issue before spending time investigating. If you do have server performance issues, don't just guess, use a profiler to find your bottlenecks! -->
- Focus on TTFB if Lighthouse indicates an issue.
- Don't guess, use a profiler.

---
##### Profile your server-side code

## How    
- [VS Profiler](https://docs.microsoft.com/en-us/visualstudio/profiling/?view=vs-2019)
- [Sitecore Profiler](https://jermdavis.wordpress.com/2017/10/02/measure-if-you-want-to-go-faster/)
- [DotTrace](https://www.jetbrains.com/profiler/)

---
<!-- _class: invert -->
# Enable HTTP/2  
---
##### Enable HTTP/2  

## Why    
- It's really easy to do.
- It's the future (really the present)
- Uses **multiplexing** (>6 request/responses in parallel)
- Uses 1 TCP connection and binary headers to reduce overhead.
- No longer have to worry about 'how many requests'
- No longer need to bundle everything 
  - Instead, chunk! Serve only what you need. 

---
##### Enable HTTP/2  

## How    
- IIS enables HTTP/2 automatically. It can be disabled, but don't do that.
- [Enable HTTP/2 in Azure](https://azure.microsoft.com/en-us/blog/announcing-http-2-support-in-azure-app-service/)
- [Best Practices for HTTP/2](https://spinupwp.com/performance-best-practices-http2/)

---
<!-- _class: invert -->
# Use a module bundler

---
##### Use a module bundler

# Why

When starting out on a fresh project, choose a bundler for your front-end assets to put yourself in better position. A good bundler will give you the following benefits:

---
##### Use a module bundler

## Module Resolution  
Module resolution lets you use [import statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to include other scripts into your code (custom scripts or npm packages).
- Let's us ignore loading order
- Better npm referencing
- Dynamic imports

```js
// npm imports
import React from 'react';
import ReactDom from 'react-dom';

// custom scripts
import { getApiResults } from './apiService';
```

---

##### Use a module bundler

## Minification  
Minifiying your JS and CSS will reduce the overall sites of the files. Webpack can use the following plugins:
- [Terser plugin](https://webpack.js.org/plugins/terser-webpack-plugin/) (for JavaScript)
- [Css Minimizer](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)

---
##### Use a module bundler

## Tree shaking  
When using libraries, [tree shaking](https://webpack.js.org/guides/tree-shaking/) can dramatically reduce the size of your JavaScript bundles by only including the code you need. To enable this, bundlers typically need imports in the first format below:
```js
// es modules with destructuring
// allows for tree shaking ✅
import {​​ map, reduce }​​ from 'lodash'

// es modules getting everthing
// doesn't allow tree shaking ❌
import _ from 'lodash'

// CommonJS getting everything
// Doesn't allow tree shaking ❌
let _ = require('lodash')
```
---
##### Use a module bundler
  
## Versioning / Revisions  
When using long-term browser caching, most bundlers can append a hash to the end of the bundle name based on the contents. When the file contents change, the hash changes and will bust the browser cache.

```html
<!-- file with hash in name -->
<link href="/dist/main.ab5db630a4ae130c6b6f.css" rel="stylesheet">
```

---
##### Use a module bundler

## Code splitting  
Bundlers can let you intelligently split your code into multiple files. Consider using this to load assets in the browser only when needed. For example, you might split a feature out that is only available on a particular page.

---
##### Use a module bundler

## Source maps  
Source maps let you debug with original source files instead of the resulting compiled files. Debugging compiled files is an unncessary waste of developer time.

---
##### Use a module bundler

## How    
[Webpack](https://webpack.js.org/configuration/) has been the industry go-to for several years now, but there are several other bundlers available including [browserify](http://browserify.org/), [rollup](https://rollupjs.org/guide/en/), or [parcel](https://parceljs.org/). [Bundlers.tooling.report](https://bundlers.tooling.report/) (by web.dev) has good stats to compare tools.

#### Platform Recommendations
- Sitecore: **Gulp + Webpack**
- Episerver: **npm scripts + Webpack**

---
<!-- _class: invert -->
# Avoid render-blocking resources
---
##### Avoid render-blocking resources

## Why    
All stylesheet links and any script tags in the head are considered "render-blocking" which means the browser stops to download and execute the resource before it continues parsing HTML, blocking the first paint of content. Try to keep render-blocking to a minimum for only the styles and scripts essential to first paint.

---
##### Avoid render-blocking resources

## How  
- Put scripts at the bottom of your body tag or use `defer`/`async`.
- Tracking pixels/scripts should always be deferred. Use a tag manager.
- Consider using code splitting to avoid loading styles and scripts not used on the current page.
- `Link` tags can [include media queries](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css) to avoid loading unnecessary CSS. (e.g. print)
- Newer articles suggest inlining critical styles and scripts in your markup and deferring everything else.

---
<!-- _class: invert -->
# Enable long-term browser caching
---
##### Enable long-term browser caching

## Why    
Enabling long-term browser caching for assets (JS, CSS, web fonts, images, etc.) allows the browser to pull from cache instead of repeatedly requesting the same assets which will speed up the experience on subsequent pages.

---
##### Enable long-term browser caching

## How    
In a folder with assets you want to cache, create a `web.config` with the following settings:
```xml
<?xml version="1.0"?>
<configuration>
  <system.webServer>
    <staticContent>
      <!-- cache files for 1 year -->
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
    </staticContent>
  </system.webServer>
</configuration>
```

You can check that this is working by looking at response headers in your browser dev tools.

---
<!-- _class: invert -->
# Enable static file compression
---
##### Enable static file compression

## Why    
Static file compression ensures your assets are compressed before transfering over the internet, which reduces file size.

- Double check Content-Encoding response headers in dev tools
- Consider using [Brotli](https://richardjgreen.net/brotli-support-azure-web-app/) instead of gzip

---
##### Enable static file compression

## How    
If for whatever it's not enabled, you can add this to your `web.config` or in a new `web.config` in your assets folder:

```xml
<?xml version="1.0"?>
<configuration>
  <system.webServer>
    <urlCompression doStaticCompression="true" />
  </system.webServer>
</configuration>
```

---
<!-- _class: invert -->
# Optimize Images
---
##### Optimize Images

## Why    
Images can quickly become the biggest weight in your page load. Serving up compressed images in next-gen formats (mostly WebP) at the right size can make huge difference! If your site is image heavy, consider lazy loading images.

---
##### Optimize Images

## How    
- Most DAMs can do these things for you.
- [CloudFlare Polish](https://support.cloudflare.com/hc/en-us/articles/360000607372-Using-Cloudflare-Polish-to-compress-images) can compress and convert images to next-gen formats for you.
- Lazy loading with [lazysizes](https://github.com/aFarkas/lazysizes)
- EpiServer: 
  - [ImageResizer](https://www.nuget.org/packages/ImageResizer/)
- Sitecore:
  - [OOTB](https://community.sitecore.net/technical_blogs/b/sitecorejohn_blog/posts/media-options-and-query-string-parameters-in-the-sitecore-asp-net-cms) - resize using query string parameters.
  - [Dianoga](https://github.com/kamsar/Dianoga) - supports next-gen image formats (WebP)
- [More tactics from web.dev](https://web.dev/fast/#optimize-your-images)

---
<!-- _class: invert -->
# Use server-side caching
---
##### Use server-side caching

## Why    
If Lighthouse indicates your site has poor TTFB, caching is good option. Focus on common elements like the main navigation and footer that run on every page and are often costly. But also, [profile it](https://rightpoint.visualstudio.com/Rightpoint%20-%20CMS/_wiki/wikis/Knowledge%20Base/1337/Page-Speed?anchor=backend-profiling)!

---
##### Use server-side caching

## How     
This largely depends on the platform.
- [Episerver](/Page-Speed/Episerver) 
- [Sitecore](/Page-Speed/Sitecore) 

---
<!-- _class: invert -->
# Optimize WebFont usage
---
##### Optimize WebFont usage

## Why    
Poor web font usage can result in heavier page loads, render blocking, and unwanted layout shifts.

---
##### Optimize WebFont usage

## How    
- Avoid chaining font requests in CSS. Preload fonts in your markup.
- Minimize the number of variants you're loading.
- Ensure long-term browser caching of fonts.

---
<!-- _class: invert -->
# Prefetch DNS
---
##### Prefetch DNS

## Why    
If you're loading assets from other domains, your browser will need to resolve DNS before it can load assets. DNS prefetching tells your browser about these domains before it discovers them on its own, giving it an opportunity to resolve DNS ahead of time.

---
##### Prefetch DNS

## How    
- [Use link tag with dns-prefetch rel](https://developer.mozilla.org/en-US/docs/Glossary/Prefetch)

```html
<!-- browser will resolve example.com DNS -->
<link rel="dns-prefetch" href="https://example.com/">
```

---
<!-- _class: invert -->
# Strongly consider using a CDN
---
##### Strongly consider using a CDN

## Why  
CDNs can provide a number of benefits including:

- Pass-through caching
- Serve requests closer to source
- Reduced server load
- Handle traffic spikes better
- DDOS protection

---
##### Strongly consider using a CDN

## How    
- Common CDNs include CloudFlare, Akamai, Azure
- Targeted cache busting can be done with publish events


---
<!-- _class: invert -->
# Other Resources

- [web.dev](https://web.dev/) is a great resource for front-end page speed optimization.
- [Rightpoint's Product-Development-Handbook](https://github.com/Rightpoint/product-development-handbook/) (disciplines/fed)