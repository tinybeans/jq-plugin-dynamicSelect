/*
 * jquery.dynamicSelect.js
 *
 * Copyright (c) Tomohiro Okuwaki (http://www.tinybeans.net/blog/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * Since:   2012-02-24
 * Update:  2012-03-01
 * version: 0.2
 * 
 */
(function($){
    $.fn.dynamicSelect = function(options){
        var op = $.extend({}, $.fn.dynamicSelect.defaults, options);
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
                if (!op.separateMode && $.inArray(selfVal, items) < 0) {
                    items.unshift(selfVal);
                }
                for (var i = 0, n = items.length; i < n; i++) {
                    var attr = separate(items[i]);
                    if (selfVal == attr[0]) {
                        selected = ' selected="selected"';
                    } else {
                        selected = '';
                    }
                    options.push('<option value="' + attr[0] + '"' + selected + '>' + attr[1] + '</option>');
                }
            } else if (typeof op.text == 'object') {
                for (var key in op.text) {
                    options.push('<optgroup label="' + key + '">');
                    for (var i = 0, n = op.text[key].length; i < n; i++) {
                        var attr = separate(op.text[key][i]);
                        if (selfVal == attr[0]) {
                            selected = ' selected="selected"';
                            exist = true;
                        } else {
                            selected = '';
                        }
                        options.push('<option value="' + attr[0] + '"' + selected + '>' + attr[1] + '</option>');
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
            if (op.separateMode) {
                $select.find('option').last().remove();
            }
            $self.after($select);

            function separate (str) {
                var array = [];
                if (str.match(/([^|]+)\|([^|]+)/)) {
                    array[0] = RegExp.$1;
                    array[1] = RegExp.$2;
                } else {
                    array[0] = str;
                    array[1] = str;
                }
                return array;
            }
        });
    };    
    $.fn.dynamicSelect.defaults = {
        debug: false,
        text: '', // カンマ区切りの文字列か連想配列と配列の入れ子。value|labelと分けることも可能（要separateMode: true）。
        addText: '項目を追加する',
        promptMsg: '追加する項目名を入力',
        initGroupName: '選択中アイテム',
        separateMode: false
    };
})(jQuery);