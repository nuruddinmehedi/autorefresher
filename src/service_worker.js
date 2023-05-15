chrome.alarms.create("my121", { periodInMinutes: 0.01666666666 })
let count = 12
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "my121") {
        count = count - 1


        chrome.storage.local.get((res) => {
        })
        decrementHandeler()
    }
});

function decrementHandeler() {
    chrome.storage.local.get((res) => {
        for (let key in res) {
            if (res[key].isOn) {
                let decrementnumber = parseInt(res[key].sec)
                // set the batch text
                const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?([^:\/\n?#]+)(?:\/[^?\n#]*)*(?=[\s?#]|$)/;
                const dataurl = (!res[key].exact)?res[key].url.match(regex)[0]:res[key].url;

                chrome.tabs.query({}, (tabs) => {
                    for (let i = 0; i < tabs.length; i++) {  
                        const fsttaburl= tabs[i].url.match(regex)?tabs[i].url.match(regex)[0]:null
                        const tabUrl = (!res[key].exact)?fsttaburl:tabs[i].url
                        let tabToRefresh = i
                        if (tabUrl === dataurl) {
                            chrome.action.setBadgeText({ tabId: tabs[tabToRefresh].id, text: decrementnumber.toString() })
                            // chrome.tabs.reload(tabs[tabToRefresh].id)


                        }else{
                            chrome.action.setBadgeText({ tabId: tabs[tabToRefresh].id, text: '' })
                        }


                    }

                });

                if (decrementnumber <= 0) {
                    chrome.tabs.query({}, (tabs) => {
                        for (let i = 0; i < tabs.length; i++) {
                            const tabUrl = (!res[key].exact)?tabs[i].url.match(regex)?tabs[i].url.match(regex)[0]:null:tabs[i].url
                            if (tabUrl === dataurl) {
                                let tabToRefresh = i
                                chrome.tabs.reload(tabs[tabToRefresh].id)


                            }


                        }

                    });
                    const gets = parseInt(res[key].time.h ? res[key].time.h : 0) * 60 * 60 + parseInt(res[key].time.m ? res[key].time.m : 0) * 60 + parseInt(res[key].time.s ? res[key].time.s : 0)
                    const data = res[key]
                    data.sec = gets
                    chrome.storage.local.set({ [key]: data })
                } else {
                    const data = res[key]
                    data.sec = decrementnumber - 1
                    chrome.storage.local.set({ [key]: data }, () => {
                    });

                  
                    const msg = chrome.runtime.sendMessage({
                        msg: "reload",
                        data: { key: key, sec: res[key].sec }
                    });

                    msg.catch((res) => {
                        console.log(res)
                    })

                }

            }
        }
    })
}



