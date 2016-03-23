// ==UserScript==
// @id             JustJustin.FBNoPreview
// @name           Facebook No Chat Preview
// @version        1.0
// @namespace      JustJustin
// @author         JustJustin
// @description    Stops facebook from inserting previews in chat.
// @include        http://www.facebook.com*
// @include        https://www.facebook.com*
// @include        http://facebook.com*
// @include        https://facebook.com*
// @downloadURL    https://github.com/JustJustin/FBNoPreview/raw/master/FBNoPreview.user.js
// @run-at         document-end

// ==/UserScript==

function attachPreviewObserver(node) {}

var debug = false;
function log(o) {
    if (debug) {
        console.log(o);
    }
}

var dockObserver = new MutationObserver(function(mutations) {
    log({msg:"dockObserver", size:mutations.length, mutations:mutations});
    for (var i = 0; i < mutations.length; ++i) {
        var mutation = mutations[i];
        if (mutation.addedNodes) {

            for (var j = 0; j < mutation.addedNodes.length; ++j) {
                var node = mutation.addedNodes[j];
                if (!node.querySelector) {continue;}
                var button = node.querySelector("button[title=Remove]");
                if (button) {
                    log({msg: "Found Remove Button", button:button});
                    button.click();
                }
                /*var dock = node.querySelector(".fbDockChatTabFlyout");
                if (dock) {
                    log({msg:"Found dock.", dock:dock});
                    if (!dock.hasAttachedPreviewerObserver) {
                        dock.hasAttachedPreviewerObserver = true;
                        attachPreviewObserver(dock);
                    }
                }*/
            }

        }
    }
});

var config = {attributes: false, childList: true, 
              subtree: true, characterData: false};

var dock = document.querySelector("#pagelet_dock");
if (dock) {
    dockObserver.observe(dock, config);
}
