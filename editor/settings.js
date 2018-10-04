var sb = document.getElementById("settingBorder");
var s = document.getElementById("settingsBox");
var isColor;
var undl;
var strt;
var ovrl;
HTMLElement.prototype.addHTML = function (html) {
  this.innerHTML += '\n' + html;
}
openSettingsHG = function () {
  sb.setAttribute("style", "display: inline-block; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 14;");
  s.setAttribute("style", "display: inline-block; z-index: 15; position: fixed; top: 25%; right: 25%; width: 50%; background-color: #BFBFBF; overflow-y: scroll; border-width: 100px; border-color: rgba(191, 191, 191, 0.5); cursor: url(\"img/settings/wrench.cur\"), auto; max-height: 50%;");
  //s.setAttribute("class", "dialogBorder");
  s.innerHTML = "<i class=\"fas fa-arrow-left\" onclick=\"byeByeSettings()\"></i><span style=\"padding-left: 10px;\">Settings</span>\n<table style=\"width: 100%; table-layout: fixed; align: center;\">\n<tr>\n<td><img src=\"img/settings/websettings.svg\" width=\"250\" height=\"250\" style=\"padding-left: 49px; padding-right: 49px;\" onclick=\"websiteSettings()\"></td>\n<td><img src=\"img/settings/editorsettings.svg\" width=\"250\" height=\"250\" style=\"padding-left: 49px; padding-right: 49px;\" onclick=\"unfinishedDialog()\"></td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">Website Settings</td>\n<td style=\"text-align: center;\">Editor Settings</td>\n</tr>\n<tr>\n<td></td>\n<td style=\"text-align: center; font-size: 8;\"><b>NOTE:</b> This requires reloading the page to make changes.</td>\n</tr>\n</table>"
}
byeByeSettings = function () {
  sb.setAttribute("style", "display: none; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 14;");
  s.setAttribute("style", "display: none; z-index: 15; position: fixed; top: 25%; right: 25%; width: 50%; background-color: #BFBFBF; overflow-y: scroll; border-width: 100px; border-color: rgba(191, 191, 191, 0.5); cursor: url(\"img/settings/wrench.cur\"), auto; max-height: 50%");
  //s.setAttribute("class", "dialogBorder");
}

websiteSettings = function () {
  s.innerHTML = '';
  s.addHTML('<i class="fas fa-arrow-left" onclick="openSettingsHG()">');
  s.addHTML('<span style="padding-left: 10px;">Website Settings</span>');
  s.addHTML('<br>\n<br>');
  s.addHTML('<form><span style="padding-right: 10px;"">Title of your page:</span><input type="text" id="settingsPageTitle" class="textBoxHG"></input></form><br>');
  s.addHTML('<form><b>Site icon</b><br><!--<span style="padding-right: 10px;"">Use page icon</span><input type="checkbox" id="settingsUseFavicon"></input>--><br><span style="padding-right: 10px;"">Icon source:</span><input type="text" id="settingsFaviconSource" class="textBoxHG"><br><span style="padding-right: 10px;"">Size in pixels of your icon:</span><input type="number" id="settingsFaviconSize" class="numberHG" value="64" max="9999"></input><br><span style="padding-right: 10px;">Icon file extension:</span><select id="settingsFaviconFileExtension" class="textBoxHG"><option value="ico">ICO</option><option value="png">PNG</option></select></form><br>');
  s.addHTML('<form><span style="padding-right: 10px;">Icon library to use:</span><select id="settingsIconLibrary" class="textBoxHG"><option value="0">None</option><option value="1">FontAwesome</option><option value="2">Bootstrap</option><option value="3">Google Icons</option></select></form><br>');
  s.addHTML('<form><b>Background settings</b><br><span>Use background</span><br><input type="radio" value="true" id="settingsUseBackgroundColor" name="settingsBGC" onchange="evalCU()" checked><label for="settingsUseBackgroundColor">Color</label><br><input type="radio" value="false" id="settingsUseBackgroundImage" name="settingsBGC" onchange="evalCU()"><label for="settingsUseBackgroundImage">Image</label><br><input type="color" id="settingsColorURL" class="colorHG" value="#FFFFFF"></form><br>');
  s.addHTML('<form><b>Text settings</b><br><span style="padding-right: 10px;">Default font:</span><select id="settingsDefaultFont" class="textBoxHG"><option value="Arial">Arial</option><option value="Arial Black">Arial Black</option><option value="Comic Sans MS">Comic Sans MS</option><option value="Courier New">Courier New</option><option value="Georgia">Georgia</option><option value="Impact">Impact</option><option value="Lucida Console">Lucida Console</option><option value="Lucida Sans Unicode">Lucida Sans Unicode</option><option value="Palatino Linotype">Palatino Linotype</option><option value="Roboto">Roboto</option><option value="Tahoma">Tahoma</option><option value="Times New Roman" selected>Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option><option value="Ubuntu">Ubuntu</option><option value="Verdana">Verdana</option></select><br>' +
  '<span style="padding-right: 10px;">Text color:</span><input type="color" class="colorHG" id="settingsTextColor"><br>' +
  '<span style="padding-right: 10px;">Text decoration</span><br><input type="checkbox" id="settingsTextIsUnderlined">Underlined<br><input type="checkbox" id="settingsTextIsStrikethrough">Strikethrough<br><input type="checkbox" id="settingsTextIsOverlined">Overlined</form>');
  s.addHTML('<div><button class="settingsSaveButton" id="settingsSaveButton" onclick="doSavePageSettings()">Save</button><button class="settingsApplyButton" id="settingsApplyButton" onclick="doApplyMeta()">Apply</button></div>')
}

