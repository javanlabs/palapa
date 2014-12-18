if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.underline = function()
{
    return {
        init: function()
        {
            var button = this.button.addAfter('italic', 'underline', 'Underline');
            this.button.addCallback(button, this.underline.format);
        },
        format: function()
        {
            this.inline.format('u');
        }
    };
};
