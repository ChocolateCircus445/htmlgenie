var scheme = '';
var blocks = 0;
//The list of IDs for the superscript text in the layout
var losi = [];
//The list of elements in the website
var els = [];
var lcs;


if (localStorage.getItem("htmlgenieEdSet") == null) {
  lcs = {
    fill: `${randomNumber(1, 2) - 1}${randomNumber(1, 2) - 1}${randomNumber(1, 2) - 1}`, //The settings are stored as a single Unicode character. We need to make the binary code 16 bits, so we add these 3 binary digits to fill up space.
    content: `11011`, //This is the meat of it all. These 5 digits are your settings.
    l: "FFFFFF",
    r: "D3BC5F", //lcs.l and lcs.r aren't encoded at all.
    fb: "0",
    result: `foobar`
    /*
    Here are the letters you might get when using default settings:
    [ESC], ;, [, {, ›, », Û, and û
    */
  }
  lcs.result = `${String.fromCharCode(parseInt(lcs.fill + lcs.content, 2).toString(10))}${lcs.l}${lcs.r}`; //Converts binary to ASCII.

  localStorage.setItem("htmlgenieEdSet", lcs.result); //Stores in local storage (because cookies didn't work for some reason).
}
  var gs = localStorage.getItem("htmlgenieEdSet");
  //Let's say that the value stored in settings, called "val", was "»FFFFFFD3BC5F".
  if (gs.length < 13) {
    "Settings were malformed. This is not fatal, but the user will not be able to retrieve their settings.".error();
    //Tfw the settings string is too long >.< #programmerproblems
    //I'm not sorry about that.
  } else {
    var decode = gs.substring(0, 1); //Isolates the character. val = "»"
    decode = decode.charCodeAt(0).toString(2); //Gets the Unicode of val. val = 10111011
    decode = decode.substring(decode.length - 5); //Takes out the filler. val = 11011
    //Voila! You have your settings in binary! Now all you have to do is convert them to trues and falses. Hmm, I wonder how?...

    lcs = {
      fill: decode.substring(0, 2),
      content: decode,
      l: gs.substring(1, 7),
      r: gs.substring(7, 14),
      result: gs
    }
  }
//...Oh, wait, here's how.
var truthList = [];
for (i = 0; i < decode.length || i == decode.length; i++) {
  if (lcs.content.charCodeAt(i) == 48) { //If character (i) of the word is 0, report false.
    truthList.push(false);
  } else {
    truthList.push(true);
    //Otherwise, report true.
  }
}



//The editor settings
var settings = {
  doCompactBlocks: truthList[0],
  doUseNewGlass: truthList[1],
  debugMode: truthList[2],
  showVersionNumber: truthList[3],
  menuBar: {
    left: `#${lcs.l}`,
    right: `#${lcs.r}`
  },
  displayNotificationOnReload: truthList[4]
}

var version = {
  stage: 0,
  build: 8,
  patch: 1
};

