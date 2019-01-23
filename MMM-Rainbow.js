Module.register("MMM-Rainbow",{
	defaults: {
		fadeTime: 1000,
		nextColor: 1000,
		modular: true,
		moduleList: [
			"MMM-iClock",
			"MMM-Showtimes"
		]
	},
	getScripts: function() {
		return ["jquery.js"];
	},
	start: function() {
		self = this;
		Log.info("Starting module: " + self.name);
		var classes = [".dimmed", ".normal", ".bright", ".wi", ".module-header", ".day", ".min-temp"];		//	, ".xsmall", ".small", ".medium", ".large", ".xlarge"
		var style = "";
		if(self.config.modular){
			item = [];
			for(var i = 0; i < self.config.moduleList.length; i++){
				for(var j = 0; j < classes.length; j++){
					style += "." + self.config.moduleList[i] + " " + classes[j] + ", ";
				}
				item.push("." + self.config.moduleList[i]);
			}
			style = style.substr(0, style.length - 2);
		} else style = "html, .dimmed, .normal, .bright, .medium, .large .wi, .module-header, .day, .min-temp, .clock";
		style = `<style>
		` + style + `{
			transition:`+self.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
			-o-transition:`+self.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
			-ms-transition:`+self.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
			-moz-transition:`+self.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
			-webkit-transition:`+self.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
		}
		</style>`;
		$('head').append(style);
		var R, G, B;
		setInterval(function() {
			R = Math.floor(Math.random() * 256);
			G = Math.floor(Math.random() * 256);
			B = Math.floor(Math.random() * 256);
			if(self.config.modular){
				for(var x = 0; x < item.length; x++){
					$(item[x] + " .dimmed").css("color", "rgba("+R+", "+G+", "+B+", .4)");
					$(item[x] + " .normal").css("color", "rgba("+R+", "+G+", "+B+", .7)");
					$(item[x] + " .bright").css("color", "rgba("+R+", "+G+", "+B+", 1)");
				}
			} else {
				$('html, header').css("border-color", "rgba("+R+", "+G+", "+B+", .4)");
				$('.dimmed').css("color", "rgba("+R+", "+G+", "+B+", .4)");
				$('.normal').css("color", "rgba("+R+", "+G+", "+B+", .7)");
				$('body, header, .bright').css("color", "rgba("+R+", "+G+", "+B+", 1)");
			}
		}, self.config.nextColor);
	}
});
