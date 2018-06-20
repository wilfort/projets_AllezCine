/*jslint browser: true, evil: true */

// define correct path for files inclusion
var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    cdn = path.split('/').slice(0, -1).join('/') + '/',
    alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
    cookiesForceLanguage = (cookiesForceLanguage === undefined) ? '' : cookiesForceLanguage,
    cookiesForceExpire = (cookiesForceExpire === undefined) ? '' : cookiesForceExpire,
    timeExipre = 31536000000,
    cookiesProLoadServices,
    cookiesNoAdBlocker = false;

var cookies = {
    "version": 323,
    "cdn": cdn,
    "user": {},
    "lang": {},
    "services": {},
    "added": [],
    "idprocessed": [],
    "state": [],
    "launch": [],
    "parameters": {},
    "isAjax": false,
    "reloadThePage": false,
    "init": function (params) {
        "use strict";
        var origOpen;
        
        cookies.parameters = params;
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener("load", function () {
                    cookies.load();
                    cookies.fallback(['cookiesOpenPanel'], function (elem) {
                        elem.addEventListener("click", function (event) {
                            cookies.userInterface.openPanel();
                            event.preventDefault();
                        }, false);
                    }, true);
                }, false);
                window.addEventListener("scroll", function () {
                    var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                        heightPosition;
                    if (document.getElementById('cookiesAlertBig') !== null && !cookies.highPrivacy) {
                        if (document.getElementById('cookiesAlertBig').style.display === 'block') {
                            heightPosition = document.getElementById('cookiesAlertBig').offsetHeight + 'px';
                            
                            if (scrollPos > (screen.height * 2)) {
                                cookies.userInterface.respondAll(true);
                            } else if (scrollPos > (screen.height / 2)) {
                                document.getElementById('cookiesDisclaimerAlert').innerHTML = '<b>' + cookies.lang.alertBigScroll + '</b> ' + cookies.lang.alertBig;
                            }
                            
                            if (cookies.orientation === 'top') {
                                document.getElementById('cookiesPercentage').style.top = heightPosition;
                            } else {
                                document.getElementById('cookiesPercentage').style.bottom = heightPosition;
                            }
                            document.getElementById('cookiesPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                        }
                    }
                }, false);
                window.addEventListener("keydown", function (evt) {
                    if (evt.keyCode === 27) {
                        cookies.userInterface.closePanel();
                    }
                }, false);
                window.addEventListener("hashchange", function () {
                    if (document.location.hash === cookies.hashtag && cookies.hashtag !== '') {
                        cookies.userInterface.openPanel();
                    }
                }, false);
                window.addEventListener("resize", function () {
                    if (document.getElementById('cookies') !== null) {
                        if (document.getElementById('cookies').style.display === 'block') {
                            cookies.userInterface.jsSizing('main');
                        }
                    }
                    
                    if (document.getElementById('cookiesCookiesPListContainer') !== null) {
                        if (document.getElementById('cookiesCookiesPListContainer').style.display === 'block') {
                            cookies.userInterface.jsSizing('cookie');
                        }
                    }
                }, false);
            } else {
                window.attachEvent("onload", function () {
                    cookies.load();
                    cookies.fallback(['cookiesOpenPanel'], function (elem) {
                        elem.attachEvent("onclick", function (event) {
                            cookies.userInterface.openPanel();
                            event.preventDefault();
                        });
                    }, true);
                });
                window.attachEvent("onscroll", function () {
                    var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                        heightPosition;
                    if (document.getElementById('cookiesAlertBig') !== null && !cookies.highPrivacy) {
                        if (document.getElementById('cookiesAlertBig').style.display === 'block') {
                            heightPosition = document.getElementById('cookiesAlertBig').offsetHeight + 'px';
                            
                            if (scrollPos > (screen.height * 2)) {
                                cookies.userInterface.respondAll(true);
                            } else if (scrollPos > (screen.height / 2)) {
                                document.getElementById('cookiesDisclaimerAlert').innerHTML = '<b>' + cookies.lang.alertBigScroll + '</b> ' + cookies.lang.alertBig;
                            }
                            if (cookies.orientation === 'top') {
                                document.getElementById('cookiesPercentage').style.top = heightPosition;
                            } else {
                                document.getElementById('cookiesPercentage').style.bottom = heightPosition;
                            }
                            document.getElementById('cookiesPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                        }
                    }
                });
                window.attachEvent("onkeydown", function (evt) {
                    if (evt.keyCode === 27) {
                        cookies.userInterface.closePanel();
                    }
                });
                window.attachEvent("onhashchange", function () {
                    if (document.location.hash === cookies.hashtag && cookies.hashtag !== '') {
                        cookies.userInterface.openPanel();
                    }
                });
                window.attachEvent("onresize", function () {
                    if (document.getElementById('cookies') !== null) {
                        if (document.getElementById('cookies').style.display === 'block') {
                            cookies.userInterface.jsSizing('main');
                        }
                    }
                    
                    if (document.getElementById('cookiesCookiesPListContainer') !== null) {
                        if (document.getElementById('cookiesCookiesPListContainer').style.display === 'block') {
                            cookies.userInterface.jsSizing('cookie');
                        }
                    }
                });
            }
            
            if (typeof XMLHttpRequest !== 'undefined') {
                origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {
                    
                    if (window.addEventListener) {
                        this.addEventListener("load", function () {
                            if (typeof cookiesProLoadServices === 'function') {
                                cookiesProLoadServices();
                            }
                        }, false);
                    } else if (typeof this.attachEvent !== 'undefined') {
                        this.attachEvent("onload", function () {
                            if (typeof cookiesProLoadServices === 'function') {
                                cookiesProLoadServices();
                            }
                        });
                    } else {
                        if (typeof cookiesProLoadServices === 'function') {
                            setTimeout(cookiesProLoadServices, 1000);
                        }
                    }
                    
                    try {
                        origOpen.apply(this, arguments);
                    } catch (err) {}
                };
            }
        }
    },
    "load": function () {
        "use strict";
        var cdn = cookies.cdn,
            language = cookies.getLanguage(),
            pathToLang = cdn + 'lang/cookies.' + language + '.js?v=' + cookies.version,
            pathToServices = cdn + 'cookies.services.js?v=' + cookies.version,
            linkElement = document.createElement('link'),
            defaults = {
                "adblocker": false,
                "hashtag": '#cookies',
                "highPrivacy": false,
                "orientation": "top",
                "removeCredit": false,
                "showAlertSmall": true,
                "CookiesPlist": true,
                "handleBrowserDNTRequest": false
            },
            params = cookies.parameters;
        
        // Step 0: get params
        if (params !== undefined) {
            cookies.extend(defaults, params);
        }
        
        // global
        cookies.orientation = defaults.orientation;
        cookies.hashtag = defaults.hashtag;
        cookies.highPrivacy = defaults.highPrivacy;
        cookies.handleBrowserDNTRequest = defaults.handleBrowserDNTRequest;

        // Step 1: load css
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = cdn + 'css/cookies.css?v=' + cookies.version;
        document.getElementsByTagName('head')[0].appendChild(linkElement);

        // Step 2: load language and services
        cookies.addScript(pathToLang, '', function () {
            cookies.addScript(pathToServices, '', function () {

                var body = document.body,
                    div = document.createElement('div'),
                    html = '',
                    index,
                    orientation = 'Top',
                    cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video', 'other'],
                    i;
                
                cat = cat.sort(function (a, b) {
                    if (cookies.lang[a].title > cookies.lang[b].title) { return 1; }
                    if (cookies.lang[a].title < cookies.lang[b].title) { return -1; }
                    return 0;
                });

                // Step 3: prepare the html
                html += '<div id="cookiesPremium"></div>';
                html += '<div id="cookiesBack" onclick="cookies.userInterface.closePanel();"></div>';
                html += '<div id="cookies">';
                html += '   <div id="cookiesClosePanel" onclick="cookies.userInterface.closePanel();">';
                html += '       ' + cookies.lang.close;
                html += '   </div>';
                html += '   <div id="cookiesServices">';
                html += '      <div class="cookiesLine cookiesMainLine" id="cookiesMainLineOffset">';
                html += '         <div class="cookiesName">';
                html += '            <b><a href="#" onclick="cookies.userInterface.toggle(\'cookiesInfo\', \'cookiesInfoBox\');return false">&#10011;</a> ' + cookies.lang.all + '</b>';
                html += '         </div>';
                html += '         <div class="cookiesAsk" id="cookiesScrollbarAdjust">';
                html += '            <div id="cookiesAllAllowed" class="cookiesAllow" onclick="cookies.userInterface.respondAll(true);">';
                html += '               &#10003; ' + cookies.lang.allow;
                html += '            </div> ';
                html += '            <div id="cookiesAllDenied" class="cookiesDeny" onclick="cookies.userInterface.respondAll(false);">';
                html += '               &#10007; ' + cookies.lang.deny;
                html += '            </div>';
                html += '         </div>';
                html += '      </div>';
                html += '      <div id="cookiesInfo" class="cookiesInfoBox">';
                html += '         ' + cookies.lang.disclaimer;
                if (defaults.removeCredit === false) {
                    html += '        <br/><br/>';
                    html += '        <a href="https://opt-out.ferank.eu/" rel="nofollow" target="_blank" rel="noopener">' + cookies.lang.credit + '</a>';
                }
                html += '      </div>';
                html += '      <div class="cookiesBorder" id="cookiesScrollbarParent">';
                html += '         <div class="clear"></div>';
                for (i = 0; i < cat.length; i += 1) {
                    html += '         <div id="cookiesServicesTitle_' + cat[i] + '" class="cookiesHidden">';
                    html += '            <div class="cookiesTitle">';
                    html += '               <a href="#" onclick="cookies.userInterface.toggle(\'cookiesDetails' + cat[i] + '\', \'cookiesInfoBox\');return false">&#10011;</a> ' + cookies.lang[cat[i]].title;
                    html += '            </div>';
                    html += '            <div id="cookiesDetails' + cat[i] + '" class="cookiesDetails cookiesInfoBox">';
                    html += '               ' + cookies.lang[cat[i]].details;
                    html += '            </div>';
                    html += '         </div>';
                    html += '         <div id="cookiesServices_' + cat[i] + '"></div>';
                }
                html += '         <div class="cookiesHidden" id="cookiesScrollbarChild" style="height:20px;display:block"></div>';
                html += '       </div>';
                html += '   </div>';
                html += '</div>';
                
                if (defaults.orientation === 'bottom') {
                    orientation = 'Bottom';
                }
                
                if (defaults.highPrivacy) {
                    html += '<div id="cookiesAlertBig" class="cookiesAlertBig' + orientation + '">';
                    html += '   <span id="cookiesDisclaimerAlert">';
                    html += '       ' + cookies.lang.alertBigPrivacy;
                    html += '   </span>';
                    html += '   <span id="cookiesPersonalize" onclick="cookies.userInterface.openPanel();">';
                    html += '       ' + cookies.lang.personalize;
                    html += '   </span>';
                    html += '</div>';
                } else {
                    html += '<div id="cookiesAlertBig" class="cookiesAlertBig' + orientation + '">';
                    html += '   <span id="cookiesDisclaimerAlert">';
                    html += '       ' + cookies.lang.alertBigClick + ' ' + cookies.lang.alertBig;
                    html += '   </span>';
                    html += '   <span id="cookiesPersonalize" onclick="cookies.userInterface.respondAll(true);">';
                    html += '       &#10003; ' + cookies.lang.acceptAll;
                    html += '   </span>';
                    html += '   <span id="cookiesCloseAlert" onclick="cookies.userInterface.openPanel();">';
                    html += '       ' + cookies.lang.personalize;
                    html += '   </span>';
                    html += '</div>';
                    html += '<div id="cookiesPercentage"></div>';
                }
                
                if (defaults.showAlertSmall === true) {
                    html += '<div id="cookiesAlertSmall" class="cookiesAlertSmall' + orientation + '">';
                    html += '   <div id="cookiesManager" onclick="cookies.userInterface.openPanel();">';
                    html += '       ' + cookies.lang.alertSmall;
                    html += '       <div id="cookiesDot">';
                    html += '           <span id="cookiesDotGreen"></span>';
                    html += '           <span id="cookiesDotYellow"></span>';
                    html += '           <span id="cookiesDotRed"></span>';
                    html += '       </div>';
                    if (defaults.CookiesPlist === true) {
                        html += '   </div><!-- @whitespace';
                        html += '   --><div id="cookiesCookiesPNumber" onclick="cookies.userInterface.toggleCookiesPList();">0</div>';
                        html += '   <div id="cookiesCookiesPListContainer">';
                        html += '       <div id="cookiesClosePanelCookie" onclick="cookies.userInterface.closePanel();">';
                        html += '           ' + cookies.lang.close;
                        html += '       </div>';
                        html += '       <div class="cookiesCookiesPListMain" id="cookiesCookiesPTitle">';
                        html += '            <b id="cookiesCookiesPNumberBis">0 cookie</b>';
                        html += '       </div>';
                        html += '       <div id="cookiesCookiesPList"></div>';
                        html += '    </div>';
                    } else {
                        html += '   </div>';
                    }
                    html += '</div>';
                }
                
                cookies.addScript(cookies.cdn + 'advertising.js?v=' + cookies.version, '', function () {
                    if (cookiesNoAdBlocker === true || defaults.adblocker === false) {
                        div.id = 'cookiesRoot';
                        body.appendChild(div, body);
                        div.innerHTML = html;

                        if (cookies.job !== undefined) {
                            cookies.job = cookies.cleanArray(cookies.job);
                            for (index = 0; index < cookies.job.length; index += 1) {
                                cookies.addService(cookies.job[index]);
                            }
                        } else {
                            cookies.job = []
                        }
                
                        cookies.isAjax = true;

                        cookies.job.push = function (id) {

                            // ie <9 hack
                            if (typeof cookies.job.indexOf === 'undefined') {
                                cookies.job.indexOf = function (obj, start) {
                                    var i,
                                        j = this.length;
                                    for (i = (start || 0); i < j; i += 1) {
                                        if (this[i] === obj) { return i; }
                                    }
                                    return -1;
                                };
                            }

                            if (cookies.job.indexOf(id) === -1) {
                                Array.prototype.push.call(this, id);
                            }
                            cookies.launch[id] = false;
                            cookies.addService(id);
                        };
                
                        if (document.location.hash === cookies.hashtag && cookies.hashtag !== '') {
                            cookies.userInterface.openPanel();
                        }
                
                        cookies.cookie.number();
                        setInterval(cookies.cookie.number, 60000);
                    }
                }, defaults.adblocker);
                
                if (defaults.adblocker === true) {
                    setTimeout(function () {
                        if (cookiesNoAdBlocker === false) {
                            html = '<div id="cookiesAlertBig" class="cookiesAlertBig' + orientation + '" style="display:block">';
                            html += '   <span id="cookiesDisclaimerAlert">';
                            html += '       ' + cookies.lang.adblock + '<br/>';
                            html += '       <b>' + cookies.lang.adblock_call + '</b>';
                            html += '   </span>';
                            html += '   <span id="cookiesPersonalize" onclick="location.reload();">';
                            html += '       ' + cookies.lang.reload;
                            html += '   </span>';
                            html += '</div>';
                            html += '<div id="cookiesPremium"></div>';
                            div.id = 'cookiesRoot';
                            body.appendChild(div, body);
                            div.innerHTML = html;
                            cookies.pro('!adblocker=true');
                        } else {
                            cookies.pro('!adblocker=false');
                        }
                    }, 1500);
                }
            });
        });
    },
    "addService": function (serviceId) {
        "use strict";
        var html = '',
            s = cookies.services,
            service = s[serviceId],
            cookie = cookies.cookie.read(),
            hostname = document.location.hostname,
            hostRef = document.referrer.split('/')[2],
            isNavigating = (hostRef === hostname) ? true : false,
            isAutostart = (!service.needConsent) ? true : false,
            isWaiting = (cookie.indexOf(service.key + '=wait') >= 0) ? true : false,
            isDenied = (cookie.indexOf(service.key + '=false') >= 0) ? true : false,
            isAllowed = (cookie.indexOf(service.key + '=true') >= 0) ? true : false,
            isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0) ? true : false,
            isDNTRequested = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1") ? true : false;

        if (cookies.added[service.key] !== true) {
            cookies.added[service.key] = true;
            
            html += '<div id="' + service.key + 'Line" class="cookiesLine">';
            html += '   <div class="cookiesName">';
            html += '       <b>' + service.name + '</b><br/>';
            html += '       <span id="tacCL' + service.key + '" class="cookiesListCookiesP"></span><br/>';
            html += '       <a href="https://opt-out.ferank.eu/service/' + service.key + '/" target="_blank" rel="noopener">';
            html += '           ' + cookies.lang.more;
            html += '       </a>';
            html += '        - ';
            html += '       <a href="' + service.uri + '" target="_blank" rel="noopener">';
            html += '           ' + cookies.lang.source;
            html += '       </a>';
            html += '   </div>';
            html += '   <div class="cookiesAsk">';
            html += '       <div id="' + service.key + 'Allowed" class="cookiesAllow" onclick="cookies.userInterface.respond(this, true);">';
            html += '           &#10003; ' + cookies.lang.allow;
            html += '       </div> ';
            html += '       <div id="' + service.key + 'Denied" class="cookiesDeny" onclick="cookies.userInterface.respond(this, false);">';
            html += '           &#10007; ' + cookies.lang.deny;
            html += '       </div>';
            html += '   </div>';
            html += '</div>';
           
            cookies.userInterface.css('cookiesServicesTitle_' + service.type, 'display', 'block');
            
            if (document.getElementById('cookiesServices_' + service.type) !== null) {
                document.getElementById('cookiesServices_' + service.type).innerHTML += html;
            }
            
            cookies.userInterface.order(service.type);
        }

        // allow by default for non EU
        if (isResponded === false && cookies.user.bypass === true) {
            isAllowed = true;
            cookies.cookie.create(service.key, true);
        }
       
        if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !cookies.highPrivacy) || isAllowed) {
            if (!isAllowed) {
                cookies.cookie.create(service.key, true);
            }
            if (cookies.launch[service.key] !== true) {
                cookies.launch[service.key] = true;
                service.js();
            }
            cookies.state[service.key] = true;
            cookies.userInterface.color(service.key, true);
        } else if (isDenied) {
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            cookies.state[service.key] = false;
            cookies.userInterface.color(service.key, false);
        } else if (!isResponded && isDNTRequested && cookies.handleBrowserDNTRequest) {
            cookies.cookie.create(service.key, 'false');
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            cookies.state[service.key] = false;
            cookies.userInterface.color(service.key, false);
        } else if (!isResponded) {
            cookies.cookie.create(service.key, 'wait');
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            cookies.userInterface.color(service.key, 'wait');
            cookies.userInterface.openAlert();
        }

        cookies.cookie.checkCount(service.key);
    },
    "cleanArray": function cleanArray(arr) {
        "use strict";
        var i,
            len = arr.length,
            out = [],
            obj = {},
            s = cookies.services;
 
        for (i = 0; i < len; i += 1) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = {};
                if (cookies.services[arr[i]] !== undefined) {
                    out.push(arr[i]);
                }
            }
        }
                
        out = out.sort(function (a, b) {
            if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
            if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
            return 0;
        });
                    
        return out;
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            if (document.getElementById(id) !== null) {
                document.getElementById(id).style[property] = value;
            }
        },
        "respondAll": function (status) {
            "use strict";
            var s = cookies.services,
                service,
                key,
                index = 0;
            
            for (index = 0; index < cookies.job.length; index += 1) {
                service = s[cookies.job[index]];
                key = service.key;
                if (cookies.state[key] !== status) {
                    if (status === false && cookies.launch[key] === true) {
                        cookies.reloadThePage = true;
                    }
                    if (cookies.launch[key] !== true && status === true) {
                        cookies.launch[key] = true;
                        cookies.services[key].js();
                    }
                    cookies.state[key] = status;
                    cookies.cookie.create(key, status);
                    cookies.userInterface.color(key, status);
                }
            }
        },
        "respond": function (el, status) {
            "use strict";
            var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');
        
            // return if same state
            if (cookies.state[key] === status) {
                return;
            }
            
            if (status === false && cookies.launch[key] === true) {
                cookies.reloadThePage = true;
            }
        
            // if not already launched... launch the service
            if (status === true) {
                if (cookies.launch[key] !== true) {
                    cookies.launch[key] = true;
                    cookies.services[key].js();
                }
            }
            cookies.state[key] = status;
            cookies.cookie.create(key, status);
            cookies.userInterface.color(key, status);
        },
        "color": function (key, status) {
            "use strict";
            var gray = '#808080',
                greenDark = '#1B870B',
                greenLight = '#E6FFE2',
                redDark = '#9C1A1A',
                redLight = '#FFE2E2',
                yellowDark = '#FBDA26',
                c = 'cookies',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = cookies.job.length,
                index;

            if (status === true) {
                cookies.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + greenDark);
                cookies.userInterface.css(key + 'Allowed', 'backgroundColor', greenDark);
                cookies.userInterface.css(key + 'Denied', 'backgroundColor', gray);
            } else if (status === false) {
                cookies.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + redDark);
                cookies.userInterface.css(key + 'Allowed', 'backgroundColor', gray);
                cookies.userInterface.css(key + 'Denied', 'backgroundColor', redDark);
            }

            // check if all services are allowed
            for (index = 0; index < sum; index += 1) {
                if (cookies.state[cookies.job[index]] === false) {
                    nbDenied += 1;
                } else if (cookies.state[cookies.job[index]] === undefined) {
                    nbPending += 1;
                } else if (cookies.state[cookies.job[index]] === true) {
                    nbAllowed += 1;
                }
            }
        
            cookies.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
            cookies.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
            cookies.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');
            
            if (nbDenied === 0 && nbPending === 0) {
                cookies.userInterface.css(c + 'AllAllowed', 'backgroundColor', greenDark);
                cookies.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
            } else if (nbAllowed === 0 && nbPending === 0) {
                cookies.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
                cookies.userInterface.css(c + 'AllDenied', 'backgroundColor', redDark);
            } else {
                cookies.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
                cookies.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
            }
            
            // close the alert if all service have been reviewed
            if (nbPending === 0) {
                cookies.userInterface.closeAlert();
            }
            
            if (cookies.services[key].CookiesP.length > 0 && status === false) {
                cookies.cookie.purge(cookies.services[key].CookiesP);
            }
            
            if (status === true) {
                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = '...';
                }
                setTimeout(function () {
                    cookies.cookie.checkCount(key);
                }, 2500);
            } else {
                cookies.cookie.checkCount(key);
            }
        },
        "openPanel": function () {
            "use strict";
            cookies.userInterface.css('cookies', 'display', 'block');
            cookies.userInterface.css('cookiesBack', 'display', 'block');
            cookies.userInterface.css('cookiesCookiesPListContainer', 'display', 'none');
            cookies.userInterface.jsSizing('main');
        },
        "closePanel": function () {
            "use strict";
            
            if (document.location.hash === cookies.hashtag) {
                document.location.hash = '';
            }
            cookies.userInterface.css('cookies', 'display', 'none');
            cookies.userInterface.css('cookiesCookiesPListContainer', 'display', 'none');
            
            cookies.fallback(['cookiesInfoBox'], function (elem) {
                elem.style.display = 'none';
            }, true);
            
            if (cookies.reloadThePage === true) {
                window.location.reload();
            } else {
                cookies.userInterface.css('cookiesBack', 'display', 'none');
            }
        },
        "openAlert": function () {
            "use strict";
            var c = 'cookies';
            cookies.userInterface.css(c + 'Percentage', 'display', 'block');
            cookies.userInterface.css(c + 'AlertSmall', 'display', 'none');
            cookies.userInterface.css(c + 'AlertBig',   'display', 'block');
        },
        "closeAlert": function () {
            "use strict";
            var c = 'cookies';
            cookies.userInterface.css(c + 'Percentage', 'display', 'none');
            cookies.userInterface.css(c + 'AlertSmall', 'display', 'block');
            cookies.userInterface.css(c + 'AlertBig',   'display', 'none');
            cookies.userInterface.jsSizing('box');
        },
        "toggleCookiesPList": function () {
            "use strict";
            var div = document.getElementById('cookiesCookiesPListContainer');
            
            if (div === null) {
                return;
            }
            
            if (div.style.display !== 'block') {
                cookies.cookie.number();
                div.style.display = 'block';
                cookies.userInterface.jsSizing('cookie');
                cookies.userInterface.css('cookies', 'display', 'none');
                cookies.userInterface.css('cookiesBack', 'display', 'block');
                cookies.fallback(['cookiesInfoBox'], function (elem) {
                    elem.style.display = 'none';
                }, true);
            } else {
                div.style.display = 'none';
                cookies.userInterface.css('cookies', 'display', 'none');
                cookies.userInterface.css('cookiesBack', 'display', 'none');
            }
        },
        "toggle": function (id, closeClass) {
            "use strict";
            var div = document.getElementById(id);
            
            if (div === null) {
                return;
            }
            
            if (closeClass !== undefined) {
                cookies.fallback([closeClass], function (elem) {
                    if (elem.id !== id) {
                        elem.style.display = 'none';
                    }
                }, true);
            }
            
            if (div.style.display !== 'block') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        "order": function (id) {
            "use strict";
            var main = document.getElementById('cookiesServices_' + id),
                allDivs,
                store = [],
                i;

            if (main === null) {
                return;
            }
            
            allDivs = main.childNodes;
            
            if (typeof Array.prototype.map === 'function') {
                Array.prototype.map.call(main.children, Object).sort(function (a, b) {
                    if (cookies.services[a.id.replace(/Line/g, '')].name > cookies.services[b.id.replace(/Line/g, '')].name) { return 1; }
                    if (cookies.services[a.id.replace(/Line/g, '')].name < cookies.services[b.id.replace(/Line/g, '')].name) { return -1; }
                    return 0;
                }).forEach(function (element) {
                    main.appendChild(element);
                });
            }
        },
        "jsSizing": function (type) {
            "use strict";
            var scrollbarMarginRight = 10,
                scrollbarWidthParent,
                scrollbarWidthChild,
                servicesHeight,
                e = window,
                a = 'inner',
                windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                mainTop,
                mainHeight,
                closeButtonHeight,
                headerHeight,
                CookiesPListHeight,
                CookiesPCloseHeight,
                CookiesPTitleHeight,
                paddingBox,
                alertSmallHeight,
                CookiesPNumberHeight;
            
            if (type === 'box') {
                if (document.getElementById('cookiesAlertSmall') !== null && document.getElementById('cookiesCookiesPNumber') !== null) {
                    
                    // reset
                    cookies.userInterface.css('cookiesCookiesPNumber', 'padding', '0px 10px');
                    
                    // calculate
                    alertSmallHeight = document.getElementById('cookiesAlertSmall').offsetHeight;
                    CookiesPNumberHeight = document.getElementById('cookiesCookiesPNumber').offsetHeight;
                    paddingBox = (alertSmallHeight - CookiesPNumberHeight) / 2;
                    
                    // apply
                    cookies.userInterface.css('cookiesCookiesPNumber', 'padding', paddingBox + 'px 10px');
                }
            } else if (type === 'main') {

                // get the real window width for media query
                if (window.innerWidth === undefined) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                // height of the services list container
                if (document.getElementById('cookies') !== null && document.getElementById('cookiesClosePanel') !== null && document.getElementById('cookiesMainLineOffset') !== null) {
                    
                    // reset
                    cookies.userInterface.css('cookiesScrollbarParent', 'height', 'auto');
                    
                    // calculate
                    mainHeight = document.getElementById('cookies').offsetHeight;
                    closeButtonHeight = document.getElementById('cookiesClosePanel').offsetHeight;
                    headerHeight = document.getElementById('cookiesMainLineOffset').offsetHeight;
                    
                    // apply
                    servicesHeight = (mainHeight - closeButtonHeight - headerHeight + 1);
                    cookies.userInterface.css('cookiesScrollbarParent', 'height', servicesHeight + 'px');
                }
                
                // align the main allow/deny button depending on scrollbar width
                if (document.getElementById('cookiesScrollbarParent') !== null && document.getElementById('cookiesScrollbarChild') !== null) {
                    
                    // media query
                    if (e[a + 'Width'] <= 479) {
                        cookies.userInterface.css('cookiesScrollbarAdjust', 'marginLeft', '11px');
                    } else if (e[a + 'Width'] <= 767) {
                        scrollbarMarginRight = 12;
                    }
                    
                    scrollbarWidthParent = document.getElementById('cookiesScrollbarParent').offsetWidth;
                    scrollbarWidthChild = document.getElementById('cookiesScrollbarChild').offsetWidth;
                    cookies.userInterface.css('cookiesScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
                }
                
                // center the main panel
                if (document.getElementById('cookies') !== null) {
                    
                    // media query
                    if (e[a + 'Width'] <= 767) {
                        mainTop = 0;
                    } else {
                        mainTop = ((windowInnerHeight - document.getElementById('cookies').offsetHeight) / 2) - 21;
                    }
                    
                    // correct
                    if (mainTop < 0) {
                        mainTop = 0;
                    }
                    
                    if (document.getElementById('cookiesMainLineOffset') !== null) {
                        if (document.getElementById('cookies').offsetHeight < (windowInnerHeight / 2)) {
                            mainTop -= document.getElementById('cookiesMainLineOffset').offsetHeight;
                        }
                    }
                    
                    // apply
                    cookies.userInterface.css('cookies', 'top', mainTop + 'px');
                }


            } else if (type === 'cookie') {
                
                // put CookiesP list at bottom
                if (document.getElementById('cookiesAlertSmall') !== null) {
                    cookies.userInterface.css('cookiesCookiesPListContainer', 'bottom', (document.getElementById('cookiesAlertSmall').offsetHeight) + 'px');
                }
                
                // height of CookiesP list
                if (document.getElementById('cookiesCookiesPListContainer') !== null) {
                    
                    // reset
                    cookies.userInterface.css('cookiesCookiesPList', 'height', 'auto');
                    
                    // calculate
                    CookiesPListHeight = document.getElementById('cookiesCookiesPListContainer').offsetHeight;
                    CookiesPCloseHeight = document.getElementById('cookiesClosePanelCookie').offsetHeight;
                    CookiesPTitleHeight = document.getElementById('cookiesCookiesPTitle').offsetHeight;
                    
                    // apply
                    cookies.userInterface.css('cookiesCookiesPList', 'height', (CookiesPListHeight - CookiesPCloseHeight - CookiesPTitleHeight - 2) + 'px');
                }
            }
        }
    },
    "cookie": {
        "owner": {},
        "create": function (key, status) {
            "use strict";

            if (cookiesForceExpire !== '') {
                // The number of day cann't be higher than 1 year
                timeExipre = (cookiesForceExpire > 365) ? 31536000000 : cookiesForceExpire * 86400000; // Multiplication to tranform the number of days to milliseconds
            }

            var d = new Date(),
                time = d.getTime(),
                expireTime = time + timeExipre, // 365 days
                regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                cookie = cookies.cookie.read().replace(regex, ""),
                value = 'cookies=' + cookie + '!' + key + '=' + status,
                domain = (cookies.parameters.cookieDomain !== undefined && cookies.parameters.cookieDomain !== '') ? 'domain=' + cookies.parameters.cookieDomain + ';' : '';

          if (cookies.cookie.read().indexOf(key + '=' + status) === -1) {
                cookies.pro('!' + key + '=' + status);
            }

            d.setTime(expireTime);
            document.cookie = value + '; expires=' + d.toGMTString() + '; path=/;' + domain;
        },
        "read": function () {
            "use strict";
            var nameEQ = "cookies=",
                ca = document.cookie.split(';'),
                i,
                c;

            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return '';
        },
        "purge": function (arr) {
            "use strict";
            var i;
            
            for (i = 0; i < arr.length; i += 1) {
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
            }
        },
        "checkCount": function (key) {
            "use strict";
            var arr = cookies.services[key].CookiesP,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');
            
            if (status >= 0 && nb === 0) {
                html += cookies.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                        if (cookies.cookie.owner[arr[i]] === undefined) {
                            cookies.cookie.owner[arr[i]] = [];
                        }
                        if (cookies.cookie.crossIndexOf(cookies.cookie.owner[arr[i]], cookies.services[key].name) === false) {
                            cookies.cookie.owner[arr[i]].push(cookies.services[key].name);
                        }
                    }
                }
                
                if (nbCurrent > 0) {
                    html += cookies.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += cookies.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = cookies.lang.noCookie;
            } else {
                html += cookies.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }
            
            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        },
        "crossIndexOf": function (arr, match) {
            "use strict";
            var i;
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] === match) {
                    return true;
                }
            }
            return false;
        },
        "number": function () {
            "use strict";
            var CookiesP = document.cookie.split(';'),
                nb = (document.cookie !== '') ? CookiesP.length : 0,
                html = '',
                i,
                name,
                namea,
                nameb,
                c,
                d,
                s = (nb > 1) ? 's' : '',
                savedname,
                regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                regexedDomain = (cookies.cdn.match(regex) !== null) ? cookies.cdn.match(regex)[1] : cookies.cdn,
                host = (cookies.domain !== undefined) ? cookies.domain : regexedDomain;
            
            CookiesP = CookiesP.sort(function (a, b) {
                namea = a.split('=', 1).toString().replace(/ /g, '');
                nameb = b.split('=', 1).toString().replace(/ /g, '');
                c = (cookies.cookie.owner[namea] !== undefined) ? cookies.cookie.owner[namea] : '0';
                d = (cookies.cookie.owner[nameb] !== undefined) ? cookies.cookie.owner[nameb] : '0';
                if (c + a > d + b) { return 1; }
                if (c + a < d + b) { return -1; }
                return 0;
            });
            
            if (document.cookie !== '') {
                for (i = 0; i < nb; i += 1) {
                    name = CookiesP[i].split('=', 1).toString().replace(/ /g, '');
                    if (cookies.cookie.owner[name] !== undefined && cookies.cookie.owner[name].join(' // ') !== savedname) {
                        savedname = cookies.cookie.owner[name].join(' // ');
                        html += '<div class="cookiesHidden">';
                        html += '     <div class="cookiesTitle">';
                        html += '        ' + cookies.cookie.owner[name].join(' // ');
                        html += '    </div>';
                        html += '</div>';
                    } else if (cookies.cookie.owner[name] === undefined && host !== savedname) {
                        savedname = host;
                        html += '<div class="cookiesHidden">';
                        html += '     <div class="cookiesTitle">';
                        html += '        ' + host;
                        html += '    </div>';
                        html += '</div>';
                    }
                    html += '<div class="cookiesCookiesPListMain">';
                    html += '    <div class="cookiesCookiesPListLeft"><a href="#" onclick="cookies.cookie.purge([\'' + CookiesP[i].split('=', 1) + '\']);cookies.cookie.number();cookies.userInterface.jsSizing(\'cookie\');return false"><b>&times;</b></a> <b>' + name + '</b>';
                    html += '    </div>';
                    html += '    <div class="cookiesCookiesPListRight">' + CookiesP[i].split('=').slice(1).join('=') + '</div>';
                    html += '</div>';
                }
            } else {
                html += '<div class="cookiesCookiesPListMain">';
                html += '    <div class="cookiesCookiesPListLeft"><b>-</b></div>';
                html += '    <div class="cookiesCookiesPListRight"></div>';
                html += '</div>';
            }
            
            html += '<div class="cookiesHidden" style="height:20px;display:block"></div>';
            
            if (document.getElementById('cookiesCookiesPList') !== null) {
                document.getElementById('cookiesCookiesPList').innerHTML = html;
            }
            
            if (document.getElementById('cookiesCookiesPNumber') !== null) {
                document.getElementById('cookiesCookiesPNumber').innerHTML = nb;
            }
            
            if (document.getElementById('cookiesCookiesPNumberBis') !== null) {
                document.getElementById('cookiesCookiesPNumberBis').innerHTML = nb + ' cookie' + s;
            }
            
            for (i = 0; i < cookies.job.length; i += 1) {
                cookies.cookie.checkCount(cookies.job[i]);
            }
        }
    },
    "getLanguage": function () {
        "use strict";
        if (!navigator) { return 'en'; }
        
        var availableLanguages = 'cs,en,fr,es,it,de,nl,pt,pl,ru',
            defaultLanguage = 'en',
            lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang.substr(0, 2);

        if (cookiesForceLanguage !== '') {
            if (availableLanguages.indexOf(cookiesForceLanguage) !== -1) {
                return cookiesForceLanguage;
            }
        }
        
        if (availableLanguages.indexOf(userLanguage) === -1) {
            return defaultLanguage;
        }
        return userLanguage;
    },
    "getLocale": function () {
        "use strict";
        if (!navigator) { return 'en_US'; }
        
        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang.substr(0, 2);
        
        if (userLanguage === 'fr') {
            return 'fr_FR';
        } else if (userLanguage === 'en') {
            return 'en_US';
        } else if (userLanguage === 'de') {
            return 'de_DE';
        } else if (userLanguage === 'es') {
            return 'es_ES';
        } else if (userLanguage === 'it') {
            return 'it_IT';
        } else if (userLanguage === 'pt') {
            return 'pt_PT';
        } else if (userLanguage === 'nl') {
            return 'nl_NL';
        } else {
            return 'en_US';
        }
    },
    "addScript": function (url, id, callback, execute, attrName, attrVal) {
        "use strict";
        var script,
            done = false;
        
        if (execute === false) {
            if (typeof callback === 'function') {
                callback();
            }
        } else {
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = (id !== undefined) ? id : '';
            script.async = true;
            script.src = url;
            
            if (attrName !== undefined && attrVal !== undefined) {
                script.setAttribute(attrName, attrVal);
            }

            if (typeof callback === 'function') {
                script.onreadystatechange = script.onload = function () {
                    var state = script.readyState;
                    if (!done && (!state || /loaded|complete/.test(state))) {
                        done = true;
                        callback();
                    }
                };
            }
    
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    },
    "makeAsync": {
        "antiGhost": 0,
        "buffer": '',
        "init": function (url, id) {
            "use strict";
            var savedWrite = document.write,
                savedWriteln = document.writeln;

            document.write = function (content) {
                cookies.makeAsync.buffer += content;
            };
            document.writeln = function (content) {
                cookies.makeAsync.buffer += content.concat("\n");
            };
        
            setTimeout(function () {
                document.write = savedWrite;
                document.writeln = savedWriteln;
            }, 20000);
            
            cookies.makeAsync.getAndParse(url, id);
        },
        "getAndParse": function (url, id) {
            "use strict";
            if (cookies.makeAsync.antiGhost > 9) {
                cookies.makeAsync.antiGhost = 0;
                return;
            }
            cookies.makeAsync.antiGhost += 1;
            cookies.addScript(url, '', function () {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).innerHTML += "<span style='display:none'>&nbsp;</span>" + cookies.makeAsync.buffer;
                    cookies.makeAsync.buffer = '';
                    cookies.makeAsync.execJS(id);
                }
            });
        },
        "execJS": function (id) {
            /* not strict because third party scripts may have errors */
            var i,
                scripts,
                childId,
                type;

            if (document.getElementById(id) === null) {
                return;
            }
            
            scripts = document.getElementById(id).getElementsByTagName('script');
            for (i = 0; i < scripts.length; i += 1) {
                type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
                if (type === '') {
                    type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
                }
                if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
                    childId = id + Math.floor(Math.random() * 99999999999);
                    document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
                    cookies.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
                } else if (type.indexOf('javascript') !== -1 || type === '') {
                    eval(scripts[i].innerHTML);
                }
            }
        }
    },
    "fallback": function (matchClass, content, noInner) {
        "use strict";
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if ((' ' + elems[i].className + ' ')
                            .indexOf(' ' + matchClass[index] + ' ') > -1) {
                        if (typeof content === 'function') {
                            if (noInner === true) {
                                content(elems[i]);
                            } else {
                                elems[i].innerHTML = content(elems[i]);
                            }
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    "engage": function (id) {
        "use strict";
        var html = '',
            r = Math.floor(Math.random() * 100000);
                
        html += '<div class="tac_activate">';
        html += '   <div class="tac_float">';
        html += '      <b>' + cookies.services[id].name + '</b> ' + cookies.lang.fallback;
        html += '      <div class="cookiesAllow" id="Eng' + r + 'ed' + id + '" onclick="cookies.userInterface.respond(this, true);">';
        html += '          &#10003; ' + cookies.lang.allow;
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
        
        return html;
    },
    "extend": function (a, b) {
        "use strict";
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    "proTemp": '',
    "proTimer": function () {
        "use strict";
        setTimeout(cookies.proPing, 1000);
    },
    "pro": function (list) {
        "use strict";
        cookies.proTemp += list;
        clearTimeout(cookies.proTimer);
        cookies.proTimer = setTimeout(cookies.proPing, 2500);
    },
    "proPing": function () {
        "use strict";
        if (cookies.uuid !== '' && cookies.uuid !== undefined && cookies.proTemp !== '') {
            var div = document.getElementById('cookiesPremium'),
                timestamp = new Date().getTime(),
                url = '//opt-out.ferank.eu/premium.php?';
            
            if (div === null) {
                return;
            }
            
            url += 'domain=' + cookies.domain + '&';
            url += 'uuid=' + cookies.uuid + '&';
            url += 'c=' + encodeURIComponent(cookies.proTemp) + '&';
            url += '_' + timestamp;
            
            div.innerHTML = '<img src="' + url + '" style="display:none" />';
            
            cookies.proTemp = '';
        }
        
        cookies.cookie.number();
    }
};