var fontList = [
  "Arial",
  "Arial Black",
  "Comic Sans MS",
  "Courier New",
  "Georgia",
  "Impact",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Palatino Linotype",
  "Roboto",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Ubuntu",
  "Verdana"
]
unfinishedDialog = function () {
  alert("Sorry! This feature is unfinished.");
}
var websiteMeta = {
  title: '', //Website title
  favicon: {
    href: 'https://github.com/ChocolateCircus445/htmlgenie/blob/master/editor/favicon.png?raw=true', //Favicon source
    size: 192,  //Favicon size (i.e. result will be <link...sizes=`${size}x${size}`>)
    ext: 'png' //Favicon file extension
  },
  iconSource: 0, //Whether to use FontAwesome (1), Bootstrap (2), Google Icons (3), or no icons (0)
  ic: { //ic stands for Images [and] Colo(u)rs
    background: {
      isColor: true, //If true, this is a colo(u)r, if false, this is an image.
      decoration: '#FFFFFF' //This is a colo(u)r if isColor is true, otherwise, this is an image link.
    },
    text: {
      font: 'Times New Roman', //The font to use for the majority of the website
      color: 'black', //Text colo(u)r
      decoration: { //Text decoration
        underline: false, //a̲
        strikethrough: false, //a̶
        overline: false //ā
      }
    }
  }
}
/*
Please allow me to explain the "scheme" variable.
This controls all the blocks, categories, what they look like, and what they do.
*/
var scheme = {
  categories: {
    text: {
      blocks: {
        par: {
          name: "par", //This is redundant, don't pay attention to this
          label: "text", //This is the label text that will show up in the editor
          properties: { //These are the properties of the element
            text: { //The text that will go in the <p> element
              type: "textinput", //The type of input, in this case, a text box.
              label: "Text:", //The text the inspector will display when setting a label
              id: "parin", //The ID of the text box
              multiline: true, //This is not a multiline
              value: ''
            },
            size: {
              type: "range", //Just a normal <input type="range"> element
              label: "Size:",
              id: "parinsize",
              min: 8,
              max: 100,
              value: ''
            },
            fontface: {
              type: "fontselect", //This is a dropdown of the available fonts, showcased in the fontList variable
              label: "Font:",
              id: "parinfont",
              value: ''
            }
          },
           script: '' //This is the HTML code for the element. It is set later in the program because the variable could not get values within itself while declaring.
        },
        header: {
          name: "header",
          label: "header",
          properties: {
            text: {
              type: "textinput",
              id: "headerin",
              multiline: false
            },
            size: {
              type: "range",
              id: "headersize",
              min: 8,
              max: 100
            },
            fontface: {
              type: "fontselect",
              id: "headerfont"
            }
          },

          script: function() {
            var t = document.createElement("h1"); //This is old stuff

          }
        },
        table: {
          name: "table",
          label: "table",
          properties: {
            contents: {
              type: "table",
              id: "tablet"
          }
        },

          script: function() {
            //var t = document.createElement("h1");

          }
        },
        break: {
          name: "break",
          label: "new line",
          properties: {
            /*
            text: {
              type: "textinput",
              id: "headerin",
              multiline: false
            },
            size: {
              type: "range",
              id: "headersize",
              min: 8,
              max: 100
            },
            fontface: {
              type: "fontselect",
              id: "headerfont"
            }
            */
          },

          script: function() {
            //var t = document.createElement("h1");

          }
        },
      },

      name: "Text",
      icon: 'svg\/text.svg',
      iconw: 'svg\/textw.svg',
      color: '#af0e0e',
      tcolor: '1'
    },
    multimedia: {
      blocks: {
        audioplayer: {
          name: "audioplayer",
          label: "audio player",
          properties: {
            source: {
              type: "textinput",
              id: "audioplayersrc",
              multiline: false
            }
          }
        },
        image: {
          name: "image",
          label: "image",
          properties: {
            source: {
              type: "textinput",
              id: "imagesrc",
              multiline: false
            }
          }
        }
      },
      name: "Images and Videos",
      icon: 'svg\/multimedia.svg',
      iconw: 'svg\/multimediaw.svg',
      color: '#b220e8',
      tcolor: '1'
    },
    input: {
      blocks: {
        textbox: {
          name: "textbox",
          label: "text box",
          properties: {
            text: {
              type: "textinput",
              id: "headerin",
              multiline: false
            },
            size: {
              type: "range",
              id: "headersize",
              min: 8,
              max: 100
            },
            fontface: {
              type: "fontselect",
              id: "headerfont"
            }
          }
        }
      },
      name: "Inputs",
      icon: 'svg\/input.svg',
      iconw: 'svg\/inputw.svg',
      color: '#325b13',
      tcolor: '1'
    },
    other: {
      blocks: {},
      name: "Other Blocks",
      icon: 'svg\/other.svg',
      iconw: 'svg\/otherw.svg',
      color: '#919191',
      tcolor: '0'
    }
  }
}

//The scripts
scheme.categories.text.blocks.par.script = `<p style="font-family: '${scheme.categories.text.blocks.par.properties.fontface}'; font-size: ${scheme.categories.text.blocks.par.properties.size}px;">${scheme.categories.text.blocks.par.properties.text}</p>`;


applyLineToResult = function (hb, code) {
  var d = document.getElementById("rif").contentDocument;

  if (!hb == "head" || !hb == "body") {
    throw new Error("Invalid tag in applyLineToResult. Must be \"head\" or \"body\". You used: \"" + hb + "\".");
  }
  if (hb == "head") {
    d.head.innerHTML += code + '\n';
  } else {
    d.body.innerHTML += code + '\n';
  }
}
block = function (b, c, pal) {
  if (!pal) {
    blocks++;
    this.superId = blocks + 'blockSuper';
    this.internalId = blocks + 'blockId';

  }
  var blv = eval("scheme.categories." + c + ".blocks." + b);
  var ct = eval("scheme.categories." + c);
  var cl;
  if (ct.tcolor == '1') {
    cl = "#FFFFFF";
  } else {
    cl = "#000000";
  }
  var bl = document.createElement("div");
  bl.setAttribute("style", "background-color: " + ct.color + "; color: " + cl + '; display: inline-block; padding-right: 10px;');
  bl.setAttribute("class", "noselect");
  if (!pal) {
    if (settings.doUseNewGlass) {
      bl.setAttribute("class", "noselect magnifyCursor");
    } else {
      bl.setAttribute("class", "noselect magnifyCursorClassic")
    }
    var lt = randomNumber(111111, 999999);
    if (lt > 999999) {
      var lt = randomNumber(111111, 999999);
      if (lt > 999999) {
        var lt = randomNumber(111111, 999999);
        if (lt > 999999) {
          var lt = randomNumber(111111, 999999);
          if (lt > 999999) {
            var lt = randomNumber(111111, 999999);
            if (lt > 999999) {

            } else {
              bl.setAttribute("id", b + lt);
            }
          } else {
            bl.setAttribute("id", b + lt);
          }
        } else {
          bl.setAttribute("id", b + lt);
        }
      } else {
        bl.setAttribute("id", b + lt);
      }
    } else {
      bl.setAttribute("id", b + lt);
    }
    var idd = b + lt;
  }
  if (ct.tcolor == '1') {
    bl.innerHTML = "<img src=\"" + ct.iconw + "\">"
  } else {
    bl.innerHTML = "<img src=\"" + ct.icon + "\">"
  }
  bl.innerHTML = bl.innerHTML + '<span id=\"' + b + 'label\"> ' + blv.label + "</span>"
  if (!pal) {
    bl.innerHTML = bl.innerHTML + '<sup id=\"' + this.superId + '\" style="position: relative; top: 1px; right: 0px; font-variant: small-caps;">Lorem ipsum</sup>';
    losi.push(this.superId);
  }

  return bl;
}

