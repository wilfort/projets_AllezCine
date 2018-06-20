/*global cookies, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// generic iframe
cookies.services.iframe = {
    "key": "iframe",
    "type": "other",
    "name": "Web content",
    "uri": "",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['tac_iframe'], function (x) {
            var width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url");

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'iframe';
        cookies.fallback(['tac_iframe'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// addthis
cookies.services.addthis = {
    "key": "addthis",
    "type": "social",
    "name": "AddThis",
    "uri": "https://www.addthis.com/privacy/privacy-policy#publisher-visitors",
    "needConsent": true,
    "CookiesP": ['__atuvc', '__atuvs'],
    "js": function () {
        "use strict";
        if (cookies.user.addthisPubId === undefined) {
            return;
        }
        if (cookies.isAjax === true) {
            window.addthis = null;
            window._adr = null;
            window._atc = null;
            window._atd = null;
            window._ate = null;
            window._atr = null;
            window._atw = null;
        }
        cookies.fallback(['addthis_sharing_toolbox'], '');
        cookies.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + cookies.user.addthisPubId);
    },
    "fallback": function () {
        "use strict";
        var id = 'addthis';
        cookies.fallback(['addthis_sharing_toolbox'], cookies.engage(id));
    }
};

// addtoanyfeed
cookies.services.addtoanyfeed = {
    "key": "addtoanyfeed",
    "type": "social",
    "name": "AddToAny (feed)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.addtoanyfeedUri === undefined) {
            return;
        }
        cookies.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + cookies.user.addtoanyfeedUri;
        window.a2a_config = window.a2a_config || {};
        window.a2a_config.linkurl = cookies.user.addtoanyfeedUri;
        cookies.addScript('//static.addtoany.com/menu/feed.js');
    },
    "fallback": function () {
        "use strict";
        cookies.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + cookies.user.addtoanyfeedUri;
    }
};

// addtoanyshare
cookies.services.addtoanyshare = {
    "key": "addtoanyshare",
    "type": "social",
    "name": "AddToAny (share)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['tac_addtoanyshare'], '');
        cookies.addScript('//static.addtoany.com/menu/page.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'addtoanyshare';
        cookies.fallback(['tac_addtoanyshare'], cookies.engage(id));
    }
};

// aduptech ads
cookies.services.aduptech_ads = {
    "key": "aduptech_ads",
    "type": "ads",
    "name": "Ad Up Technology (ads)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_ads",
            API_URL = "https://s.d.adup-tech.com/jsapi";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        cookies.fallback([IDENTIFIER], "");

        cookies.addScript(API_URL, "", function() {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (!element.getAttribute("id")) {
                    element.setAttribute("id", IDENTIFIER + Math.random().toString(36).substr(2, 9));
                }

                window.uAd.embed(element.getAttribute("id"), {
                    placementKey: element.getAttribute("placementKey"),
                    responsive: Boolean(element.getAttribute("responsive")),
                    lazy: Boolean(element.getAttribute("lazy")),
                    adtest: Boolean(element.getAttribute("test")),
                    query: element.getAttribute("query") || "",
                    minCpc: element.getAttribute("minCpc") || "",
                    pageUrl: element.getAttribute("pageUrl") || "",
                    skip: element.getAttribute("skip") || ""
                });
            }
        });

    },
    "fallback": function () {
        "use strict";
        cookies.fallback(["aduptech_ads"], cookies.engage("aduptech_ads"));
    }
};

// aduptech conversion
cookies.services.aduptech_conversion = {
    "key": "aduptech_conversion",
    "type": "ads",
    "name": "Ad Up Technology (conversion)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_conversion",
            CONVERSION_PIXEL_BASE_URL = "https://d.adup-tech.com/campaign/conversion";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        cookies.fallback([IDENTIFIER], "");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];  
                
            if (!element.getAttribute("advertiserId") || !element.getAttribute("conversionCode")) {
                continue;
            }
            
            var url = CONVERSION_PIXEL_BASE_URL + 
                "/" + encodeURIComponent(element.getAttribute("advertiserId")) + 
                "?t=" + encodeURIComponent(element.getAttribute("conversionCode"));   
            
            if (element.getAttribute("price")) {
                url += "&price=" + encodeURIComponent(element.getAttribute("price"));
            }
            
            if (element.getAttribute("quantity")) {
                url += "&quantity=" + encodeURIComponent(element.getAttribute("quantity"));
            }
            
            if (element.getAttribute("total")) {
                url += "&total=" + encodeURIComponent(element.getAttribute("total"));
            }
            
            if (element.getAttribute("orderId")) {
                url += "&order_id=" + encodeURIComponent(element.getAttribute("orderId"));
            }
            
            if (element.getAttribute("itemNumber")) {
                url += "&item_number=" + encodeURIComponent(element.getAttribute("itemNumber"));
            }
            
            if (element.getAttribute("description")) {
                url += "&description=" + encodeURIComponent(element.getAttribute("description"));
            }

            (new Image()).src = url;            
        }
    }
};

// aduptech retargeting
cookies.services.aduptech_retargeting = {
    "key": "aduptech_retargeting",
    "type": "ads",
    "name": "Ad Up Technology (retargeting)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_retargeting",
            API_URL = "https://s.d.adup-tech.com/services/retargeting.js";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        cookies.fallback([IDENTIFIER], "");

        window.AdUpRetargeting = function(api) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                api.init();

                api.setAccount(element.getAttribute("account"));

                if (element.getAttribute("email")) {
                    api.setEmail(element.getAttribute("email"));
                } else if (element.getAttribute("hashedEmail")) {
                    api.setHashedEmail(element.getAttribute("hashedEmail"));
                }

                if (element.getAttribute("product")) {
                    try {
                        api.setProduct(JSON.parse(element.getAttribute("product")));
                    } catch (e) {
                        api.setProduct(element.getAttribute("product"));
                    }
                }

                if (element.getAttribute("transaction")) {
                    try {
                        api.setTransaction(JSON.parse(element.getAttribute("transaction")));
                    } catch (e) {
                        api.setTransaction(element.getAttribute("transaction"));
                    }
                }

                if (element.getAttribute("demarkUser")) {
                    api.setDemarkUser();
                } else if (element.getAttribute("demarkProducts")) {
                    api.setDemarkProducts();
                }

                if (element.getAttribute("conversionCode")) {
                    api.setConversionCode(element.getAttribute("conversionCode"));
                }

                if (element.getAttribute("device")) {
                    var setter = "set" + element.getAttribute("device").charAt(0).toUpperCase() + element.getAttribute("device").slice(1);
                    if (typeof api[setter] === 'function') {
                        api[setter]();
                    }
                }

                if (element.getAttribute("track")) {
                    var tracker = "track" + element.getAttribute("track").charAt(0).toUpperCase() + element.getAttribute("track").slice(1);
                    if (typeof api[tracker] === "function") {
                        api[tracker]();
                    } else {
                        api.trackHomepage();
                    }
                }
            };
        };

        cookies.addScript(API_URL);
    }
};

// alexa
cookies.services.alexa = {
    "key": "alexa",
    "type": "analytic",
    "name": "Alexa",
    "uri": "https://www.alexa.com/help/privacy",
    "needConsent": true,
    "CookiesP": ['__asc', '__auc'],
    "js": function () {
        "use strict";
        if (cookies.user.alexaAccountID === undefined) {
            return;
        }
        window._atrk_opts = {
            atrk_acct: cookies.user.alexaAccountID,
            domain: window.location.hostname.match(/[^\.]*\.[^.]*$/)[0],
            dynamic: true
        };
        cookies.addScript('https://d31qbv1cthcecs.cloudfront.net/atrk.js');
    }
};

// amazon
cookies.services.amazon = {
    "key": "amazon",
    "type": "ads",
    "name": "Amazon",
    "uri": "https://www.amazon.fr/gp/help/customer/display.html?ie=UTF8&*Version*=1&*entries*=0&nodeId=201149360",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['amazon_product'], function (x) {
            var amazonId = x.getAttribute("amazonid"),
                productId = x.getAttribute("productid"),
                url = '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=' + cookies.getLanguage().toUpperCase() + '&source=ss&ref=ss_til&ad_type=product_link&tracking_id=' + amazonId + '&marketplace=amazon&region=' + cookies.getLanguage().toUpperCase() + '&placement=' + productId + '&asins=' + productId + '&show_border=true&link_opens_in_new_window=true',
                iframe = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="' + url + '"></iframe>';

            return iframe;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'amazon';
        cookies.fallback(['amazon_product'], cookies.engage(id));
    }
};

// calameo
cookies.services.calameo = {
    "key": "calameo",
    "type": "video",
    "name": "Calameo",
    "uri": "https://fr.calameo.com/privacy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['calameo-canvas'], function (x) {
            var id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//v.calameo.com/?bkcode=' + id;

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'calameo';
        cookies.fallback(['calameo-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// clicky
cookies.services.clicky = {
    "key": "clicky",
    "type": "analytic",
    "name": "Clicky",
    "uri": "https://clicky.com/terms",
    "needConsent": true,
    "CookiesP": ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + cookies.user.clickyId, 'unpoco_' + cookies.user.clickyId, 'heatmaps_g2g_' + cookies.user.clickyId],
    "js": function () {
        "use strict";
        if (cookies.user.clickyId === undefined) {
            return;
        }
        cookies.addScript('//static.getclicky.com/js', '', function () {
            if (typeof clicky.init === 'function') {
                clicky.init(cookies.user.clickyId);
            }
            if (typeof cookies.user.clickyMore === 'function') {
                cookies.user.clickyMore();
            }
        });
    }
};

// clicmanager
cookies.services.clicmanager = {
    "key": "clicmanager",
    "type": "ads",
    "name": "Clicmanager",
    "uri": "http://www.clicmanager.fr/infos_legales.php",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        cookies.fallback(['clicmanager-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" c="' + x.getAttribute('c') + '" s="' + x.getAttribute('s') + '" t="' + x.getAttribute('t') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ads.clicmanager.fr/exe.php?';
            uri += 'c=' + document.getElementById(uniqIds[i]).getAttribute('c') + '&';
            uri += 's=' + document.getElementById(uniqIds[i]).getAttribute('s') + '&';
            uri += 't=' + document.getElementById(uniqIds[i]).getAttribute('t');

            cookies.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'clicmanager';
        cookies.fallback(['clicmanager-canvas'], cookies.engage(id));
    }
};

// crazyegg
cookies.services.crazyegg = {
    "key": "crazyegg",
    "type": "analytic",
    "name": "Crazy Egg",
    "uri": "https://www.crazyegg.com/privacy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";

        if (cookies.user.crazyeggId === undefined) {
            return;
        }

        cookies.addScript('//script.crazyegg.com/pages/scripts/' + cookies.user.crazyeggId.substr(0, 4) + '/' + cookies.user.crazyeggId.substr(4, 4) + '.js');
    }
};

// criteo
cookies.services.criteo = {
    "key": "criteo",
    "type": "ads",
    "name": "Criteo",
    "uri": "http://www.criteo.com/privacy/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        document.MAX_ct0 = '';
        var uniqIds = [],
            i,
            uri;

        cookies.fallback(['criteo-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" zoneid="' + x.getAttribute('zoneid') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//cas.criteo.com/delivery/ajs.php?';
            uri += 'zoneid=' + document.getElementById(uniqIds[i]).getAttribute('zoneid');
            uri += '&nodis=1&cb=' + Math.floor(Math.random() * 99999999999);
            uri += '&loc=' + encodeURI(window.location);
            uri += (document.MAX_used !== ',') ? '&exclude=' + document.MAX_used : '';
            uri += (document.charset !== undefined ? '&charset=' + document.charset : '');
            uri += (document.characterSet !== undefined ? '&charset=' + document.characterSet : '');
            uri += (document.referrer !== undefined) ? '&referer=' + encodeURI(document.referrer) : '';
            uri += (document.context !== undefined) ? '&context=' + encodeURI(document.context) : '';
            uri += ((document.MAX_ct0 !== undefined) && (document.MAX_ct0.substring(0, 4) === 'http')) ? '&ct0=' + encodeURI(document.MAX_ct0) : '';
            uri += (document.mmm_fo !== undefined) ? '&mmm_fo=1' : '';

            cookies.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'criteo';
        cookies.fallback(['criteo-canvas'], cookies.engage(id));
    }
};

// dailymotion
cookies.services.dailymotion = {
    "key": "dailymotion",
    "type": "video",
    "name": "Dailymotion",
    "uri": "https://www.dailymotion.com/legal/privacy",
    "needConsent": true,
    "CookiesP": ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
    "js": function () {
        "use strict";
        cookies.fallback(['dailymotion_player'], function (x) {
            var video_id = x.getAttribute("videoID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame,
                params = 'info=' + x.getAttribute("showinfo") + '&autoPlay=' + x.getAttribute("autoplay");

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe src="//www.dailymotion.com/embed/video/' + video_id + '?' + params + '" ' + frame_width + frame_height + ' frameborder="0" allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'dailymotion';
        cookies.fallback(['dailymotion_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// dating affiliation
cookies.services.datingaffiliation = {
    "key": "datingaffiliation",
    "type": "ads",
    "name": "Dating Affiliation",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['datingaffiliation-canvas'], function (x) {
            var comfrom = x.getAttribute("data-comfrom"),
                r = x.getAttribute("data-r"),
                p = x.getAttribute("data-p"),
                cf0 = x.getAttribute("data-cf0"),
                langue = x.getAttribute("data-langue"),
                forward_affiliate = x.getAttribute("data-forwardAffiliate"),
                cf2 = x.getAttribute("data-cf2"),
                cfsa2 = x.getAttribute("data-cfsa2"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'http://www.tools-affil2.com/rotaban/ban.php?' + comfrom;

            return '<iframe src="' + url + '&r=' + r + '&p=' + p + '&cf0=' + cf0 + '&langue=' + langue + '&forward_affiliate=' + forward_affiliate + '&cf2=' + cf2 + '&cfsa2=' + cfsa2 + '" width="' + width + '" height="' + height + '" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliation';
        cookies.fallback(['datingaffiliation-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// dating affiliation popup
cookies.services.datingaffiliationpopup = {
    "key": "datingaffiliationpopup",
    "type": "ads",
    "name": "Dating Affiliation (Pop Up)",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "CookiesP": ['__utma', '__utmb', '__utmc', '__utmt_Tools', '__utmv', '__utmz', '_ga', '_gat', '_gat_UA-65072040-17', '__da-pu-xflirt-ID-pc-o169'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        cookies.fallback(['datingaffiliationpopup-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" uri="' + x.getAttribute('uri') + '" comfrom="' + x.getAttribute('comfrom') + '" promo="' + x.getAttribute('promo') + '" productid="' + x.getAttribute('productid') + '" submitconfig="' + x.getAttribute('submitconfig') + '" ur="' + x.getAttribute('ur') + '" brand="' + x.getAttribute('brand') + '" lang="' + x.getAttribute('lang') + '" cf0="' + x.getAttribute('cf0') + '" cf2="' + x.getAttribute('cf2') + '" subid1="' + x.getAttribute('subid1') + '" cfsa2="' + x.getAttribute('cfsa2') + '" subid2="' + x.getAttribute('subid2') + '" nicheid="' + x.getAttribute('nicheid') + '" degreid="' + x.getAttribute('degreid') + '" bt="' + x.getAttribute('bt') + '" vis="' + x.getAttribute('vis') + '" hid="' + x.getAttribute('hid') + '" snd="' + x.getAttribute('snd') + '" aabd="' + x.getAttribute('aabd') + '" aabs="' + x.getAttribute('aabs') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://www.promotools.biz/da/popunder/script.php?';
            uri += 'comfrom=' + document.getElementById(uniqIds[i]).getAttribute('comfrom') + '&';
            uri += 'promo=' + document.getElementById(uniqIds[i]).getAttribute('promo') + '&';
            uri += 'product_id=' + document.getElementById(uniqIds[i]).getAttribute('productid') + '&';
            uri += 'submitconfig=' + document.getElementById(uniqIds[i]).getAttribute('submitconfig') + '&';
            uri += 'ur=' + document.getElementById(uniqIds[i]).getAttribute('ur') + '&';
            uri += 'brand=' + document.getElementById(uniqIds[i]).getAttribute('brand') + '&';
            uri += 'lang=' + document.getElementById(uniqIds[i]).getAttribute('lang') + '&';
            uri += 'cf0=' + document.getElementById(uniqIds[i]).getAttribute('cf0') + '&';
            uri += 'cf2=' + document.getElementById(uniqIds[i]).getAttribute('cf2') + '&';
            uri += 'subid1=' + document.getElementById(uniqIds[i]).getAttribute('subid1') + '&';
            uri += 'cfsa2=' + document.getElementById(uniqIds[i]).getAttribute('cfsa2') + '&';
            uri += 'subid2=' + document.getElementById(uniqIds[i]).getAttribute('subid2') + '&';
            uri += 'nicheId=' + document.getElementById(uniqIds[i]).getAttribute('nicheid') + '&';
            uri += 'degreId=' + document.getElementById(uniqIds[i]).getAttribute('degreid') + '&';
            uri += 'bt=' + document.getElementById(uniqIds[i]).getAttribute('bt') + '&';
            uri += 'vis=' + document.getElementById(uniqIds[i]).getAttribute('vis') + '&';
            uri += 'hid=' + document.getElementById(uniqIds[i]).getAttribute('hid') + '&';
            uri += 'snd=' + document.getElementById(uniqIds[i]).getAttribute('snd') + '&';
            uri += 'aabd=' + document.getElementById(uniqIds[i]).getAttribute('aabd') + '&';
            uri += 'aabs=' + document.getElementById(uniqIds[i]).getAttribute('aabs');

            cookies.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliationpopup';
        cookies.fallback(['datingaffiliationpopup-canvas'], cookies.engage(id));
    }
};

// disqus
cookies.services.disqus = {
    "key": "disqus",
    "type": "comment",
    "name": "Disqus",
    "uri": "https://help.disqus.com/customer/portal/articles/466259-privacy-policy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.disqusShortname === undefined) {
            return;
        }
        cookies.addScript('//' + cookies.user.disqusShortname + '.disqus.com/embed.js');
        cookies.addScript('//' + cookies.user.disqusShortname + '.disqus.com/count.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'disqus';

        if (document.getElementById('disqus_thread')) {
            document.getElementById('disqus_thread').innerHTML = cookies.engage(id);
        }
    }
};

// ekomi
cookies.services.ekomi = {
    "key": "ekomi",
    "type": "social",
    "name": "eKomi",
    "uri": "http://www.ekomi-us.com/us/privacy/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.ekomiCertId === undefined) {
            return;
        }
        window.eKomiIntegrationConfig = [
            {certId: cookies.user.ekomiCertId}
        ];
        cookies.addScript('//connect.ekomi.de/integration_1410173009/' + cookies.user.ekomiCertId + '.js');
    }
};

// etracker
cookies.services.etracker = {
    "key": "etracker",
    "type": "analytic",
    "name": "eTracker",
    "uri": "https://www.etracker.com/en/data-protection.html",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.etracker === undefined) {
            return;
        }

        cookies.addScript('//static.etracker.com/code/e.js', '_etLoader', function () {}, true, "data-secure-code", cookies.user.etracker);
    }
};

// facebook
cookies.services.facebook = {
    "key": "facebook",
    "type": "social",
    "name": "Facebook",
    "uri": "https://www.facebook.com/policies/CookiesP/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like'], '');
        cookies.addScript('//connect.facebook.net/' + cookies.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (cookies.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebook';
        cookies.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like'], cookies.engage(id));
    }
};

// facebooklikebox
cookies.services.facebooklikebox = {
    "key": "facebooklikebox",
    "type": "social",
    "name": "Facebook (like box)",
    "uri": "https://www.facebook.com/policies/CookiesP/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['fb-like-box', 'fb-page'], '');
        cookies.addScript('//connect.facebook.net/' + cookies.getLocale() + '/sdk.js#xfbml=1&version=v2.3', 'facebook-jssdk');
        if (cookies.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebooklikebox';
        cookies.fallback(['fb-like-box', 'fb-page'], cookies.engage(id));
    }
};

// facebookcomment
cookies.services.facebookcomment = {
    "key": "facebookcomment",
    "type": "comment",
    "name": "Facebook (commentaire)",
    "uri": "https://www.facebook.com/policies/CookiesP/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['fb-comments'], '');
        cookies.addScript('//connect.facebook.net/' + cookies.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (cookies.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcomment';
        cookies.fallback(['fb-comments'], cookies.engage(id));
    }
};

// ferank
cookies.services.ferank = {
    "key": "ferank",
    "type": "analytic",
    "name": "FERank",
    "uri": "https://www.ferank.fr/respect-vie-privee/#mesureaudience",
    "needConsent": false,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('//static.ferank.fr/pixel.js', '', function () {
            if (typeof cookies.user.ferankMore === 'function') {
                cookies.user.ferankMore();
            }
        });
    }
};

// ferank pub
cookies.services.ferankpub = {
    "key": "ferankpub",
    "type": "ads",
    "name": "FERank (pub)",
    "uri": "https://www.ferank.fr/respect-vie-privee/#regiepublicitaire",
    "needConsent": false,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('//static.ferank.fr/publicite.async.js');
        if (cookies.isAjax === true) {
            if (typeof ferankReady === 'function') {
                ferankReady();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'ferankpub';
        cookies.fallback(['ferank-publicite'], cookies.engage(id));
    }
};

// get+
cookies.services.getplus = {
    "key": "getplus",
    "type": "analytic",
    "name": "Get+",
    "uri": "http://www.getplus.fr/Conditions-generales-de-vente_a226.html",
    "needConsent": true,
    "CookiesP": ['_first_pageview', '_jsuid', 'no_trackyy_' + cookies.user.getplusId, '_eventqueue'],
    "js": function () {
        "use strict";
        if (cookies.user.getplusId === undefined) {
            return;
        }

        window.webleads_site_ids = window.webleads_site_ids || [];
        window.webleads_site_ids.push(cookies.user.getplusId);
        cookies.addScript('//stats.webleads-tracker.com/js');
    }
};

// google+
cookies.services.gplus = {
    "key": "gplus",
    "type": "social",
    "name": "Google+",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplus';
        cookies.fallback(['g-plus', 'g-plusone'], cookies.engage(id));
    }
};

// google+ badge
cookies.services.gplusbadge = {
    "key": "gplusbadge",
    "type": "social",
    "name": "Google+ (badge)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplusbadge';
        cookies.fallback(['g-page', 'g-person'], cookies.engage(id));
    }
};

// google adsense
cookies.services.adsense = {
    "key": "adsense",
    "type": "ads",
    "name": "Google Adsense",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsense';
        cookies.fallback(['adsbygoogle'], cookies.engage(id));
    }
};

// google partners badge
cookies.services.googlepartners = {
    "key": "googlepartners",
    "type": "ads",
    "name": "Google Partners Badge",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'googlepartners';
        cookies.fallback(['g-partnersbadge'], cookies.engage(id));
    }
};

// google adsense search (form)
cookies.services.adsensesearchform = {
    "key": "adsensesearchform",
    "type": "ads",
    "name": "Google Adsense Search (form)",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('//www.google.com/coop/cse/brand?form=cse-search-box&lang=' + cookies.getLanguage());
    }
};

// google adsense search (result)
cookies.services.adsensesearchresult = {
    "key": "adsensesearchresult",
    "type": "ads",
    "name": "Google Adsense Search (result)",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.adsensesearchresultCx === undefined) {
            return;
        }
        cookies.addScript('//www.google.com/cse/cse.js?cx=' + cookies.user.adsensesearchresultCx);
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearchresult';

        if (document.getElementById('gcse_searchresults')) {
            document.getElementById('gcse_searchresults').innerHTML = cookies.engage(id);
        }
    }
};

// googleadwordsconversion
cookies.services.googleadwordsconversion = {
    "key": "googleadwordsconversion",
    "type": "ads",
    "name": "Google Adwords (conversion)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.adwordsconversionId === undefined) {
            return;
        }

        cookies.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: cookies.user.adwordsconversionId,
                google_conversion_label: cookies.user.adwordsconversionLabel,
                google_conversion_language: cookies.user.adwordsconversionLanguage,
                google_conversion_format: cookies.user.adwordsconversionFormat,
                google_conversion_color: cookies.user.adwordsconversionColor,
                google_conversion_value: cookies.user.adwordsconversionValue,
                google_conversion_currency: cookies.user.adwordsconversionCurrency,
                google_custom_params: {
                    parameter1: cookies.user.adwordsconversionCustom1,
                    parameter2: cookies.user.adwordsconversionCustom2
                }
            });
        });
    }
};

// googleadwordsremarketing
cookies.services.googleadwordsremarketing = {
    "key": "googleadwordsremarketing",
    "type": "ads",
    "name": "Google Adwords (remarketing)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.adwordsremarketingId === undefined) {
            return;
        }

        cookies.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: cookies.user.adwordsremarketingId,
                google_remarketing_only: true
            });
        });
    }
};

// google analytics (old)
cookies.services.gajs = {
    "key": "gajs",
    "type": "analytic",
    "name": "Google Analytics (ga.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "CookiesP": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'],
    "js": function () {
        "use strict";
        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', cookies.user.gajsUa]);
        window._gaq.push(['_trackPageview']);

        cookies.addScript('//www.google-analytics.com/ga.js', '', function () {
            if (typeof cookies.user.gajsMore === 'function') {
                cookies.user.gajsMore();
            }
        });
    }
};

// google analytics
cookies.services.analytics = {
    "key": "analytics",
    "type": "analytic",
    "name": "Google Analytics (universal)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "CookiesP": ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'],
    "js": function () {
        "use strict";
        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        cookies.addScript('https://www.google-analytics.com/analytics.js', '', function () {
            ga('create', cookies.user.analyticsUa, {'cookieExpires': 34128000});
            ga('send', 'pageview');
            if (typeof cookies.user.analyticsMore === 'function') {
                cookies.user.analyticsMore();
            }
        });
    }
};

// google analytics
cookies.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "CookiesP": (function () {
        // Add _gat_gtag_UA_XXXXXXX_XX cookie to CookiesP array
        var gatGtagUaCookie = '_gat_gtag_' + cookies.user.gtagUa;
        gatGtagUaCookie = gatGtagUaCookie.replace(/-/g, '_');
        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', gatGtagUaCookie];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        cookies.addScript('https://www.googletagmanager.com/gtag/js?id=' + cookies.user.gtagUa, '', function () {
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', cookies.user.gtagUa);

            if (typeof cookies.user.gtagMore === 'function') {
                cookies.user.gtagMore();
            }
        });
    }
};

// google maps
cookies.services.googlemaps = {
    "key": "googlemaps",
    "type": "api",
    "name": "Google Maps",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        var mapOptions,
            map,
            uniqIds = [],
            i;

        if (cookies.user.mapscallback === undefined) {
            cookies.user.mapscallback = 'tac_googlemaps_callback';
        }

        cookies.addScript('//maps.googleapis.com/maps/api/js?v=3.exp&key=' + cookies.user.googlemapsKey + '&callback='+cookies.user.mapscallback);

        window.tac_googlemaps_callback = function () {
            cookies.fallback(['googlemaps-canvas'], function (x) {
                var uniqId = '_' + Math.random().toString(36).substr(2, 9);
                uniqIds.push(uniqId);
                return '<div id="' + uniqId + '" zoom="' + x.getAttribute('zoom') + '" latitude="' + x.getAttribute('latitude') + '" longitude="' + x.getAttribute('longitude') + '" style="width:' + x.offsetWidth + 'px;height:' + x.offsetHeight + 'px"></div>';
            });

            for (i = 0; i < uniqIds.length; i += 1) {
                mapOptions = {
                    zoom: parseInt(document.getElementById(uniqIds[i]).getAttribute('zoom'), 10),
                    center: new google.maps.LatLng(parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10))
                };
                map = new google.maps.Map(document.getElementById(uniqIds[i]), mapOptions);
            }
        };
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemaps';
        cookies.fallback(['googlemaps-canvas'], cookies.engage(id));
    }
};

// googlemaps search
cookies.services.googlemapssearch = {
    "key": "googlemapssearch",
    "type": "api",
    "name": "Google Maps Seard API",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "CookiesP": ['nid'],
    "js": function () {
        "use strict";
        cookies.fallback(['googlemapssearch'], function (x) {
            var width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                // url = x.getAttribute("data-url");
                query = escape(x.getAttribute("data-search")),
                key = x.getAttribute("data-api-key");
            
            // return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
            return '<iframe width="' + width +'" height="' + height + '" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q='+query+'&key='+key+'" allowfullscreen></iframe> '
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapssearch';
        cookies.fallback(['googlemapssearch'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// google tag manager
cookies.services.googletagmanager = {
    "key": "googletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "CookiesP": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (cookies.user.googletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        cookies.addScript('//www.googletagmanager.com/gtm.js?id=' + cookies.user.googletagmanagerId);
    }
};

// jsapi
cookies.services.jsapi = {
    "key": "jsapi",
    "type": "api",
    "name": "Google jsapi",
    "uri": "http://www.google.com/policies/privacy/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.addScript('//www.google.com/jsapi');
    }
};

// recaptcha
cookies.services.recaptcha = {
    "key": "recaptcha",
    "type": "api",
    "name": "reCAPTCHA",
    "uri": "http://www.google.com/policies/privacy/",
    "needConsent": true,
    "CookiesP": ['nid'],
    "js": function () {
        "use strict";
        cookies.addScript('https://www.google.com/recaptcha/api.js');
    }
};

// linkedin
cookies.services.linkedin = {
    "key": "linkedin",
    "type": "social",
    "name": "Linkedin",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['tacLinkedin'], '');
        cookies.addScript('//platform.linkedin.com/in.js');
        if (cookies.isAjax === true) {
            if (typeof IN !== "undefined") {
                IN.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'linkedin';
        cookies.fallback(['tacLinkedin'], cookies.engage(id));
    }
};

// mautic
cookies.services.mautic = {
    "key": "mautic",
    "type": "analytic",
    "name": "Mautic",
    "uri": "https://www.mautic.org/privacy-policy/",
    "needConsent": true,
    "CookiesP": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (cookies.user.mauticurl === undefined) {
            return;
        }

        window['MauticTrackingObject'] = 'mt';
        window['mt'] = window['mt'] || function() {
            (window['mt'].q = window['mt'].q || []).push(arguments);
        };

        cookies.addScript(cookies.user.mauticurl, '', function() {
            mt('send', 'pageview');
        });
    }
};

// microsoftcampaignanalytics
cookies.services.microsoftcampaignanalytics = {
    "key": "microsoftcampaignanalytics",
    "type": "analytic",
    "name": "Microsoft Campaign Analytics",
    "uri": "https://privacy.microsoft.com/privacystatement/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.microsoftcampaignanalyticsUUID === undefined) {
            return;
        }

        cookies.addScript('//flex.atdmt.com/mstag/site/' + cookies.user.microsoftcampaignanalyticsUUID + '/mstag.js', 'mstag_tops', function () {
            window.mstag = {loadTag : function () {}, time : (new Date()).getTime()};
            window.mstag.loadTag("analytics", {dedup: "1", domainId: cookies.user.microsoftcampaignanalyticsdomainId, type: "1", actionid: cookies.user.microsoftcampaignanalyticsactionId});
        });
    }
};

// pinterest
cookies.services.pinterest = {
    "key": "pinterest",
    "type": "social",
    "name": "Pinterest",
    "uri": "https://about.pinterest.com/privacy-policy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['tacPinterest'], '');
        cookies.addScript('//assets.pinterest.com/js/pinit.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'pinterest';
        cookies.fallback(['tacPinterest'], cookies.engage(id));
    }
};

// prelinker
cookies.services.prelinker = {
    "key": "prelinker",
    "type": "ads",
    "name": "Prelinker",
    "uri": "http://www.prelinker.com/index/index/cgu/",
    "needConsent": true,
    "CookiesP": ['_sp_id.32f5', '_sp_ses.32f5'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        cookies.fallback(['prelinker-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" siteId="' + x.getAttribute('siteId') + '" bannerId="' + x.getAttribute('bannerId') + '" defaultLanguage="' + x.getAttribute('defaultLanguage') + '" tracker="' + x.getAttribute('tracker') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://promo.easy-dating.org/banner/index?';
            uri += 'site_id=' + document.getElementById(uniqIds[i]).getAttribute('siteId') + '&';
            uri += 'banner_id=' + document.getElementById(uniqIds[i]).getAttribute('bannerId') + '&';
            uri += 'default_language=' + document.getElementById(uniqIds[i]).getAttribute('defaultLanguage') + '&';
            uri += 'tr4ck=' + document.getElementById(uniqIds[i]).getAttribute('trackrt');

            cookies.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'prelinker';
        cookies.fallback(['prelinker-canvas'], cookies.engage(id));
    }
};

// prezi
cookies.services.prezi = {
    "key": "prezi",
    "type": "video",
    "name": "Prezi",
    "uri": "https://prezi.com/privacy-policy/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['prezi-canvas'], function (x) {
            var id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'https://prezi.com/embed/' + id + '/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0';

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'prezi';
        cookies.fallback(['prezi-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// pubdirecte
cookies.services.pubdirecte = {
    "key": "pubdirecte",
    "type": "ads",
    "name": "Pubdirecte",
    "uri": "http://pubdirecte.com/contact.php",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        cookies.fallback(['pubdirecte-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" pid="' + x.getAttribute('pid') + '" ref="' + x.getAttribute('ref') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//www.pubdirecte.com/script/banniere.php?';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('pid') + '&';
            uri += 'ref=' + document.getElementById(uniqIds[i]).getAttribute('ref');

            cookies.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'pubdirecte';
        cookies.fallback(['pubdirecte-canvas'], cookies.engage(id));
    }
};

// purechat
cookies.services.purechat = {
    "key": "purechat",
    "type": "support",
    "name": "PureChat",
    "uri": "https://www.purechat.com/privacy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.purechatId === undefined) {
            return;
        }

        cookies.addScript('//app.purechat.com/VisitorWidget/WidgetScript', '', function () {
            try {
                window.w = new PCWidget({ c: cookies.user.purechatId, f: true });
            } catch (e) {}
        });
    }
};

// shareaholic
cookies.services.shareaholic = {
    "key": "shareaholic",
    "type": "social",
    "name": "Shareaholic",
    "uri": "https://shareaholic.com/privacy/choices",
    "needConsent": true,
    "CookiesP": ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
    "js": function () {
        "use strict";
        if (cookies.user.shareaholicSiteId === undefined) {
            return;
        }

        cookies.fallback(['shareaholic-canvas'], '');
        cookies.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
            try {
                Shareaholic.init(cookies.user.shareaholicSiteId);
            } catch (e) {}
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'shareaholic';
        cookies.fallback(['shareaholic-canvas'], cookies.engage(id));
    }
};

// shareasale
cookies.services.shareasale = {
    "key": "shareasale",
    "type": "ads",
    "name": "ShareASale",
    "uri": "https://www.shareasale.com/PrivacyPolicy.pdf",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        cookies.fallback(['shareasale-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" amount="' + x.getAttribute('amount') + '" tracking="' + x.getAttribute('tracking') + '" transtype="' + x.getAttribute('transtype') + '" persale="' + x.getAttribute('persale') + '" perlead="' + x.getAttribute('perlead') + '" perhit="' + x.getAttribute('perhit') + '" merchantID="' + x.getAttribute('merchantID') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://shareasale.com/sale.cfm?';
            uri += 'amount=' + document.getElementById(uniqIds[i]).getAttribute('amount') + '&';
            uri += 'tracking=' + document.getElementById(uniqIds[i]).getAttribute('tracking') + '&';
            uri += 'transtype=' + document.getElementById(uniqIds[i]).getAttribute('transtype') + '&';
            uri += 'persale=' + document.getElementById(uniqIds[i]).getAttribute('persale') + '&';
            uri += 'perlead=' + document.getElementById(uniqIds[i]).getAttribute('perlead') + '&';
            uri += 'perhit=' + document.getElementById(uniqIds[i]).getAttribute('perhit') + '&';
            uri += 'merchantID=' + document.getElementById(uniqIds[i]).getAttribute('merchantID');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'shareasale';
        cookies.fallback(['shareasale-canvas'], cookies.engage(id));
    }
};

// sharethis
cookies.services.sharethis = {
    "key": "sharethis",
    "type": "social",
    "name": "ShareThis",
    "uri": "http://www.sharethis.com/legal/privacy/",
    "needConsent": true,
    "CookiesP": ['__unam'],
    "js": function () {
        "use strict";
        if (cookies.user.sharethisPublisher === undefined) {
            return;
        }
        var switchTo5x = true,
            uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';

        cookies.fallback(['tacSharethis'], '');
        cookies.addScript(uri, '', function () {
            stLight.options({publisher: cookies.user.sharethisPublisher, doNotHash: false, doNotCopy: false, hashAddressBar: false});
        });

        if (cookies.isAjax === true) {
            if (typeof stButtons !== "undefined") {
                stButtons.locateElements();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'sharethis';
        cookies.fallback(['tacSharethis'], cookies.engage(id));
    }
};

// slideshare
cookies.services.slideshare = {
    "key": "slideshare",
    "type": "video",
    "name": "SlideShare",
    "uri": "https://www.linkedin.com/legal/privacy-policy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['slideshare-canvas'], function (x) {
            var id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//www.slideshare.net/slideshow/embed_code/' + id;

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'slideshare';
        cookies.fallback(['slideshare-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// statcounter
cookies.services.statcounter = {
    "key": "statcounter",
    "type": "analytic",
    "name": "StatCounter",
    "uri": "https://fr.statcounter.com/about/legal/#privacy",
    "needConsent": true,
    "CookiesP": ['sc_is_visitor_unique'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri = '//statcounter.com/counter/counter.js';

        cookies.fallback(['statcounter-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            cookies.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'statcounter';
        cookies.fallback(['statcounter-canvas'], cookies.engage(id));
    }
};

// timelinejs
cookies.services.timelinejs = {
    "key": "timelinejs",
    "type": "api",
    "name": "Timeline JS",
    "uri": "http://timeline.knightlab.com/#help",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['timelinejs-canvas'], function (x) {
            var spreadsheet_id = x.getAttribute("spreadsheet_id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                lang = x.getAttribute("lang_2_letter"),
                font = x.getAttribute("font"),
                map = x.getAttribute("map"),
                start_at_end = x.getAttribute("start_at_end"),
                hash_bookmark = x.getAttribute("hash_bookmark"),
                start_at_slide = x.getAttribute("start_at_slide"),
                start_zoom = x.getAttribute("start_zoom"),
                url = '//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=' + spreadsheet_id + '&font=' + font + '&maptype=' + map + '&lang=' + lang + '&start_at_end=' + start_at_end + '&hash_bookmark=' + hash_bookmark + '&start_at_slide=' + start_at_slide + '&start_zoom_adjust=' + start_zoom + '&height=' + height;

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'timelinejs';
        cookies.fallback(['timelinejs-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// typekit
cookies.services.typekit = {
    "key": "typekit",
    "type": "api",
    "name": "Typekit (adobe)",
    "uri": "http://www.adobe.com/fr/privacy.html",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.typekitId === undefined) {
            return;
        }
        cookies.addScript('//use.typekit.net/' + cookies.user.typekitId + '.js', '', function () {
            try {
                Typekit.load();
            } catch (e) {}
        });
    }
};

// twenga
cookies.services.twenga = {
    "key": "twenga",
    "type": "ads",
    "name": "Twenga",
    "uri": "http://www.twenga.com/privacy.php",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";

        if (cookies.user.twengaId === undefined || cookies.user.twengaLocale === undefined) {
            return;
        }

        cookies.addScript('//tracker.twenga.' + cookies.user.twengaLocale + '/st/tracker_' + cookies.user.twengaId + '.js');
    }
};

// twitter
cookies.services.twitter = {
    "key": "twitter",
    "type": "social",
    "name": "Twitter",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['tacTwitter'], '');
        cookies.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitter';
        cookies.fallback(['tacTwitter'], cookies.engage(id));
    }
};

// twitter embed
cookies.services.twitterembed = {
    "key": "twitterembed",
    "type": "social",
    "name": "Twitter (cards)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            e,
            html;

        cookies.fallback(['twitterembed-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            html = '<div id="' + uniqId + '" ';
            html += 'tweetid="' + x.getAttribute('tweetid') + '" ';
            html += 'theme="' + x.getAttribute('theme') + '" ';
            html += 'cards="' + x.getAttribute('cards') + '" ';
            html += 'conversation="' + x.getAttribute('conversation') + '" ';
            html += 'data-width="' + x.getAttribute('data-width') + '" ';
            html += 'data-align="' + x.getAttribute('data-align') + '" ';
            html += '></div>';
            return html;
        });

        cookies.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs', function () {
            for (i = 0; i < uniqIds.length; i += 1) {
                e = document.getElementById(uniqIds[i]);
                twttr.widgets.createTweet(
                    e.getAttribute('tweetid'),
                    e,
                    {
                        theme: e.getAttribute('theme'),
                        cards: e.getAttribute('cards'),
                        conversation: e.getAttribute('conversation'),
                        lang: cookies.getLanguage(),
                        dnt: true,
                        width: e.getAttribute('data-width'),
                        align: e.getAttribute('data-align')
                    }
                );
            }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterembed';
        cookies.fallback(['twitterembed-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('data-width') + 'px';
            return cookies.engage(id);
        });
    }
};

// twitter timeline
cookies.services.twittertimeline = {
    "key": "twittertimeline",
    "type": "social",
    "name": "Twitter (timelines)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['tacTwitterTimelines'], '');
        cookies.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twittertimeline';
        cookies.fallback(['tacTwitterTimelines'], cookies.engage(id));
    }
};

// user voice
cookies.services.uservoice = {
    "key": "uservoice",
    "type": "support",
    "name": "UserVoice",
    "uri": "https://www.uservoice.com/privacy/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.userVoiceApi === undefined) {
            return;
        }
        cookies.addScript('//widget.uservoice.com/' + cookies.user.userVoiceApi + '.js');
    }
};

// vimeo
cookies.services.vimeo = {
    "key": "vimeo",
    "type": "video",
    "name": "Vimeo",
    "uri": "http://vimeo.com/privacy",
    "needConsent": true,
    "CookiesP": ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
    "js": function () {
        "use strict";
        cookies.fallback(['vimeo_player'], function (x) {
            var video_id = x.getAttribute("videoID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame;

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe src="//player.vimeo.com/video/' + video_id + '" ' + frame_width + frame_height + ' frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'vimeo';
        cookies.fallback(['vimeo_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// visualrevenue
cookies.services.visualrevenue = {
    "key": "visualrevenue",
    "type": "analytic",
    "name": "VisualRevenue",
    "uri": "http://www.outbrain.com/legal/privacy-713/",
    "needConsent": true,
    "CookiesP": ['__vrf', '__vrm', '__vrl', '__vry', '__vru', '__vrid', '__vrz'],
    "js": function () {
        "use strict";
        if (cookies.user.visualrevenueId === undefined) {
            return;
        }
        window._vrq = window._vrq || [];
        window._vrq.push(['id', cookies.user.visualrevenueId]);
        window._vrq.push(['automate', true]);
        window._vrq.push(['track', function () {}]);
        cookies.addScript('http://a.visualrevenue.com/vrs.js');
    }
};

// vshop
cookies.services.vshop = {
    "key": "vshop",
    "type": "ads",
    "name": "vShop",
    "uri": "http://vshop.fr/privacy-policy",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        cookies.fallback(['vcashW'], '');
        cookies.addScript('//vshop.fr/js/w.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'vshop';
        cookies.fallback(['vcashW'], cookies.engage(id));
    }
};

// wysistat
cookies.services.wysistat = {
    "key": "wysistat",
    "type": "analytic",
    "name": "Wysistat",
    "uri": "http://wysistat.net/contact/",
    "needConsent": true,
    "CookiesP": ['Wysistat'],
    "js": function () {
        "use strict";
        if (cookies.user.wysistat === undefined) {
            return;
        }
        cookies.addScript('//www.wysistat.com/statistique.js', '', function () {
            window.stat(cookies.user.wysistat.cli, cookies.user.wysistat.frm, cookies.user.wysistat.prm, cookies.user.wysistat.ce, cookies.user.wysistat.page, cookies.user.wysistat.roi, cookies.user.wysistat.prof, cookies.user.wysistat.cpt);
        });
    }
};

// xiti
cookies.services.xiti = {
    "key": "xiti",
    "type": "analytic",
    "name": "Xiti",
    "uri": "http://www.atinternet.com/politique-du-respect-de-la-vie-privee/",
    "needConsent": true,
    "CookiesP": [],
    "js": function () {
        "use strict";
        if (cookies.user.xitiId === undefined) {
            return;
        }
        var Xt_param = 's=' + cookies.user.xitiId + '&p=',
            Xt_r,
            Xt_h,
            Xt_i,
            Xt_s,
            div = document.createElement('div');
        try {
            Xt_r = top.document.referrer;
        } catch (e) {
            Xt_r = document.referrer;
        }
        Xt_h = new Date();
        Xt_i = '<img style="display:none" border="0" alt="" ';
        Xt_i += 'src="http://logv3.xiti.com/hit.xiti?' + Xt_param;
        Xt_i += '&hl=' + Xt_h.getHours() + 'x' + Xt_h.getMinutes() + 'x' + Xt_h.getSeconds();
        if (parseFloat(navigator.appVersion) >= 4) {
            Xt_s = screen;
            Xt_i += '&r=' + Xt_s.width + 'x' + Xt_s.height + 'x' + Xt_s.pixelDepth + 'x' + Xt_s.colorDepth;
        }

        div.innerHTML = Xt_i + '&ref=' + Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$') + '" title="Internet Audience">';
        document.getElementsByTagName('body')[0].appendChild(div.firstChild);

        if (typeof cookies.user.xitiMore === 'function') {
            cookies.user.xitiMore();
        }
    }
};

// youtube
cookies.services.youtube = {
    "key": "youtube",
    "type": "video",
    "name": "YouTube",
    "uri": "https://www.google.fr/intl/fr/policies/privacy/",
    "needConsent": true,
    "CookiesP": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        cookies.fallback(['youtube_player'], function (x) {
            var video_id = x.getAttribute("videoID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame,
                params = 'theme=' + x.getAttribute("theme") + '&rel=' + x.getAttribute("rel") + '&controls=' + x.getAttribute("controls") + '&showinfo=' + x.getAttribute("showinfo") + '&autoplay=' + x.getAttribute("autoplay");

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '" frameborder="0"></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtube';
        cookies.fallback(['youtube_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// youtube playlist
cookies.services.youtubeplaylist = {
    "key": "youtubeplaylist",
    "type": "video",
    "name": "YouTube (playlist)",
    "uri": "https://www.google.fr/intl/fr/policies/privacy/",
    "needConsent": true,
    "CookiesP": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        cookies.fallback(['youtube_playlist_player'], function (x) {
            var playlist_id = x.getAttribute("playlistID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame,
                params = 'theme=' + x.getAttribute("theme") + '&rel=' + x.getAttribute("rel") + '&controls=' + x.getAttribute("controls") + '&showinfo=' + x.getAttribute("showinfo") + '&autoplay=' + x.getAttribute("autoplay");

            if (playlist_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/videoseries?list=' + playlist_id + '&' + params + '" frameborder="0"></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtubeplaylist';
        cookies.fallback(['youtube_playlist_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// zopim
cookies.services.zopim = {
    "key": "zopim",
    "type": "support",
    "name": "Zopim",
    "uri": "https://www.zopim.com/privacy",
    "needConsent": true,
    "CookiesP": ['__zlcid', '__zprivacy'],
    "js": function () {
        "use strict";
        if (cookies.user.zopimID === undefined) {
            return;
        }
        cookies.addScript('//v2.zopim.com/?' + cookies.user.zopimID);
    }
};

// xiti smartTag
cookies.services.xiti_smarttag = {
    "key": "xiti_smarttag",
    "type": "analytic",
    "name": "Xiti (SmartTag)",
    "uri": "https://www.atinternet.com/societe/protection-des-donnees/",
    "needConsent": true,
    "CookiesP": ["atidvisitor", "atreman", "atredir", "atsession", "atuserid", "attvtreman", "attvtsession"],
    "js": function () {
        "use strict";
        if (cookies.user.xiti_smarttagLocalPath !== undefined) {
            cookies.addScript(cookies.user.xiti_smarttagLocalPath, 'smarttag', null, null, "onload", "addTracker();");
        } else {
            var xitiSmarttagId = cookies.user.xiti_smarttagSiteId;
            if (xitiSmarttagId === undefined) {
                return;
            }

            cookies.addScript('//tag.aticdn.net/' + xitiSmarttagId + '/smarttag.js', 'smarttag', null, null, "onload", "addTracker();");
        }
    }
};

// facebook pixel
cookies.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://fr-fr.facebook.com/business/help/www/651294705016616",
    "needConsent": true,
    "CookiesP": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src'],
    "js": function () {
        "use strict";
        var n;
        if(window.fbq)return;
        n=window.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)} ;
        if(!window._fbq)window._fbq=n;
        n.push=n;
        n.loaded=!0;
        n.version='2.0';
        n.queue=[];
        cookies.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', cookies.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof cookies.user.facebookpixelMore === 'function') {
            cookies.user.facebookpixelMore();
        }
    }
};

//Issuu
cookies.services.issuu = {
    "key": "issuu",
    "type": "other",
    "name": "Issuu",
    "uri": "https://issuu.com/legal/privacy",
    "needConsent": true,
    "CookiesP": ['__qca', 'iutk', 'mc'],
    "js": function () {
        "use strict";
        cookies.fallback(['issuu_player'], function (x) {
            var issuu_id = x.getAttribute("issuuID"),
                issuu_width = x.getAttribute("width"),
                frame_width = 'width=',
                issuu_height = x.getAttribute("height"),
                frame_height = 'height=',
                issuu_frame;

            if (issuu_id === undefined) {
                return "";
            }
            if (issuu_width !== undefined) {
                frame_width += '"' + issuu_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (issuu_height !== undefined) {
                frame_height +=  '"' + issuu_height + '" ';
            } else {
                frame_height += '"" ';
            }
            issuu_frame = '<iframe type="text/html" ' + frame_width + frame_height + ' src="//e.issuu.com/embed.html#' + issuu_id + '" frameborder="0"></iframe>';
            return issuu_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'issuu';
        cookies.fallback(['issuu_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return cookies.engage(id);
        });
    }
};

// webmecanik
cookies.services.webmecanik = {
    "key": "webmecanik",
    "type": "analytic",
    "name": "Webmecanik",
    "uri": "https://webmecanik.com/tos",
    "needConsent": true,
    "CookiesP": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (cookies.user.webmecanikurl === undefined) {
            return;
        }
        window['WebmecanikTrackingObject'] = 'mt';
        window['mt'] = window['mt'] || function() {
            (window['mt'].q = window['mt'].q || []).push(arguments);
        };

        cookies.addScript(cookies.user.webmecanikurl, '', function() {
            mt('send', 'pageview');
        });
    }
};

