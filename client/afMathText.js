Template.afMathText.onCreated(function() {
    this.fieldId = Random.id();
    this.id = Random.id();
})

Template.afMathText.onRendered(function() {
    var mathFieldSpan = document.getElementById(this.fieldId);

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
    }
})

Template.afMathText.events({
    'click .sqr' (event, instance) {
        instance.mathField.cmd('^');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click .pls' (event, instance) {
        instance.mathField.cmd('+');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click .min' (event, instance) {
        instance.mathField.cmd('-');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click .mul' (event, instance) {
        instance.mathField.cmd('\\cdot');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click .div' (event, instance) {
        instance.mathField.cmd('\\frac');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click .sqrt' (event, instance) {
        instance.mathField.cmd('\\sqrt');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click .sqrt3' (event, instance) {
        instance.mathField.write('\\sqrt[3]{}');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click .pi' (event, instance) {
        instance.mathField.write('\\pi');
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    },
    'click #math-field' (event) {
        var $target = $("#displayExpress");

        //$target.fadeIn(300);
        $target.css('display', 'show');
    },
    'change .mq-textarea, paste .mq-textarea, keyup .mq-textarea, keydown .mq-textarea' (event, instance) {
        $('input[type=text][data-id=' + instance.id + ']').val(instance.mathField.latex());
    }
})

AutoForm.addInputType("math", {
    template: "afMathText",
    valueOut: function() {
        return this.val();
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