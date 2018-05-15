require([
    "dojo/on",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/mouse",
    "dojo/query",
    "dojo/_base/fx",
    "dojo/fx",
    "dojo/fx/easing",
    "dojo/request",
    "dojo/dom-form",
    "dojo/domReady!"
], function (on, dom, domClass, domConstruct, mouse, query, basefx,
    fx, easing, request, domForm) {
    var greeting = dom.byId("greeting"),
        dojo = dom.byId("dojo");

    var animTitle = fx.chain([
        fx.combine([
            basefx.fadeIn({
                node: greeting,
                duration: 1000
            }),
            basefx.animateProperty({
                node: greeting,
                duration: 1000,
                easing: easing.bounceOut,
                properties: {
                    top: {
                        start: 0,
                        end: 40
                    }
                }
            })
        ]),
        basefx.animateProperty({
            node: dojo,
            duration: 1500,
            properties: {
                width: {
                    start: 0,
                    end: 200
                }
            }
        })
    ]).play();

    query("#list .odd").forEach(function (node) {
        domClass.add(node, "red");
    });

    on(greeting, mouse.enter, function () {
        domClass.add(greeting, "hovering");
    });
    on(greeting, mouse.leave, function () {
        domClass.remove(greeting, "hovering");
    });

    var list = dom.byId("list");
    on(list, ".odd:click", function () {
        basefx.fadeOut({
            node: greeting
        }).play();
    });

    on(list, ".even:click", function () {
        basefx.fadeIn({
            node: greeting
        }).play();
    });

    var target = dom.byId("target"),
        wipeIn = query(".wipeIn"),
        wipeOut = query(".wipeOut");

    on(wipeIn, "click", function () {
        fx.wipeIn({
            node: target
        }).play();
    });
    on(wipeOut, "click", function () {
        fx.wipeOut({
            node: target
        }).play();
    });

    var outerText = query(".outer")[0];
    request("texts/helloworld.txt").then(
        function (text) {
            var p = domConstruct.create("p", {
                innerHTML: text,
                className: "text"
            }, outerText);
            on(animTitle, "End", function () {
                fx.combine([
                    basefx.fadeIn({
                        node: p,
                        duration: 500,
                    }),
                    basefx.animateProperty({
                        node: p,
                        duration: 1000,
                        easing: easing.bounceOut,
                        properties: {
                            left: {
                                start: -20,
                                end: 10
                            }
                        }
                    })
                ]).play();

            });
        },
        function (error) {
            console.log("An error occured: " + error);
        }
    );

    var loginForm = dom.byId("loginForm"),
        loginResponse = dom.byId("loginResponse");

    function loading() {
        domConstruct.create("div", {
            className: "loading",
            innerHTML: "<div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>"
        }, "body");
    }

    function removeLoader() {
        var loader = query(".loading")[0];
        if (loader) {
            domConstruct.destroy(loader);
        }
    }

    on(loginForm, "submit", function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        loading();
        var promise = request.post("/login", {
            data: domForm.toObject("loginForm")
        });
        promise.response.then(function (res) {
            removeLoader();
            loginForm.remove();
            loginResponse.innerHTML = res.data;
        }, function (error) {
            removeLoader();
            domClass.add(loginForm, "error");
            loginResponse.innerHTML = error.response.text;
        });
    });
});