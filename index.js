widget('fonts', function() {
    WebFontConfig = {
        google : {
            families : [ 'Ubuntu:400,700:latin' ]
        }
    };
    loadScript('//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js', true,
               'webfont-js');
});

widget('ga', function() {
    (function(w, r) {
        w['GoogleAnalyticsObject'] = r, w[r] = w[r] || function() {
            (w[r].q = w[r].q || []).push(arguments)
        }, w[r].l = 1 * new Date();
    })(window, 'ga');
    loadScript('//www.google-analytics.com/analytics.js', true);
    ga('create', 'UA-32820551-1', 'auto');
    ga('send', 'pageview');
})('ga', 100);

widget('social', function() {
    loadScript('https://platform.twitter.com/widgets.js', true, 'twitter-wjs');
    loadScript('https://connect.facebook.net/en_US/all.js'
               + '#xfbml=1&appId=112845592187492', true, 'facebook-jssdk');
    loadScript('https://apis.google.com/js/plusone.js', true, 'plusone-js');
});

widget('comments', function() {
    if (!document.getElementById('livefyre-comments')) {
        return;
    }
    loadScript('http://zor.livefyre.com/wjs/v3.0/javascripts/livefyre.js',
               function() {
                   var articleId = fyre.conv.load.makeArticleId(null);
                   fyre.conv.load({}, [ {
                       el : 'livefyre-comments',
                       network : 'livefyre.com',
                       siteId : '335643',
                       articleId : articleId,
                       signed : false,
                       collectionMeta : {
                           articleId : articleId,
                           url : fyre.conv.load.makeCollectionUrl(),
                       }
                   } ], function() {
                   });
               }, 'livefyre-js');
});

function maximizeCanvas() {
    if (screenfull.enabled) {
        screenfull.toggle();
        // publishEvent('resize');
    }
}

function restoreCanvas() {
    if (screenfull.enabled) {
        screenfull.toggle();
        // publishEvent('resize');
    }
}

function updateUi() {
    addClass('maximize', 'hide');
    addClass('restore', 'hide');
    if (screenfull.enabled && !window.navigator.standalone) {
        if (screenfull.isFullscreen) {
            removeClass('restore', 'hide');
        } else if (!(screen.width == window.innerWidth && screen.height == window.innerHeight)) {
            removeClass('maximize', 'hide');
        }
    }
    if (window.navigator.standalone) {
        addClass('mobile', 'hide');
    }
}

function showInfo() {
    removeClass('info', 'hide');
    addClass('game', 'hide');
    typeof Cut !== 'undefined' && (Cut.Loader || Cut).pause();
}

function showPauseMenu() {
    removeClass('pauseMenu', 'hide');
    addClass('game', 'hide');
    typeof Cut !== 'undefined' && (Cut.Loader || Cut).pause();
}

function showGame() {
    if (!isSupported()) {
        return false;
    }
    widget('fonts', 2000);
    removeClass('game', 'hide');
    addClass('info', 'hide');
    addClass('pauseMenu', 'hide');
    addClass('mainMenu', 'hide');
    typeof Cut !== 'undefined' && (Cut.Loader || Cut).resume();
    publishEvent('resize');
}

function showMainMenu() {
    if (!isSupported()) {
        return false;
    }
    document.getElementById("score").innerHTML = 0;
    removeClass('mainMenu', 'hide');
    addClass('settingsMenu', 'hide');
    addClass('pauseMenu', 'hide');
    addClass('game', 'hide');
    typeof Cut !== 'undefined' && (Cut.Loader || Cut).pause();
}

function showSettings() {
    loadSettings();
    removeClass('settingsMenu', 'hide');
    addClass('mainMenu', 'hide');
    typeof Cut !== 'undefined' && (Cut.Loader || Cut).pause();
}

var allColors = ["red", "blue", "yellow", "green", "orange", "dark"];

var settingsCache = {
    width  : 8,
    height : 8,
    turns  : 250,
    colors : allColors
}

