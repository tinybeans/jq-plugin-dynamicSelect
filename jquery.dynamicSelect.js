/*
 * jquery.dynamicSelect.js
 *
 * Copyright (c) Tomohiro Okuwaki (http://www.tinybeans.net/blog/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * Since:   2012-02-24
 * Update:  2012-02-24
 * version: 0.1
 * 
 */
(function($){
    $.fn.dynamicSelect = function(options){
        var op = $.extend({}, $.fn.dynamicSelect.defaults, options);

        return this.each(function(){
            var $self = $(this);
            var $selfVal = $self.val() ? $self.val() : '';
            var items = op.text.split(',');
            items.unshift($selfVal);

            if (!op.debug) {
                $self.hide();
            }
            var options = [];
            var selected = '';
            for (var i = 0, n = items.length; i < n; i++) {
                if ($selfVal == items[i]) {
                    selected = ' selected="selected"';
                } else {
                    selected = '';
                }
                options.push('<option value="' + items[i] + '"' + selected + '>' + items[i] + '</option>');
            }
            var select = [
                '<select class="dynamic_select">',
                    options.join(''),
                    '<option value="_add_">' + op.addText + '</option>',
                '</select>'
            ];
            var $select = $(select.join('')).change(function(){
                if ($(this).val() === '_add_') {
                    var $option = $(this).find('option');
                    var size = $option.size();
                    var additon = prompt(op.promptMsg,'');
                    $self.val(additon);
                    $option.eq(size-1).before('<option value="' + additon + '" selected="selected">' + additon + '</option>');
                } else {
                    $self.val($(this).val());
                }
            });
;
            $self.after($select);

        });
    };    
    $.fn.dynamicSelect.defaults = {
        debug: false,
        text: '', // カンマ区切りの文字列
        addText: '項目を追加する',
        promptMsg: '追加する項目名を入力'
    };
})(jQuery);