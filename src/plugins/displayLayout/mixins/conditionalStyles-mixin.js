import StyleRuleManager from "@/plugins/condition/StyleRuleManager";

export default {
    inject: ['openmct'],
    data() {
        return {
            itemStyle: this.itemStyle
        }
    },
    mounted() {
        this.domainObject = this.$parent.domainObject;
        this.itemId = this.item.id;
        this.setConditionalStyleForItem();
        this.initConditionalStyles();
    },
    destroyed() {
        if (this.stopListeningConditionalStyles) {
            this.stopListeningConditionalStyles();
        }
    },
    methods: {
        setConditionalStyleForItem() {
            if (this.domainObject.configuration.conditionalStyle) {
                this.conditionalStyle = this.domainObject.configuration.conditionalStyle[this.itemId];
            }
        },
        initConditionalStyles() {
            if (!this.styleRuleManager) {
                this.styleRuleManager = new StyleRuleManager(this.conditionalStyle, this.openmct);
                this.styleRuleManager.on('conditionalStyleUpdated', this.updateStyle.bind(this));
            } else {
                this.styleRuleManager.updateConditionalStyleConfig(this.conditionalStyle);
            }

            if (this.stopListeningConditionalStyles) {
                this.stopListeningConditionalStyles();
            }

            this.stopListeningConditionalStyles = this.openmct.objects.observe(this.domainObject, 'configuration.conditionalStyle', (newConditionalStyle) => {
                //Updating conditional styles in the inspector view will trigger this so that the changes are reflected immediately
                this.setConditionalStyleForItem(newConditionalStyle);
                this.styleRuleManager.updateConditionalStyleConfig(this.conditionalStyle);
            });
        },
        updateStyle(style) {
            this.itemStyle = style;
        }
    }
};
