chrome.runtime.onInstalled.addListener(() => {
  console.log("installed")
  chrome.storage.local.set({
    name: "Jack",
  })
})
