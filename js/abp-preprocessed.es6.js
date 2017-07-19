/*
 * Load the abp-filter-parser node module and
 * pre-process the easylists.
 *
 * This will be browserifyed and turned into abp.js by running 'grunt'
 */
abp = require('abp-filter-parser')

easylists = {
  privacy: {
    url: 'https://easylist.to/easylist/easyprivacy.txt',
    parsed: {}
  },
  general: {
    url: 'https://easylist.to/easylist/easylist.txt',
    whitelist: 'data/tracker_lists/general-whitelist.txt',
    parsed: {}
  }
}

/*
 * Get the list data and use abp to parse.
 * The parsed list data will be added to
 * the easyLists object.
 */
for (let list in easylists) {
  let url = easylists[list].url
  let listData = load.loadExtensionFile(url, '', 'external')
  let whitelistFile = easylists[list].whitelist

  // append the whitelist entries before we process the list
  if (whitelistFile) {
    let whitelist = load.loadExtensionFile(whitelistFile)
    listData += whitelist
  }

  abp.parse(listData, easylists[list].parsed)
}

easylists.loaded = true
