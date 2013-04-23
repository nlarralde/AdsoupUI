require(["dojo/dom", "dojo/dom-style", "dojo/_base/Color", "dojo/dom-attr", "dojo/on", "dojo/topic", "dojo/query", "dojo/mouse", "dojo/dnd/Moveable", "dojo/dom-construct", "dojox/widget/ColorPicker", "dojox/uuid", "dojo/domReady!"], 	
	function(dom, domStyle, Color, domAttr, on, topic, query, mouse, Moveable, domConstruct)
	{
		// GLOBALS
		var ITEM_NUMBER = 0; // Each item is associated with a number
		var BTN_ADD_SQUARE = dom.byId("btnAddSquare");
		var BTN_ADD_TXT = dom.byId("btnAddTxt");
		var BTN_ADD_DYN_TXT = dom.byId("btnAddDynTxt");
		var BTN_ADD_IMG = dom.byId("btnAddImg");
		var BTN_ADD_DYN_IMG = dom.byId("btnAddDynImg");
		var BTN_ADD_VIDEO = dom.byId("btnAddVideo");
		var IMG_WIDTH = 0, IMG_HEIGHT = 0;
		
		// Event Listener : AddSquare
		on(BTN_ADD_SQUARE, "click", function(evt)
		{
			ITEM_NUMBER++;
			
			// Create a square
			domConstruct.create("div", { id: "square_" + ITEM_NUMBER, class: "dndSquare", style: "z-index:" + ITEM_NUMBER }, "dndContainer");
			
			// Make it moveable
			var dndSqr = new Moveable("square_" + ITEM_NUMBER);
							
			// Refresh the properties
			var square = dom.byId("square_" + ITEM_NUMBER);
			
			// Dynamic events
			dynEvents = {
                id: "dynEvents",
                onClick: function(evt){refreshSqrProperties(this.id);},
				selected: function(evt){domStyle.set(this.id, {border: "1px solid yellow", cursor: "pointer"});},
				unSelected: function(evt){domStyle.set(this.id, "border", "1px solid black");}
            };
			
			// Each time the properties changes in the input, the item changes
			on(square, 'click', dynEvents.onClick);
			on(square, mouse.enter, dynEvents.selected);
			on(square, mouse.leave, dynEvents.unSelected);
		});
		
		// Event Listener : AddTxt
		on(BTN_ADD_TXT, "click", function(evt)
		{
			ITEM_NUMBER++;
			
			// Create a text
			domConstruct.create("div", { id: "txt_" + ITEM_NUMBER, class: "dndTxt", style: "z-index:" + ITEM_NUMBER, innerHTML: "Hi I am a text" }, "dndContainer");
			
			// Make it moveable
			var dndTxt = new Moveable("txt_" + ITEM_NUMBER);
							
			// Refresh the properties
			var txt = dom.byId("txt_" + ITEM_NUMBER);
			
			// Dynamic events
			dynEvents = {
                id: "dynEvents",
                onClick: function(evt){refreshTxtProperties(this.id);},
				selected: function(evt){domStyle.set(this.id, {border: "1px solid yellow", cursor: "pointer"});},
				unSelected: function(evt){domStyle.set(this.id, "border", "1px solid black");}
            };
			
			// Each time the properties changes in the input, the item changes
			on(txt, 'click', dynEvents.onClick);
			on(txt, mouse.enter, dynEvents.selected);
			on(txt, mouse.leave, dynEvents.unSelected);
		});
		
		// Event Listener : AddDynTxt
		on(BTN_ADD_DYN_TXT, "click", function(evt)
		{
			ITEM_NUMBER++;
			
			// Create a dyn text
			domConstruct.create("div", { id: "dyn_txt_" + ITEM_NUMBER, class: "dndTxt", style: "z-index:" + ITEM_NUMBER, innerHTML: "[txt]" }, "dndContainer");
			
			// Make it moveable
			var dndTxt = new Moveable("dyn_txt_" + ITEM_NUMBER);
							
			// Refresh the properties
			var txt = dom.byId("dyn_txt_" + ITEM_NUMBER);
			
			// Dynamic events
			dynEvents = {
                id: "dynEvents",
                onClick: function(evt){refreshTxtProperties(this.id, true);},
				selected: function(evt){domStyle.set(this.id, {border: "1px solid yellow", cursor: "pointer"});},
				unSelected: function(evt){domStyle.set(this.id, "border", "1px solid black");}
            };
			
			// Each time the properties changes in the input, the item changes
			on(txt, 'click', dynEvents.onClick);
			on(txt, mouse.enter, dynEvents.selected);
			on(txt, mouse.leave, dynEvents.unSelected);
		});
		
		// Event Listener : AddImg
		on(BTN_ADD_IMG, "click", function(evt)
		{
			ITEM_NUMBER++;
			
			// Create a dyn text
			domConstruct.create("img", { id: "img_" + ITEM_NUMBER, class: "dndImg", src: "http://files.meilleurduchef.com/mdc/photo/produits/cr1/bol_soupe_ceramique_11_le_creuset_cerise_01.jpg", style: "z-index:" + ITEM_NUMBER }, "dndContainer");
			
			// Make it moveable
			var dndImg = new Moveable("img_" + ITEM_NUMBER);
							
			// Refresh the properties
			var img = dom.byId("img_" + ITEM_NUMBER);
			
			// Dynamic events
			dynEvents = {
                id: "dynEvents",
                onClick: function(evt){refreshImgProperties(this.id);},
				selected: function(evt){domStyle.set(this.id, {border: "1px solid yellow", cursor: "pointer"});},
				unSelected: function(evt){domStyle.set(this.id, "border", "1px solid black");}
            };
			
			// Each time the properties changes in the input, the item changes
			on(img, 'click', dynEvents.onClick);
			on(img, mouse.enter, dynEvents.selected);
			on(img, mouse.leave, dynEvents.unSelected);
		});
			
		// Refresh the properties of squares objects
		function refreshSqrProperties(nodeId)
		{
			// Free the div properties
			domConstruct.empty("dndItemProperties");
			
			// Get the node
			var node = dom.byId(nodeId);
			
			domConstruct.create("span", { innerHTML: nodeId + "_properties<br/><br/>Width :<br/>" }, "dndItemProperties");
			domConstruct.create("input", { id: nodeId + "_width", value: domStyle.get(nodeId, "width")}, "dndItemProperties");
			domConstruct.create("span", { innerHTML: "<br/><br/>Height :<br/>" }, "dndItemProperties");
			domConstruct.create("input", { id: nodeId + "_height", value: domStyle.get(nodeId, "height")}, "dndItemProperties");
			domConstruct.create("span", { innerHTML: "<br/><br/>Bg Color :<br/>" }, "dndItemProperties");
			var generatedId = Date.now();
			domConstruct.create("button", { id: nodeId + "_" + generatedId.toString(), innerHTML: "ColorPicker" }, "dndItemProperties");
			domConstruct.create("input", { id: nodeId + "_bgcolor" }, "dndItemProperties");
			
			var widthInput = dom.byId(nodeId + "_width");
			var heightInput = dom.byId(nodeId + "_height");
			var changeColor = dom.byId(nodeId + "_" + generatedId.toString());
			var bgColorInput = dom.byId(nodeId + "_bgcolor");
			
			// Dynamic events
			dynEvents = {
                id: "dynEvents",
                width: function(evt){domStyle.set(nodeId, "width", widthInput.value + "px");},
				height: function(evt){domStyle.set(nodeId, "height", heightInput.value + "px");},
				changeColor: function(evt){var pickColor = new dojox.widget.ColorPicker({}, nodeId + "_" + generatedId.toString());},
				bgColor: function(evt){domStyle.set(nodeId, "backgroundColor", bgColorInput.value.toString());}
            };
			
			// Each time the properties changes in the input, the item changes
			on(widthInput, "change", dynEvents.width);
			on(heightInput, "change", dynEvents.height);
			on(changeColor, "click", dynEvents.changeColor);
			on(bgColorInput, "change", dynEvents.bgColor);
		}
		
		// Refresh the properties of texts objects
		function refreshTxtProperties(nodeId, dyn)
		{
			// Free the div properties
			domConstruct.empty("dndItemProperties");
			
			// Get the node
			var node = dom.byId(nodeId);
			
			domConstruct.create("span", { innerHTML: nodeId + "_properties" }, "dndItemProperties");
			if (dyn != true)
			{
				domConstruct.create("span", { innerHTML: "<br/><br/>Content :<br/>" }, "dndItemProperties");
				domConstruct.create("textarea", { id: nodeId + "_content", value: domAttr.get(nodeId, "innerHTML")}, "dndItemProperties");
			}
			domConstruct.create("span", { innerHTML: "<br/><br/>Font-size :<br/>" }, "dndItemProperties");
			domConstruct.create("select", { id: nodeId + "_fontsize", innerHTML: "<option>10px</option><option>12px</option><option>14px</option><option>16px</option><option>18px</option><option>20px</option>"}, "dndItemProperties");
			domConstruct.create("span", { innerHTML: "<br/><br/>Font-family :<br/>" }, "dndItemProperties");
			domConstruct.create("select", { id: nodeId + "_fontfamily", innerHTML: "<option>Arial</option><option>Arial Black</option><option>Comic Sans MS</option><option>Impact</option><option>Lucida Console</option><option>Tahoma</option><option>Times New Roman</option><option>Verdana</option>"}, "dndItemProperties");
			domConstruct.create("span", { innerHTML: "<br/><br/>Bg Color :<br/>" }, "dndItemProperties");
			var generatedId = Date.now();
			domConstruct.create("button", { id: nodeId + "_" + generatedId.toString() + "_bgcolor", innerHTML: "ColorPicker" }, "dndItemProperties");
			domConstruct.create("input", { id: nodeId + "_bgcolor" }, "dndItemProperties");
			domConstruct.create("span", { innerHTML: "<br/><br/>Text Color :<br/>" }, "dndItemProperties");
			var generatedId = Date.now();
			domConstruct.create("button", { id: nodeId + "_" + generatedId.toString() + "_txtcolor", innerHTML: "ColorPicker" }, "dndItemProperties");
			domConstruct.create("input", { id: nodeId + "_txtcolor" }, "dndItemProperties");
			
			if (dyn != true)
				var contentInput = dom.byId(nodeId + "_content");
			var fsInput = dom.byId(nodeId + "_fontsize");
			var ffInput = dom.byId(nodeId + "_fontfamily");
			var changeBgColor = dom.byId(nodeId + "_" + generatedId.toString() + "_bgcolor");
			var bgColorInput = dom.byId(nodeId + "_bgcolor");
			var changeTxtColor = dom.byId(nodeId + "_" + generatedId.toString() + "_txtcolor");
			var txtColorInput = dom.byId(nodeId + "_txtcolor");
			
			// Dynamic events
			dynEvents = {
                id: "dynEvents",
				content: function(evt){domAttr.set(nodeId, "innerHTML", contentInput.value);},
				fontSize: function(evt){domStyle.set(nodeId, "font-size", fsInput.value);},
				fontFamily: function(evt){domStyle.set(nodeId, "font-family", ffInput.value);},
				changeBgColor: function(evt){var pickBgColor = new dojox.widget.ColorPicker({}, nodeId + "_" + generatedId.toString() + "_bgcolor");},
				bgColor: function(evt){domStyle.set(nodeId, "backgroundColor", bgColorInput.value.toString());},
				changeTxtColor: function(evt){var pickTxtColor = new dojox.widget.ColorPicker({}, nodeId + "_" + generatedId.toString() + "_txtcolor");},
				txtColor: function(evt){domStyle.set(nodeId, "color", txtColorInput.value.toString());}
            };
			
			// Each time the properties changes in the input, the item changes
			if (dyn != true)
				on(contentInput, "change", dynEvents.content);
			on(fsInput, "change", dynEvents.fontSize);
			on(ffInput, "change", dynEvents.fontFamily);
			on(changeBgColor, "click", dynEvents.changeBgColor);
			on(bgColorInput, "change", dynEvents.bgColor);
			on(changeTxtColor, "click", dynEvents.changeTxtColor);
			on(txtColorInput, "change", dynEvents.txtColor);
		}
		
		// Refresh the properties of images objects
		function refreshImgProperties(nodeId)
		{
			// Keep the current img size
			IMG_WIDTH = domStyle.get(nodeId, "width");
			IMG_HEIGHT = domStyle.get(nodeId, "height");
		
			// Free the div properties
			domConstruct.empty("dndItemProperties");
			
			// Get the node
			var node = dom.byId(nodeId);
			
			domConstruct.create("span", { innerHTML: nodeId + "_properties<br/><br/>Width :<br/>" }, "dndItemProperties");
			domConstruct.create("input", { id: nodeId + "_width", value: domStyle.get(nodeId, "width")}, "dndItemProperties");
			domConstruct.create("span", { innerHTML: "<br/><br/>Height :<br/>" }, "dndItemProperties");
			domConstruct.create("input", { id: nodeId + "_height", value: domStyle.get(nodeId, "height")}, "dndItemProperties");
			
			var widthInput = dom.byId(nodeId + "_width");
			var heightInput = dom.byId(nodeId + "_height");
			
			// Dynamic events
			dynEvents = {
                id: "dynEvents",
                width: function(evt){scaleImg(nodeId, widthInput.value, 0);},
				height: function(evt){scaleImg(nodeId, 0, heightInput.value);}
            };
			
			// Each time the properties changes in the input, the item changes
			on(widthInput, "change", dynEvents.width);
			on(heightInput, "change", dynEvents.height);
		}
		
		// Scale an image
		// Put 0 on the axis you wanna scale, the value for the other axis
		// The nodeId object to be scaled
		function scaleImg(_nodeId, _newWidth, _newHeight)
		{
			var newH = 0, newW = 0;
			
			if (_newWidth != 0)
			{
				newW = _newWidth;
				newH = _newWidth*IMG_HEIGHT/IMG_WIDTH;
			}
				
			if (_newHeight != 0)
			{
				newH = _newHeight;
				newW = _newHeight*IMG_WIDTH/IMG_HEIGHT;
			}
			
			domStyle.set(_nodeId, {width: newW + "px", height: newH + "px"});
		}
	}
);