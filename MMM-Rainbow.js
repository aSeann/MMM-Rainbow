Module.register("MMM-Rainbow",{
	defaults: {
		fadeTime: 1000,
		nextColor: 1000
	},
	getScripts: function() {
		return ["jquery.js"];
	},
	start: function() {
		Log.info("Starting module: " + this.name);
		var style = `<style>
			.dimmed, .normal, .bright, .large .wi, .module-header, .day, .min-temp, .clock{
				transition:`+this.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
				-o-transition:`+this.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
				-ms-transition:`+this.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
				-moz-transition:`+this.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
				-webkit-transition:`+this.config.fadeTime+`ms cubic-bezier(.4, 0, .2, 1);
			}
		</style>`;
		$('head').append(style);
		var R, G, B;
		setInterval(function() {
			R = Math.floor(Math.random() * 256);
			G = Math.floor(Math.random() * 256);
			B = Math.floor(Math.random() * 256);
			$('.dimmed').css("color", "rgba("+R+", "+G+", "+B+", .4)");
			$('.normal').css("color", "rgba("+R+", "+G+", "+B+", .7)");
			$('body, header, .bright').css("color", "rgba("+R+", "+G+", "+B+", 1)");
		}, this.config.nextColor);
	}
});
