// u must be a haxor =_=
console.log('===============ANTISEC=================\n            ar u a haxor\n===============ANTISEC=================')


var TabCount = /** @class */ (function () {
    function TabCount() {
        var _this = this;
        /**
         * @updateInterval: interval in milli seconds to count/update active tabs status.
         * minimum value: 1000
         */
        this.updateInterval = 2000;
        /**
         * @TabId: unique id for this tab.
         */
        this.tabId = Math.random().toString(36).substring(7);
        this.tabsCounter = 0;
        this.onTabCountUpdate = [];
        this.updateActiveInterval = 0;
        this.tabsCount = function (skipCallback) {
            if (skipCallback === void 0) { skipCallback = true; }
            var data = _this.getData();
            var listIds = Object.keys(data.list);
            var now = Date.now();
            var count = 0;
            listIds.forEach(function (id) {
                if (data.list[id].lastActive + _this.updateInterval * 1.2 > now) {
                    count++;
                }
            });
            if (!skipCallback && _this.tabsCounter !== count) {
                _this.onTabCountUpdate.forEach(function (event) {
                    event(count);
                });
            }
            return _this.tabsCounter = count;
        };
        this.updateActive = function () {
            var data = _this.getData(), now = Date.now();
            if (data.list[_this.tabId] === undefined) {
                data.list[_this.tabId] = {
                    TabOpenedTimeStamp: now
                };
            }
            data.list[_this.tabId].url = window.location.href;
            data.list[_this.tabId].lastActive = now;
            if (undefined === data.lastCleaned || +data.lastCleaned + 20000 < now) {
                data = _this.clearList(data);
            }
            _this.updateData(data);
            _this.tabsCount(false);
        };
        /**
         * Cleans data of closed tabs
         */
        this.clearList = function (data) {
            var listIds = Object.keys(data.list);
            var now = Date.now();
            listIds.forEach(function (id) {
                if (data.list[id].lastActive + Math.max(8000, _this.updateInterval * 1.5) < now) { //If tab last update is older get rid of it.
                    delete data.list[id];
                }
            });
            data.lastCleaned = now;
            return data;
        };
        /**
         *
         * @param {function} callback
         * @param {boolean} executeNow => optional, to execute the callback immediatly with current tab count.
         */
        this.onTabChange = function (callback, executeNow) {
            if (executeNow === void 0) { executeNow = false; }
            if (typeof callback === "function") {
                _this.onTabCountUpdate.push(callback);
                if (executeNow) {
                    callback(_this.tabsCount());
                }
            }
        };
        this.updateData = function (data) {
            localStorage.setItem('tabCountData', typeof (data) === "string" ? data : JSON.stringify(data));
        };
        this.getData = function () {
            var savedData = localStorage.getItem('tabCountData');
            return savedData == null ? { list: {}, lastCleaned: 0 } : JSON.parse(savedData);
        };
        /**
         * Get list of urls of opened tabs.
         * @param {boolean} getUnique =>get list of unique urls.
         */
        this.getUrls = function (getUnique) {
            if (getUnique === void 0) { getUnique = false; }
            var data = _this.getData();
            var urlList = [];
            Object.keys(data.list).forEach(function (lt) {
                if (!getUnique || urlList.indexOf(data.list[lt].url) === -1) {
                    urlList.push(data.list[lt].url);
                }
            });
            return urlList;
        };
        this.setUpdateInterval = function (interval) {
            if (interval === void 0) { interval = _this.updateInterval; }
            if (null !== _this.updateActiveInterval) {
                _this.pause();
            }
            _this.start(interval);
        };
        this.pause = function () {
            clearInterval(_this.updateActiveInterval);
            _this.updateActiveInterval = 0;
        };
        this.start = function (interval) {
            if (interval === void 0) { interval = _this.updateInterval; }
            _this.updateActiveInterval = setInterval(function () {
                _this.updateActive();
            }, _this.updateInterval = interval);
        };
        /**
         * Initialise
         */
        this.updateActive();
        this.start();
        window.onbeforeunload = function (e) {
            var data = _this.getData();
            delete data.list[_this.tabId];
            _this.updateData(data);
        };
    }
    return TabCount;
}());
var tabCount = new TabCount();
console.log("Tabs: " + tabCount.tabsCount());
if (tabCount.tabsCount() > 1) {
    //console.log("")
    window.setTimeout(function() {
        document.getElementById('sleep').style.display='none';
        document.getElementById('timer').style.display='none';
        document.getElementById('no').innerHTML = "<p class='Thicker'>Look's like u have " + tabCount.tabsCount() + " Tabs Open, Limit is only 1.</p><br>";
        document.getElementById('refresh').innerHTML = "<a href='' class='btn btn-white btn-animation-1'>Refresh</a>";
    }, 5000);
    
}else {
    //  block of code to be executed if the condition is false
    window.setTimeout(function() {
        document.getElementById('sleep').style.display = '';
        document.getElementById('timer').style.display='none';
        //document.getElementById('time').innerHTML = Date()
        //console.log("i---- Fuck all theses bitches, an all theses hoes. ")
        
                
    }, 5000);
}

function copyText(element) {
    var range, selection, worked;
  
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    try {
      document.execCommand('copy');
      alert('Copyed Account to your clipboard, BTW STILL TESTING');
    }
    catch (err) {
      alert('unable to copy text');
    }
  }

