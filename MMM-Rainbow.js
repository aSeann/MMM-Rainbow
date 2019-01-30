var Rainbow;
var Item = [];
Module.register("MMM-Rainbow",{
	defaults: {
		fadeTime: 1000,
		nextColor: 1000,
		modular: true,
		random: true,
		colors: [
			"#F00",	//	Red
			"#FF0",	//	Yellow
			"#0F0",	//	Green
			"#0FF",	//	Cyan
			"#00F",	//	Blue
			"#F0F"	//	Magenta
		],
		moduleList: [
			"MMM-iClock",
			"MMM-Showtimes"
		]
	},
	getScripts: function() {
		return ["jquery.js"];
	},
	start: function() {
		Rainbow = this;
		Log.info("Starting module: " + Rainbow.name);
		var classes = [".dimmed", ".normal", ".bright", ".wi", ".module-header", ".day", ".min-temp"];		//	, ".xsmall", ".small", ".medium", ".large", ".xlarge"
    var browsers = ["", "-o-", "-ms-", "-moz-", "-webkit-"];
    var styleElem = document.createElement('style');
    styleElem.className = "Rainbow";
    var style = "";
		if(Rainbow.config.modular){
			for(var i = 0; i < Rainbow.config.moduleList.length; i++){
				for(var j = 0; j < classes.length; j++)
					style += "." + Rainbow.config.moduleList[i] + " " + classes[j] + ", ";
				Item.push("." + Rainbow.config.moduleList[i]);
			}
			style = "html, " + style;
			style = style.substr(0, style.length - 2) + "{";
		} else style = "html, .dimmed, .normal, .bright, .small, .medium, .large .wi, .module-header, .day, .min-temp, .clock{";
    for(var i = 0; i < browsers.length; i++)
      style += browsers[i] + "transition:"+Rainbow.config.fadeTime+"ms cubic-bezier(.4, 0, .2, 1);";
    style += "}";
    styleElem.innerHTML = style;
    document.getElementsByTagName("head")[0].appendChild(styleElem);
    var C = [];
    var Color = 0;
		setInterval(function() {
      if(Rainbow.config.random)
        C = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
      else {
        C = Rainbow.getColor(Rainbow.config.colors[Color]);
        Color++;
        if(Color === Rainbow.config.colors.length)
          Color = 0;
      }
			if(Rainbow.config.modular){
				for(var x = 0; x < Item.length; x++){
					$(Item[x] + " .dimmed").css("color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", .4)");
					$(Item[x] + " .normal").css("color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", .7)");
					$(Item[x] + " .bright").css("color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", 1)");
					$('html, ' + Item[x] + " header").css("border-color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", .4)");
					$(Item[x] + " header").css("color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", .4)");
				}
			} else {
				$('html, header').css("border-color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", .4)");
				$('.dimmed').css("color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", .4)");
				$('.normal').css("color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", .7)");
				$('body, header, .bright').css("color", "rgba("+C[0]+", "+C[1]+", "+C[2]+", 1)");
			}
		}, Rainbow.config.nextColor);
	},
  getColor: function(col){
    if(col.startsWith("#")){
      ret = [];
      for(var i = 0; i < 3; i++){
        if(col.length === 4)
          ret[i] = Math.pow(parseInt(col.substr(i+1, 1), 16), 2);
        else if(col.length === 7)
          ret[i] = parseInt(col.substr(i+1 +(i * 2), 1), 16);
        else return false;
      }
    } else if(col.startswith("rgb"))
      return col.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');
    return ret;
  },
});
