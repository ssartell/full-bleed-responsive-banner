---

marp: true
theme: uncover
style: |
  section {
    text-align: left;
    font-size: 35px;
  }
  ul {
      margin-left: 0;
  }
  li {
      line-height: 1.8em;
  }
  h5 {
    color: grey;
    position: absolute;
    top: 60px;
    font-size: .75em;
  }
  h2 {
    padding-top: 20px;
    line-height: 1em;
  }
  h1 {
    display: flex;
    align-items:center;
    gap: 30px;
  }
paginate: true
header: 'Lighthouse Automation + CLI'

---
<!-- _class: invert -->
<!-- _header: "" -->
# ![lighthous](https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg) Lighthouse Automation


---

## Purpose
Tour Lighthouse Server + CI features and how they can be used to track & compare Lighthouse score changes over time.

---

## Why use Lighthouse
- Identify issues with performance, accessibility, SEO
- Track metrics as code changes
- Compare scores over time
- Ensure certain metrics meet minimum requirements

---
<!-- _class: invert -->
<!-- _header: "" -->
# Lighthouse Server

---

## RP CMS Lighthouse Server
https://rpc-cms-lighthouse.azurewebsites.net/

All CMS projects welcome! No need to standup your own server.

---

## Demo time!

---

## Azure Install
- PostgreSQL server
- **Web App for Containers** with image [patrickhulce/lhci-server](https://hub.docker.com/r/patrickhulce/lhci-server)
  - LHCI_NO_LIGHTHOUSERC
  - LHCI_STORAGE__SQL_CONNECTION_SSL
  - LHCI_STORAGE__SQL_CONNECTION_URL
  - LHCI_STORAGE__SQL_DIALECT

---
<!-- _class: invert -->
<!-- _header: "" -->
# Lighthouse CI

---

## Install LHCI

`npm install @lhci/cli -g --save-dev`

Might need node v14.x...

---

## LHCI Commands
- `lhci healthcheck`
- `lhci collect`
- `lhci wizard`
- `lhci upload`
- `lhci assert`

---

## Config 😴
`.lighthouserc.js`

---

## Assertions
- Levels: off, warn, error
- Thresholds: maxNumericValue, minScore, maxLength
- Aggregation Methods: median, optimistic, pessimistic, median-run

---
<!-- _class: invert -->
<!-- _header: "" -->
# Azure DevOps Integration

---

## Build Pipeline
- Use an npm script or `autorun`
- Consider using a separate scheduled build pipeline
- Add variable to your .yml
```
variables:
  LHCI_BUILD_CONTEXT__CURRENT_BRANCH: '$(Build.SourceBranch)'
```

---
<!-- _class: invert -->
<!-- _header: "" -->
# Thank you! 👋