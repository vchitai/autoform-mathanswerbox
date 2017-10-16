Template.afMathText.onCreated(function() {
    this.fieldId = Random.id();
    this.id = Random.id();
    this.displayId = Random.id();
})

Template.afMathText.onRendered(function() {
    var mathFieldSpan = document.getElementById(this.fieldId);
    if (this.data.value.charAt(0) == '$')
        this.data.value = this.data.value.substr(2, this.data.value.length-4);
    $('#'+this.fieldId).html(this.data.value);
    var MQ = MathQuill.getInterface(2); // for backcompat
    this.mathField = MQ.MathField(mathFieldSpan, {
        spaceBehavesLikeTab: true
    });
})

Template.afMathText.helpers({
    getId: function() {
        return Template.instance().id;
    },
    fieldId: function() {
        return Template.instance().fieldId;
    },
    displayId: function() {
        return Template.instance().displayId;
    }
})

Template.afMathText.events({
    'click .sqr' (event, instance) {
        instance.mathField.cmd('^2');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();

    },
    'click .pls' (event, instance) {
        instance.mathField.cmd('+');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();
    },
    'click .min' (event, instance) {
        instance.mathField.cmd('-');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();
    },
    'click .mul' (event, instance) {
        instance.mathField.cmd('\\times');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();
    },
    'click .div' (event, instance) {
        instance.mathField.cmd('\\frac');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();
    },
    'click .sqrt' (event, instance) {
        instance.mathField.cmd('\\sqrt');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();
    },
    'click .sqrt3' (event, instance) {
        instance.mathField.write('\\sqrt[3]{}');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();
    },
    'click .pi' (event, instance) {
        instance.mathField.cmd('\\pi');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
        instance.mathField.focus();
    },
    'click span.mq-editable-field.mq-math-mode' (event, instance) {
        var $target = $("#"+instance.displayId);

        $(".expression").children().fadeOut(0);
        $target.fadeIn(0);
    },
    'click #closeButton' (event, instance) {
        var $target = $("#"+instance.displayId);

        $target.fadeOut(0);
    },
    'change .mq-textarea, paste .mq-textarea, keyup .mq-textarea, keydown .mq-textarea' (event, instance) {
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    }
})

AutoForm.addInputType("math", {
    template: "afMathText",
    valueOut: function() {
        let val = this.val();
        if (val.charAt(0) == '$')
            return val;
        else 
            return "$$"+val+"$$";
    },
    valueConverters: {
        "stringArray": AutoForm.valueConverters.stringToStringArray,
        "number": AutoForm.valueConverters.stringToNumber,
        "numberArray": AutoForm.valueConverters.stringToNumberArray,
        "boolean": AutoForm.valueConverters.stringToBoolean,
        "booleanArray": AutoForm.valueConverters.stringToBooleanArray,
        "date": AutoForm.valueConverters.stringToDate,
        "dateArray": AutoForm.valueConverters.stringToDateArray
    },
    contextAdjust: function(context) {
        if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
            context.atts.maxlength = context.max;
        }
        return context;
    }
});