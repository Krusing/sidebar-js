
// SimpleSidebar.js
// A simplified sidebar class to add a sidebar to an HTML page

class SimpleSidebar {
    constructor() {
        // Create the sidebar container
        this.sidebarContainer = document.createElement('div');
        this.sidebarContainer.id = 'simple-sidebar';
        this.sidebarContainer.style.width = '250px';
        this.sidebarContainer.style.height = '100%';
        this.sidebarContainer.style.position = 'fixed';
        this.sidebarContainer.style.top = '0';
        this.sidebarContainer.style.left = '-250px';
        this.sidebarContainer.style.backgroundColor = '#111';
        this.sidebarContainer.style.overflowX = 'hidden';
        this.sidebarContainer.style.transition = '0.5s';
        
        // Create close button
        this.closeBtn = document.createElement('a');
        this.closeBtn.innerHTML = 'Close';
        this.closeBtn.style.position = 'absolute';
        this.closeBtn.style.top = '20px';
        this.closeBtn.style.right = '20px';
        this.closeBtn.style.color = '#818181';
        this.closeBtn.style.textDecoration = 'none';
        this.closeBtn.addEventListener('click', () => this.closeSidebar());
        
        this.sidebarContainer.appendChild(this.closeBtn);
        
        // Append to body
        document.body.appendChild(this.sidebarContainer);
    }

    openSidebar() {
        this.sidebarContainer.style.left = '0';
    }

    closeSidebar() {
        this.sidebarContainer.style.left = '-250px';
    }

    // You can add more methods here to add content, links, etc.
}

// Initialize the sidebar
const sidebar = new SimpleSidebar();

// Add open button to the page (you can add this button in your HTML instead)
const openBtn = document.createElement('button');
openBtn.innerHTML = 'Open Sidebar';
openBtn.addEventListener('click', () => sidebar.openSidebar());
document.body.appendChild(openBtn);
