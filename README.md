# Sections of Source Code Adpated from:

[Material UI](https://github.com/mui/mui-x/blob/v7.12.1/docs/data/data-grid/editing/FullFeaturedCrudGrid.js)
  for [CrudTable.jsx](src/components/CrudTable.jsx)

[CSS Source](https://css-tricks.com/old-timey-terminal-styling/)
  for [Terminal.css](src/Terminal.css)


# Usage Instructions
From project root directory run:

```
npm --prefix ./server install
npm --prefix ./app install
npm --prefix ./app run build
PORT=<port number> nohup ./server/server.mjs &
```

To kill server run:

`lsof -ti :<port number> | xargs kill`
