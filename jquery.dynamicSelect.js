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
console.log(typeof op.text);
        return this.each(function(){
            var $self = $(this);
            var selfVal = $self.val() ? $self.val() : '';
            if (!op.debug) {
                $self.hide();
            }

            var options = [];
            var selected = '';
            var exist = false;
            if (typeof op.text == 'string') {
                var items = op.text.split(',');
                if ($.inArray(selfVal, items) < 0) {
                    items.unshift(selfVal);
                }
                for (var i = 0, n = items.length; i < n; i++) {
                    if (selfVal == items[i]) {
                        selected = ' selected="selected"';
                    } else {
                        selected = '';
                    }
                    options.push('<option value="' + items[i] + '"' + selected + '>' + items[i] + '</option>');
                }
            } else if (typeof op.text == 'object') {
                for (var key in op.text) {
                    options.push('<optgroup label="' + key + '">');
                    for (var i = 0, n = op.text[key].length; i < n; i++) {
                        console.log(selfVal + ',' + op.text[key][i]);
                        console.log(selfVal == op.text[key][i]);
                        if (selfVal == op.text[key][i]) {
                            selected = ' selected="selected"';
                            exist = true;
                        } else {
                            selected = '';
                        }
                        options.push('<option value="' + op.text[key][i] + '"' + selected + '>' + op.text[key][i] + '</option>');
                    }
                    options.push('</optgroup>');
                }
                if (selfVal && !exist) {
                    options.unshift('<optgroup label="' + op.initGroupName + '"><option value="' + selfVal + '">' + selfVal + '</option></optgroup>');
                }
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
        promptMsg: '追加する項目名を入力',
        initGroupName: '選択中アイテム'
    };
})(jQuery);