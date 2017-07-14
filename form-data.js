jQuery.prototype.form = function (k, p) {
    var _$this = $(this);
    var opt = {
        loadOne: function (name, val) {
            var find = null;
            var thisName = null;
            if (0 !== _$this.find("[name='" + name + "']").length) {
                find = _$this.find("[name='" + name + "']");
                thisName = name;
            }
            else {
                thisName = name + "\\[\\]";
                find = _$this.find("[name='" + thisName + "']");
            }
            if (find.length === 0)
                return;

            switch (find.attr('type')) {
                case "radio" : {
                    checkedTag(find,val,thisName) ;
                    return;
                }
                case "checkbox" : {
                    if (val instanceof Array) {
                        $.each(val, function (i, val) {
                            checkedTag(find,val,thisName) ;
                        });

                    }
                    else if ('' === val || null === val) {
                        return ;
                    }
                    else {
                        checkedTag(find,val,thisName) ;
                    }
                    return;
                }
                default : {
                    find.val(!val && val !== 0 ? '' : val)
                }
            }

            function checkedTag(doms,val,name) {
                doms.filter("[value='" + val + "']").filter("[name='" + name + "']").prop('checked', true);
            }
        },
        load: function (o) {
            for (var item in o) {
                this.loadOne(item, o[item]);

            }
            return _$this ;
        },
        reload: function (o) {
            this.reset();
            this.load(o);
        },
        /**
         * exfunc附加方法
         * @param exfunc
         */
        reset: function () {
            _$this.find("input").each(function () {
                if ("radio" === $(this).attr('type')) {
                    _$this.find("input[name='" + $(this).attr('name') + "']").eq(0).prop('checked', true);
                    return;
                }
                if ("checkbox" === $(this).attr('type')) {
                    _$this.find("input[name='" + $(this).attr('name') + "']").prop('checked', false);
                    return;
                }

                $(this).val('');
            });
            _$this.find("textarea").each(function () {
                $(this).val('');
            });
            _$this.find("select").each(function () {
                $(this).find('option').eq(0).prop('selected', true);
            });
        },
        /**
         * require <bootstrap-validator>
         * @returns {boolean}
         */
        validate: function () {
            _$this.validator({
                custom: {
                    required: function ($el) { return !!$.trim($el.val()) }
                },
                errors: {
                    required: '请填写此字段。.'
                },
                feedback: {
                    success: 'fa fa-check',
                    error: 'fa fa-times-circle-o'
                }
            });
            _$this.validator('validate');
            var errorClass = "has-error";
            return !_$this.find('.' + errorClass).length > 0;
        }

    };

    return opt[k].apply(opt, [p]);
};