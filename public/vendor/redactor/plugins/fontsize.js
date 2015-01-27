if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
	RedactorPlugins.fontsize = function()
	{
		return {
			init: function()
			{
				var fonts = [9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 30, 48, 64];
				var that = this;
				var dropdown = {};

				$.each(fonts, function(i, s)
				{
					dropdown['s' + i] = { title: s + 'px', func: function() { that.fontsize.set(s); } };
				});

				dropdown.remove = { title: 'Remove Font Size', func: that.fontsize.reset };

				var button = this.button.addAfter('formatting', 'fontsize', 'Change Font Size');
				this.button.addDropdown(button, dropdown);
			},
			set: function(size)
			{
                console.log(this.inline);
				this.inline.format('span', 'style', 'font-size: ' + size + 'px;');
			},
			reset: function()
			{
				this.inline.removeStyleRule('font-size');
			}
		};
	};
})(jQuery);