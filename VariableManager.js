export const VariableManager = {
    variables: {},
    variableLabels: {},
    linkedElements: {},

    add: function (name, value) {
        this.variables[name] = value;
    },
    get: function (name) {
        return this.variables[name];
    },
    update: function (name, value) {
        this.variables[name] = value;
    },
    getSlider: function (name) {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = this.variables[name];
        slider.addEventListener('input', (event) => {
            this.update(name, parseInt(event.target.value));
            if (this.linkedElements[name]) {
                this.linkedElements[name].innerText = this.variables[name];
            }
            console.log(name, event.target.value);
        });
        return slider;
    },
    addSlider: function (name) {
        const sliderContainer = document.createElement('div');
        sliderContainer.id = name;
        sliderContainer.className = 'vm-range';

        const label = document.createElement('label');
        label.id = `${name}-label`;
        label.setAttribute('for', `${name}-input`);
        label.innerText = this.variableLabels[name] || name;

        const input = document.createElement('input');
        input.id = `${name}-input`;
        input.type = 'range';
        input.min = '0';
        input.max = '100';
        input.value = this.variables[name];
        input.addEventListener('input', (event) => {
            this.update(name, parseInt(event.target.value));
            const valueSpan = document.getElementById(`${name}-value`);
            if (valueSpan) {
                valueSpan.innerText = this.variables[name];
            }
        });

        const valueSpan = document.createElement('span');
        valueSpan.id = `${name}-value`;
        valueSpan.className = 'vm-span';
        valueSpan.innerText = this.variables[name];

        sliderContainer.appendChild(label);
        sliderContainer.appendChild(input);
        sliderContainer.appendChild(valueSpan);

        return sliderContainer;
    },
    addSliderLink: function (name, value, containerId) {
        this.add(name, value);
        const slider = this.getSlider(name);
        const container = document.getElementById(containerId);
        if (container) {
            container.appendChild(slider);
        }
    },
    link: function (name, elementId) {
        this.linkedElements[name] = document.getElementById(elementId);
        if (this.linkedElements[name]) {
            this.linkedElements[name].innerText = this.variables[name];
        }
    },
};
