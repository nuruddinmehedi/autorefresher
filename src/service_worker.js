chrome.alarms.create("my121",{periodInMinutes:0.01666666666 })
let count= 12
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "my121") {
        count= count-1
     chrome.action.setBadgeText({text: count.toString()})
      
    }
  });

    
