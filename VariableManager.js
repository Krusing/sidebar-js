export const VariableManager = {
    variables: {},
    add: function (name, value) {
        this.variables[name] = value;
    },
    get: function (name) {
        return this.variables[name];
    },
    update: function (name, value) {
        this.variables[name] = value;
    },
    inputSlider: function (name) {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = this.variables[name];
        slider.addEventListener('input', (event) => {
            this.update(name, parseInt(event.target.value));
        });
        return slider;
    },
};
