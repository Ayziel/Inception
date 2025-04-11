
// Toggle the visibility of a dropdown menu
const toggleDropdown = (dropdown, menu, isOpen) => {
dropdown.classList.toggle("open", isOpen);
menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
};

// Close all open dropdowns
const closeAllDropdowns = () => {
document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
    toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
});
};

// Attach click event to all dropdown toggles
document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();

    const dropdown = dropdownToggle.closest(".dropdown-container");
    const menu = dropdown.querySelector(".dropdown-menu");
    const isOpen = dropdown.classList.contains("open");

    closeAllDropdowns(); // Close all open dropdowns
    toggleDropdown(dropdown, menu, !isOpen); // Toggle current dropdown visibility
});
});

// Attach click event to sidebar toggle buttons
document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
button.addEventListener("click", () => {
    closeAllDropdowns(); // Close all open dropdowns
    document.querySelector(".sidebar").classList.toggle("collapsed"); // Toggle collapsed class on sidebar
});
});

// Collapse sidebar by default on small screens
if (window.innerWidth <= 1024) document.querySelector(".sidebar").classList.add("collapsed");

// Category Selection
const select = document.getElementById('category-dropdown');
const selectedOptions = document.getElementById('selected-options');
const selectedValues = new Set();

select.addEventListener('change', () => {
  const value = select.value;

  if (value && !selectedValues.has(value)) {
    selectedValues.add(value);

    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${value} <span class="remove-tag" data-value="${value}">x</span>`;

    selectedOptions.appendChild(tag);
    selectedOptions.classList.add('has-tags');
  }

  select.selectedIndex = 0; // Reset select to placeholder
});

selectedOptions.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-tag')) {
    const value = e.target.getAttribute('data-value');
    selectedValues.delete(value);
    e.target.parentElement.remove();

    // Hide the container if no more selected values
    if (selectedValues.size === 0) {
        selectedOptions.classList.remove('has-tags');
    }
  }
});