function loadSettings() {
    console.log("loading");
    console.log(settingsCache);
    setWidth(settingsCache.width);
    setHeight(settingsCache.height);
    setTurns(settingsCache.turns);
    setColors(settingsCache.colors);
}

function saveSettings() {
    console.log("saving");
    var width  = getWidth(),
        height = getHeight(),
        turns  = getTurns(),
        colors = getColors();
    settingsCache = {
        width  : parseInt(width),
        height : parseInt(height),
        turns  : parseInt(turns),
        colors : colors
    }
    console.log(settingsCache);
}

function getSelectedValue(element) {
    var i = element.selectedIndex;
    return element.options[i].value;
}

function setSelectedValue(element, value) {
    for (var i = 0; i < element.options.length; ++i) {
        if (element.options[i].value == value) {
            element.selectedIndex = i;
            return true;
        }
    }
    return false;
}

function getWidth() {
    return getSelectedValue(document.getElementById("widthSelect"));
}

function setWidth(width) {
    return setSelectedValue(document.getElementById("widthSelect"), width);
}

function getHeight() {
    return getSelectedValue(document.getElementById("heightSelect"));
}

function setHeight(height) {
    return setSelectedValue(document.getElementById("heightSelect"), height);
}

function getTurns() {
    return getSelectedValue(document.getElementById("turnsSelect"));
}

function setTurns(turns) {
    return setSelectedValue(document.getElementById("turnsSelect"), turns);
}

function getColors() {
    var colors = [];
    for (var i = 0; i < allColors.length; ++i) {
        var id = "color_" + allColors[i];
        if (document.getElementById(id).checked) {
            colors.push(allColors[i]);
        }
    }
    return colors;
}

function setColors(colors) {
    var element;
    for(var i = j = 0; i < colors.length; ++i, ++j) {
        while(allColors[j] != colors[i]) {
            var id = "color_" + allColors[j];
            console.log(id);
            document.getElementById(id).checked = false;
            j++;
        }
        var id = "color_" + allColors[j];
        console.log(id);
        document.getElementById(id).checked = true;
    }
}
    

function newGame() {
    rakushki.clearGame();
    showMainMenu();
}

function muteAudio() {
    removeClass('unmute', 'hide');
    addClass('mute', 'hide');
    document.getElementById('bgmusic').muted = true;
}

function unmuteAudio() {
    removeClass('mute', 'hide');
    addClass('unmute', 'hide');
    document.getElementById('bgmusic').muted = false;
}

function startUi(mode) {
    if (!isSupported()) {
        mode = 'info';
        addClass('play', 'hide');
    }
    if (screenfull.enabled) {
        removeClass('maximize', 'hide');
    }
    if (mode == 'info') {
        showInfo();
    } else {
        showMainMenu();
    }
}

function widget(name, value) {
    widget.list = widget.list || {};
    if (typeof value === 'function') {
        if (widget.list[name] !== false) {
            widget.list[name] = value;
        }
    } else if (value > 0) {
        var fn = navigator.onLine === false || name
            && typeof window['load_' + name] !== 'undefined'
            && !window['load_' + name];
        if (fn = !fn && widget.list[name]) {
            setTimeout(fn, value)
            delete widget.list[name];
        }
    } else if (value < 0) {
        widget.list[name] = false;
    }
    return widget;
}

function publishEvent(name, el) {
    el = el || window;
    if (el.fireEvent) {
        el.fireEvent("on" + name);
    } else if (el.dispatchEvent) {
        // var event = document.createEvent('Event');
        // event.initEvent('build', true, true);
        el.dispatchEvent(new Event(name));
    } else {
        console.log('Unable to publish event: ' + name);
    }
}

function addClass(el, name) {
    if (typeof el === 'string') {
        el = document.getElementById(el);
    }
    if (!el) {
        return;
    }
    el.className += ' ' + name;
}

function removeClass(el, name) {
    if (typeof el === 'string') {
        el = document.getElementById(el);
    }
    if (!el) {
        return;
    }
    name = new RegExp('(?:^|\\s)' + name + '(?!\\S)', 'ig');
    el.className = el.className.replace(name, '');
}

