
// SimpleSidebar.js with enhanced functionality
// A simplified sidebar class to add a sidebar to an HTML page

class SimpleSidebar {
    constructor() {

        this.sidebarWidth = '250px';
        this.sidebarLeft = '-250px';
        
        this.variableValue = 50;

        // Connect the sidebar to main
        this.main = document.querySelector('main');
        this.main.style.transition = '0.5s';

        // Create the sidebar container
        this.sidebarContainer = document.createElement('div');
        this.sidebarContainer.id = 'simple-sidebar';
        this.sidebarContainer.style.width = this.sidebarWidth;
        this.sidebarContainer.style.height = '100%';
        this.sidebarContainer.style.position = 'fixed';
        this.sidebarContainer.style.top = '0';
        this.sidebarContainer.style.left = this.sidebarLeft;
        this.sidebarContainer.style.backgroundColor = '#111';
        this.sidebarContainer.style.overflowX = 'hidden';
        this.sidebarContainer.style.transition = '0.5s';
        
        // Create close button
        this.closeBtn = document.createElement('button');
        this.closeBtn.innerHTML = 'Close';
        this.closeBtn.style.position = 'absolute';
        this.closeBtn.style.top = '20px';
        this.closeBtn.style.right = '20px';
        this.closeBtn.addEventListener('click', () => this.closeSidebar());
        
        this.sidebarContainer.appendChild(this.closeBtn);

        
        // Create a slider to control a JavaScript variable
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.min = '0';
        this.slider.max = '100';
        this.slider.value = '50';
        this.slider.addEventListener('input', () => this.redrawCanvas());
        this.slider.addEventListener('mouseenter', () => this.handleSliderHover(true));
        this.slider.addEventListener('mouseleave', () => this.handleSliderHover(false));

        // Create a label to display the variable
        this.label = document.createElement('p');
        this.label.innerHTML = `Variable: ${this.slider.value}`;
        
        // Append slider and label to sidebar
        this.sidebarContainer.appendChild(this.slider);
        this.sidebarContainer.appendChild(this.label);
        
        // Append to body
        document.body.appendChild(this.sidebarContainer);

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext('2d');

        this.circleClicked = false;
        this.canvas.addEventListener('click', (event) => this.handleCanvasClick(event));

        this.main.appendChild(this.canvas);
    }

    openSidebar() {
        this.sidebarContainer.style.left = '0';

        this.main.style.transform = `translateX(${this.sidebarWidth})`;
    }

    closeSidebar() {
        this.sidebarContainer.style.left = this.sidebarLeft;

        this.main.style.transform = 'translateX(0)';
    }

    handleSliderHover(isHovered) {
        if (isHovered) {
            this.slider.addEventListener('wheel', this.handleSliderMouseWheel.bind(this));
        } else {
            this.slider.removeEventListener('wheel', this.handleSliderMouseWheel);
        }        
    }

    handleSliderMouseWheel(event) {
        const delta = event.deltaY > 0 ? 1 : -1;
        this.slider.value = parseInt(this.slider.value) + delta;
        this.redrawCanvas();
    }

    handleCanvasClick(event) {
        const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = this.variableValue * 2;

        const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);

        if (distance <= radius) {
            this.circleClicked = !this.circleClicked;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if (this.circleClicked) {
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'blue';
                this.ctx.fill();

                const squareSize = radius * 2;
                this.ctx.strokeStyle = 'green';
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(centerX - radius, centerY - radius, squareSize, squareSize);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'blue';
                this.ctx.fill();
            }
        }
    }

    redrawCanvas() {
        // Update JavaScript variable
        this.variableValue = this.slider.value;
        
        // Draw a circle in canvas with a radius of variable value
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = this.variableValue * 2;

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();

        // Update label
        this.label.innerHTML = `Variable: ${this.variableValue}`;

        // Here you can add code to do something with the variable
        console.log(`Updated variable: ${this.variableValue}`);
    }
}

// Initialize the sidebar
const sidebar = new SimpleSidebar();

// Add open button to the page (you can add this button in your HTML instead)
const openBtn = document.createElement('button');
openBtn.innerHTML = 'Open Sidebar';
openBtn.addEventListener('click', () => sidebar.openSidebar());
sidebar.main.appendChild(openBtn);