evalCU = function () {
  if (document.getElementById("settingsUseBackgroundColor").checked) {
    document.getElementById("settingsColorURL").setAttribute("type", "color");
    document.getElementById("settingsColorURL").setAttribute("class", "colorHG");
    document.getElementById("settingsColorURL").setAttribute("value", "#FFFFFF");
    isColor = true;
  } else if (document.getElementById("settingsUseBackgroundImage").checked) {
    document.getElementById("settingsColorURL").setAttribute("type", "text");
    document.getElementById("settingsColorURL").setAttribute("class", "textBoxHG");
    document.getElementById("settingsColorURL").setAttribute("value", "");
    document.getElementById("settingsColorURL").setAttribute("placeholder", "Put your image URL here");
    isColor = false;
  }
}

evalDec = function () {
  if (document.getElementById("settingsTextIsUnderlined").value == 'on') {
    undl = true;
  } else {
    undl = false;
  }
  if (document.getElementById("settingsTextIsStrikethrough").value == 'on') {
    strt = true;
  } else {
    strt = false;
  }
  if (document.getElementById("settingsTextIsOverlined").value == 'on') {
    ovrl = true;
  } else {
    ovrl = false;
  }
}
/*
addFonts = function (id) {
  var d = document.getElementById(id);
  for (var i = 0; i < fontList.length; i++) {
    d.add(fontList[i]);
  }
}
*/

doSavePageSettings = function () {
  `Started at ${new Date()}`.log();
  websiteMeta.title = document.getElementById("settingsPageTitle").value;
  websiteMeta.favicon.href = document.getElementById("settingsFaviconSource").value;
  websiteMeta.favicon.size = document.getElementById("settingsFaviconSize").value;
  websiteMeta.favicon.ext = document.getElementById("settingsFaviconFileExtension").value;
  websiteMeta.iconSource = document.getElementById("settingsIconLibrary").value;
  websiteMeta.ic.background.isColor = document.getElementById("settingsUseBackgroundColor").checked;
  websiteMeta.ic.background.decoration = document.getElementById("settingsColorURL").value;
  websiteMeta.ic.text.font = document.getElementById("settingsDefaultFont").value;
  websiteMeta.ic.text.color = document.getElementById("settingsTextColor").value;
  evalDec();
  websiteMeta.ic.text.decoration.underline = document.getElementById("settingsTextIsUnderlined").checked;
  websiteMeta.ic.text.decoration.strikethrough = document.getElementById("settingsTextIsStrikethrough").checked;
  websiteMeta.ic.text.decoration.overline = document.getElementById("settingsTextIsOverlined").checked;
  `Finished at ${new Date}`.log();
  websiteMeta.log();

}