appendBlockToPalette = function (b, c) {
  var d = document.getElementById("palHome");
  var br = document.createElement("br");
  var bs = document.createElement("br");
  var bl = block(b, c, true);
  bl.setAttribute("onclick", "appendBlockToLayout(\"" + b + '\", \"' + c + '\")');
  bl.style.cursor = "e-resize";
  /*
  if (!settings.doCompactBlocks) {
    bl.style.borderBottom = "15px solid white";
  }
  */
  d.appendChild(bl);
  d.appendChild(br);
  if (!settings.doCompactBlocks) {
    d.appendChild(bs);
  }
}
appendBlockToLayout = function (b, c) {
  var d = document.getElementById("layout");
  var br = document.createElement("br");
  var bl = block(b, c, false);
  var bs = document.createElement("br");
  bl.style.cursor = "url('glass.cur'), auto;"
  d.appendChild(bl);
  d.appendChild(br);
  if (!settings.doCompactBlocks) {
    d.appendChild(bs);
  }
  var s = document.getElementById(losi[losi.length - 1]);
  s.innerHTML = ' ' + bl.getAttribute("id");
}

listProperties = function (id, block, cat) {
  var delButton = document.createElement("button");
  delButton.setAttribute("style", "border-radius: 15px; background-color: red; color: white; width: 9px;");
  delButton.innerHTML = '<img src="img/delX.png" width="7" height="8" style="position: relative; center: 0px;">'
  document.getElementById("palHome").appendChild(delButton);
}
changeTooltip = function (text) {
  var t = document.getElementById("tooltip");
  t.innerHTML = text;
}
var loadBlocksText = function() {
  document.getElementById("palHome").innerHTML = '';
  appendBlockToPalette("par", "text");
  appendBlockToPalette("header", "text");
  appendBlockToPalette("table", "text");
  appendBlockToPalette("break", "text")
}
var loadBlocksMultimedia = function() {
  document.getElementById("palHome").innerHTML = '';
  appendBlockToPalette("image", "multimedia");
  appendBlockToPalette("audioplayer", "multimedia");
}
var loadBlocksInput = function() {
  document.getElementById("palHome").innerHTML = '';
  appendBlockToPalette("textbox", "input");
}
var loadBlocksOther = function() {
  document.getElementById("palHome").innerHTML = '';
}
var newFileHG = function () {
 window.location.reload(false);
}

var openFileHG = function () {
  unfinishedDialog();
}

var saveFileHG = function () {
  unfinishedDialog();
}

var buildSiteHG = function () {
  unfinishedDialog();
}

var openConsoleHG = function () {
  var cb = document.getElementById("settingBorder");
  var c = document.getElementById("consoleWrapper");
  var ca = document.getElementById("consoleInnards");

  cb.setAttribute("style", "display: inline-block; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 14;");
  c.setAttribute("style", "display: inline-block; z-index: 15; position: fixed; top: 25%; right: 25%; width: 50%; background-color: #BFBFBF; overflow-y: scroll; border-width: 100px; border-color: rgba(191, 191, 191, 0.5); max-height: 50%;");
}

var byeByeConsole = function () {
  var cb = document.getElementById("settingBorder");
  var c = document.getElementById("consoleWrapper");
  var ca = document.getElementById("consoleInnards");

  cb.setAttribute("style", "display: none; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 14;");
  c.setAttribute("style", "display: none; z-index: 15; position: fixed; top: 25%; right: 25%; width: 50%; background-color: #BFBFBF; overflow-y: scroll; border-width: 100px; border-color: rgba(191, 191, 191, 0.5); max-height: 50%");
}
/*
Types that will hopefully be added in:
textinput (multiline (t/f))
range (min, max)
fontselect
colorinput
table

Under construction

var inspectorWrite = function (thing) {
  var i = document.getElementById('inspector')
  var temp;
  switch (thing.type) {
    case 'textinput':
    temp = `
      <p>${thing.label}</p>
      <br>
      <input type="text" id="${thing.id}">
      `
      if (thing.multiline) {
      temp = `
        <p>${thing.label}</p>
        <br>
        <textarea id="${thing.id}"></textarea>
        `
      }
  }
}
*/
