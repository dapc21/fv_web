Ext.namespace('Validator.lib.Form.Field.VTypes'); 
/**
 * Validator class, contain's every virtual validation to be applied into the forms
 * @name VTypes
 */
Ext.define('LoadPrincipal.lib.Form.Field.VTypes', {
    /**
     * Reg exp to validators
     */
    pin: /(?!(.)\1\1).{3}/,
    numeric: /^-?[0-9]\d*([.]\d+)?$/,
    numericN: /^[0-9]\d*$/,
    numericUpZero: /^[1-9]\d*$/,
    numericR: /^[0-9]\d*([.]\d+)?$/,
    numericRx2: /^[1-9]\d*([.][0-9]{2})?$/,
    numericRx2Zero: /^[0-9]\d*([.][0-9]{2})?$/,
    codensa: /^[1-9]\d*([-]\d+)?$/,
    alphabetic: /^[a-z A-Z äáàëéèíìöóòúùñçÁÉÍÓÚÑ]*$/,
    alphanumeric: /^[a-z A-Z 0-9 äáàëéèíìöóòúùñçÁÉÍÓÚÑ]*$/,
    specialchars: /^[a-z A-Z 0-9äáàëéèíìöóòúùñçÁÉÍÓÚÑ(-_*\/),.#]*$/,
    specialnumeric: /^[0-9(-)]*$/,
    numericBase5: /^(5|10|15|20|25|30|35|40|45|50|55|60])$/,
    numericBase15: /^(15|30|45|60)$/,
    numericBase30: /^(30|60|90|120|150|180|210|240|270|300|330|360|390|420|450|480)$/,
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    emails: /^\s*(?:\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2,5}){0,1}\b[,;\s]*)+$/,
    emailEndesa: /^([a-zA-Z0-9_\.\-])+\@(endesacolombia.com.co|ENDESACOLOMBIA.COM.CO|enel.com.co|enel.com|ENEL.COM.CO|ENEL.COM)+$/,
    emailsEndesa: /^\s*(?:\w+@(endesacolombia.com.co|ENDESACOLOMBIA.COM.CO|enel.com.co|enel.com|ENEL.COM.CO|ENEL.COM)\b[,;\s]*)+$/,
    ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    plate: /^[a-z A-Z]{3}[0-9]{3}?$/,
    price: /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/,
    daterange: '',
    /**
     *  starts the class and run all validation functions to be used
     */
    init: function () {
 
        //pin number
        this.pinFn();
        //alphabetic
        this.alphabeticFn();
        //alphabetic
        this.alphanumericFn();
        //alphabetic
        this.specialcharsFn();
        //numeric
        this.codensaFn();
        //numeric
        this.numericFn();
        //numeric
        this.numericUpZeroFn();
        //numeric
        this.numericNFn();
        //numeric
        this.numericRFn();
        //numeric
        this.numericRx2Fn();
        //numeric
        this.numericRx2ZeroFn();
        //numeric
        this.numericBase5Fn();
        //numeric
        this.numericBase15Fn();
        //numeric
        this.numericBase30Fn();
        //numeric
        this.numeric168Fn();
        //numeric
        this.numeric480Fn();
        //email
        this.emailFn();
        //emails
        this.emailsFn();
        //email
        this.emailEndesaFn();
        //email
        this.emailsEndesaFn();
        //ip
        this.ipFn();
        //daterange
        this.daterangeFn();
        //plate
        this.plateFn();
        //price
        this.priceFn();
    },
    /**
     * @method pinFn
     * evaluate pin numbers
     */
    pinFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            pin:function (val, field) {
                //check value
                return me.pin.test(val);
            },
            pinText: 'Wrong PIN number (numbers cannot be identical)'
        });
    },
    /**
     * @method numericFn
     * evaluate only nuumber format
     */
    numericFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numeric:function (val, field) {
                //check value
                return me.numeric.test(val);
            },
            numericText: 'El campo debe ser numérico'
        });
    },
    /**
     * @method codensaFn
     * specific codensa numbers
     */
    codensaFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            codensa:function (val, field) {
                //check value
                return me.codensa.test(val);
            },
            codensaText: 'No es un n\xfamero codensa v\xe1lido'
        });
    },
    /**
     * @method alphabeticFn
     * string only alpha characters
     */
    alphabeticFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            alphabetic:function (val, field) {
                //check value
                return me.alphabetic.test(val);
            },
            alphabeticText: 'El campo debe ser alfabetico'
        });
    },
    /**
     * @method alphanumericFn
     * evaluate alpha and number strings
     */
    alphanumericFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            alphanumeric:function (val, field) {
                //check value
                return me.alphanumeric.test(val);
            },
            alphanumericText: 'El campo debe ser alfanumerico'
        });
    },
    /**
     * @method specialcharsFn
     * evaluate alpha and number strings, acepts some special chars (-_*\/),.#
     */
    specialcharsFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            specialchars:function (val, field) {
                //check value
                return me.specialchars.test(val);
            },
            specialcharsText: 'El campo debe ser alfanumerico, admite s\xf3lo ciertos caracteres especiales ()-_*\/#,.'
        });
    },
    /**
     * @method numericRFn
     * evaluate numbers with decimal
     */
    numericRFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericR:function (val, field) {
                //check value
                return me.numericR.test(val);
            },
            numericRText: 'El campo debe ser numérico positivo, decimal con "."'
        });
    },
    /**
     * @method numericNFn
     * evaluate only numbers, no decimal
     */
    numericNFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericN:function (val, field) {
                //check value
                return me.numericN.test(val);
            },
            numericNText: 'El campo debe ser numérico positivo, sin decimales'
        });
    },
    /**
     * @method numericUpZeroFn
     * evaluate numbers, no decimal accept zero
     */
    numericUpZeroFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericUpZero:function (val, field) {
                //check value
                return me.numericUpZero.test(val);
            },
            numericUpZeroText: 'El campo debe ser numérico positivo, mayor que 0'
        });
    },
    /**
     * @method numericRx2Fn
     * evaluate numbers with exactly 2 decimal
     */
    numericRx2Fn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericRx2:function (val, field) {
                //check value
                return me.numericRx2.test(val);
            },
            numericRx2Text: 'El campo debe ser numérico positivo, decimal de 2 d\xedgitos separado por "."'
        });
    },
    /**
     * @method numericRx2ZeroFn
     * evaluate numbers with exactly 2 decimal, accept zero
     */
    numericRx2ZeroFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericRx2Zero:function (val, field) {
                //check value
                return me.numericRx2Zero.test(val);
            },
            numericRx2ZeroText: 'El campo debe ser numérico positivo o cero, decimal de 2 d\xedgitos separado por "."'
        });
    },
    /**
     * @method numericBase5Fn
     * evaluate numbers multiplier of 5
     */
    numericBase5Fn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericBase5:function (val, field) {
                //check value
                return me.numericBase5.test(val);
            },
            numericBase5Text: 'El campo debe ser numérico en intervalos de 5'
        });
    },
    /**
     * @method numericBase15Fn
     * evaluate numbers multiplier of 15
     */
    numericBase15Fn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericBase15:function (val, field) {
                //check value
                return me.numericBase15.test(val);
            },
            numericBase15Text: 'El campo debe ser numérico en intervalos de 15 hasta 60'
        });
    },
    /**
     * @method numericBase30Fn
     * evaluate numbers multiplier of 30
     */
    numericBase30Fn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numericBase30:function (val, field) {
                //check value
                return me.numericBase30.test(val);
            },
            numericBase30Text: 'El campo debe ser numérico en intervalos de 30 y menor que 480'
        });
    },
    /**
     * @method numeric168Fn
     * evaluate numbers,  must to be lower than 168
     */
    numeric168Fn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numeric168:function (val, field) {
                //check value
                if(me.numericN.test(val)){
                    return (val<=168);
                }else{
                    return false;
                }
            },
            numeric168Text: 'No se pueden superar las 168 horas. Sin decimales'
        });
    },
    /**
     * @method numeric480Fn
     * evaluate numbers,  must to be lower than 480
     */
    numeric480Fn: function() {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            numeric480:function (val, field) {
                //check value
                if(me.numericN.test(val)){
                    return (val<=480);
                }else{
                    return false;
                }
            },
            numeric480Text: 'No se pueden superar los 480 minutos. Sin decimales'
        });
    },
    /**
     * @method emailFn
     * evaluate simple email
     */
    emailFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            email:function (val, field) {
                //check value
                return me.email.test(val);
            },
            emailText: 'El campo no es un email válido'
        });
    },
    /**
     * @method emailsFn
     * evaluate multiple email
     */
    emailsFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            emails:function (val, field) {
                //check value
                return me.emails.test(val);
            },
            emailsText: 'Uno o varios correos no son v\xe1lidos'
        });
    },
    /**
     * @method emailEndesaFn
     * evaluate simple email with specific domain
     */
    emailEndesaFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            emailEndesa:function (val, field) {
                //check value
                return me.emailEndesa.test(val);
            },
            emailEndesaText: 'El campo no es un email corporativo válido'
        });
    },
    /**
     * @method emailsEndesaFn
     * evaluate multiple emails with specific domains
     */
    emailsEndesaFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            emailsEndesa:function (val, field) {
                //check value
                return me.emailsEndesa.test(val);
            },
            emailsEndesaText: 'Uno o varios correos no son corporativos o válidos'
        });
    },
    /**
     * @method ipFn
     * evaluate string like ip address
     */
    ipFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            ip:function (val, field) {
                //check value
                return me.ip.test(val);
            },
            ipText: 'El campo no es una ip válida'
        });
    },
    /**
     * @method passwordFn
     * evaluate password string
     */
    passwordFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            password:function (val, field) {
                //check value
                return me.password.test(val);
            },
            passwordText: 'Las contrase\xf1as deben tener 8 caracteres como m\xednimo </br> y debe contener al menos los siguientes elementos: </br> Una letra may\xfascula. </br> Una letra min\xfascula.</br> Un n\xfamero o caracter especial'
        });
    },
    /**
     * @method plateFn
     * evaluate string like a plate xxx000
     */
    plateFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            plate:function (val, field) {
                //check value
                return me.plate.test(val);
            },
            plateText: 'La placa está compuesta por tres letras seguidas de tres números'
        });
    },
    /**
     * @method priceFn
     */
    priceFn:function () {
        var me = this;
 
        Ext.apply(Ext.form.field.VTypes, {
            price:function (val, field) {
                //check value
                return me.price.test(val);
            },
            price: 'Money format (numbers, commas and points) example: $1,530,602.24 or 1,530,602.24'
        });
    },
    daterangeFn:function(){
        Ext.apply(Ext.form.field.VTypes, {
            daterange: function (val, field) {
                var date = field.parseDate(val);
                var postDate = new Date(date);
                postDate.setMonth(date.getMonth() + 1);
                var preDate = new Date(date);
                preDate.setMonth(date.getMonth() - 1);
                if (!date) {
                    return false;
                }
                if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                    var start = field.up('form').down('#' + field.startDateField);
                    start.setMaxValue(date);
                    start.setMinValue(preDate);
                    this.dateRangeMax = date;
                    start.validate();
                }
                else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                    var end = field.up('form').down('#' + field.endDateField);
                    end.setMinValue(date);
                    end.setMaxValue(postDate);
                    this.dateRangeMin = date;
                    end.validate();
                }
                /*
                 * Always return true since we're only using this vtype to set the
                 * min/max allowed values (these are tested for after the vtype test)
                 */
                return true;
            },
            daterangeText: 'Start date must be less than end date',
        });
    },
    

});