function loadScript(url, async, id) {
    if (id && document.getElementById(id)) {
        return;
    }
    if (/^\/\//.exec(url)) {
        url = ('https:' == document.location.protocol ? 'https:' : 'http:') + url;
    }
    var el = document.createElement('script');
    var els = document.getElementsByTagName('script');
    id && (el.id = id);
    el.async = async ? true : false;
    if (typeof async == 'function') {
        el.addEventListener('load', async, false);
        // var loaded = false;
        // (el.onreadystatechange = el.onload = function()
        // { !loaded && async(); loaded = true; };)
    }
    el.src = url;
    els[0].parentNode.insertBefore(el, els[0]);
}

window.addEventListener('resize', updateUi, false);
window.addEventListener('orientationchange', updateUi, false);

function isSupported() {
    if (typeof Cut === 'undefined')
        return false;
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

/*
 * ! screenfull v2.0.0 - 2014-12-22 (c) Sindre Sorhus; MIT License
 */
(function() {
    'use strict';

    var isCommonjs = typeof module !== 'undefined' && module.exports;
    var keyboardAllowed = typeof Element !== 'undefined'
        && 'ALLOW_KEYBOARD_INPUT' in Element;

    var fn = (function() {
        var val;
        var valLength;

        var fnMap = [
            [ 'requestFullscreen', 'exitFullscreen', 'fullscreenElement',
              'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror' ],
            // new WebKit
            [ 'webkitRequestFullscreen', 'webkitExitFullscreen',
              'webkitFullscreenElement', 'webkitFullscreenEnabled',
              'webkitfullscreenchange', 'webkitfullscreenerror'

            ],
            // old WebKit (Safari 5.1)
            [ 'webkitRequestFullScreen', 'webkitCancelFullScreen',
              'webkitCurrentFullScreenElement', 'webkitCancelFullScreen',
              'webkitfullscreenchange', 'webkitfullscreenerror'

            ],
            [ 'mozRequestFullScreen', 'mozCancelFullScreen',
              'mozFullScreenElement', 'mozFullScreenEnabled',
              'mozfullscreenchange', 'mozfullscreenerror' ],
            [ 'msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement',
              'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError' ] ];

        var i = 0;
        var l = fnMap.length;
        var ret = {};

        for (; i < l; i++) {
            val = fnMap[i];
            if (val && val[1] in document) {
                for (i = 0, valLength = val.length; i < valLength; i++) {
                    ret[fnMap[0][i]] = val[i];
                }
                return ret;
            }
        }

        return false;
    })();

    var screenfull = {
        request : function(elem) {
            var request = fn.requestFullscreen;

            elem = elem || document.documentElement;

            // Work around Safari 5.1 bug: reports support for
            // keyboard in fullscreen even though it doesn't.
            // Browser sniffing, since the alternative with
            // setTimeout is even worse.
            if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
                elem[request]();
            } else {
                elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
            }
        },
        exit : function() {
            document[fn.exitFullscreen]();
        },
        toggle : function(elem) {
            if (this.isFullscreen) {
                this.exit();
            } else {
                this.request(elem);
            }
        },
        raw : fn
    };

    if (!fn) {
        if (isCommonjs) {
            module.exports = false;
        } else {
            window.screenfull = false;
        }

        return;
    }

    Object.defineProperties(screenfull, {
        isFullscreen : {
            get : function() {
                return !!document[fn.fullscreenElement];
            }
        },
        element : {
            enumerable : true,
            get : function() {
                return document[fn.fullscreenElement];
            }
        },
        enabled : {
            enumerable : true,
            get : function() {
                // Coerce to boolean in case of old WebKit
                return !!document[fn.fullscreenEnabled];
            }
        }
    });

    if (isCommonjs) {
        module.exports = screenfull;
    } else {
        window.screenfull = screenfull;
    }
})();
