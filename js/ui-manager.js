/* ================================================================
   MODULE 3: UIManager
   Responsibility: DOM manipulation, View Switching, Form logic,
   Template picker rendering, Toast Notifications
   ================================================================ */
const UIManager = {
    views: ['step-landing', 'step-personal', 'step-education', 'step-work', 'step-projects', 'step-extra', 'step-preview'],

    elements: {
        header: document.getElementById('header-section'),
        progressBar: document.getElementById('progress-bar'),
        stepText: document.getElementById('step-indicator'),
        toast: document.getElementById('toast'),
        toastMsg: document.getElementById('toast-message'),
        qualificationsContainer: document.getElementById('qualifications-container'),
        previewPaper: document.getElementById('preview-paper'),
        templatePicker: document.getElementById('template-picker')
    },

    /* --- Dynamic Qualification Logic --- */

    renderQualifications(qualifications) {
        const container = this.elements.qualificationsContainer;
        container.innerHTML = '';

        if (!qualifications || qualifications.length === 0) {
            this.addQualificationField();
            return;
        }

        qualifications.forEach((q, index) => {
            this.addQualificationField(q, index);
        });
    },

    validateNumberInput(input) {
        input.value = input.value.replace(/[^0-9]/g, '');
    },

    validateDecimalInput(input) {
        input.value = input.value.replace(/[^0-9.]/g, '');
    },

    addQualificationField(data = { status: 'Completed' }, index = null) {
        const container = this.elements.qualificationsContainer;
        const count = container.children.length;

        const div = document.createElement('div');
        div.className = 'bg-slate-50 p-4 rounded-lg border border-slate-200 relative qualification-entry fade-in';

        const yearLabel = data.status === 'Ongoing' ? 'Expected Completion Year' : 'Completion Year';
        const yearPlaceholder = data.status === 'Ongoing' ? 'e.g. 2026' : 'e.g. 2024';

        div.innerHTML = `
            <div class="absolute top-2 right-2">
                <button type="button" onclick="this.closest('.qualification-entry').remove()" class="text-red-500 hover:text-red-700 text-sm font-semibold">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
            <h3 class="font-bold text-lg text-slate-700 mb-3 section-header">Higher Qualification ${count + 1}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                    <label class="text-sm font-semibold text-slate-600">College / University Name</label>
                    <input type="text" value="${data.university || ''}" class="q-university form-input w-full p-2 rounded border border-slate-300 focus:border-green-500 outline-none" placeholder="e.g. IIT Bombay" required>
                </div>
                <div>
                    <label class="text-sm font-semibold text-slate-600">Degree</label>
                    <input type="text" value="${data.degree || ''}" class="q-degree form-input w-full p-2 rounded border border-slate-300 focus:border-green-500 outline-none" placeholder="e.g. B.Tech" required>
                </div>
                <div>
                    <label class="text-sm font-semibold text-slate-600">Status</label>
                    <select class="q-status form-input w-full p-2 rounded border border-slate-300 focus:border-green-500 outline-none" onchange="UIManager.updateYearLabel(this)">
                        <option value="Completed" ${data.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Ongoing" ${data.status === 'Ongoing' ? 'selected' : ''}>Ongoing</option>
                    </select>
                </div>
                <div>
                    <label class="q-year-label text-sm font-semibold text-slate-600">${yearLabel}</label>
                    <input type="text" value="${data.year || ''}" class="q-year form-input w-full p-2 rounded border border-slate-300 focus:border-green-500 outline-none" placeholder="${yearPlaceholder}" oninput="UIManager.validateNumberInput(this)" maxlength="4" required>
                </div>
                <div>
                    <label class="text-sm font-semibold text-slate-600">CGPA/%</label>
                    <input type="text" value="${data.score || ''}" class="q-score form-input w-full p-2 rounded border border-slate-300 focus:border-green-500 outline-none" placeholder="9.5 / 85" oninput="UIManager.validateDecimalInput(this)" required>
                </div>
            </div>
        `;
        container.appendChild(div);
    },

    updateYearLabel(selectElement) {
        const container = selectElement.closest('.grid');
        const label = container.querySelector('.q-year-label');
        const yearInput = container.querySelector('.q-year');

        if (selectElement.value === 'Ongoing') {
            label.innerText = 'Expected Completion Year';
            yearInput.placeholder = 'e.g. 2026';
        } else {
            label.innerText = 'Completion Year';
            yearInput.placeholder = 'e.g. 2024';
        }
    },

    /* --- Standard Form Logic --- */

    populateInputs(state) {
        document.querySelectorAll('input:not(.q-university):not(.q-degree):not(.q-year):not(.q-score):not(.q-status), textarea').forEach(input => {
            if (state[input.name]) input.value = state[input.name];
        });

        this.renderQualifications(state.qualifications);
    },

    getFormData(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};

        if (formId === 'form-education') {
            const staticData = {};
            const staticInputs = form.querySelectorAll('input:not(.q-university):not(.q-degree):not(.q-year):not(.q-score):not(.q-status)');
            staticInputs.forEach(input => staticData[input.name] = input.value);

            const qualifications = [];
            const entries = form.querySelectorAll('.qualification-entry');
            entries.forEach(entry => {
                qualifications.push({
                    university: entry.querySelector('.q-university').value,
                    degree: entry.querySelector('.q-degree').value,
                    status: entry.querySelector('.q-status').value,
                    year: entry.querySelector('.q-year').value,
                    score: entry.querySelector('.q-score').value
                });
            });

            return { ...staticData, qualifications };
        }

        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    },

    /* --- View Switching --- */

    showView(index) {
        this.views.forEach(id => {
            const el = document.getElementById(id);
            el.classList.add('hidden');
            el.classList.remove('fade-in');
        });

        const active = document.getElementById(this.views[index]);
        active.classList.remove('hidden');
        void active.offsetWidth;
        active.classList.add('fade-in');

        this.updateHeader(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    updateHeader(index) {
        if (index === 0) {
            this.elements.header.classList.add('hidden');
        } else {
            this.elements.header.classList.remove('hidden');
            const totalSteps = this.views.length - 2;
            let currentStep = index;
            if (index === this.views.length - 1) currentStep = totalSteps + 1;

            let pct = Math.floor((index / (this.views.length - 1)) * 100);
            if (pct > 100) pct = 100;

            this.elements.progressBar.style.width = `${pct}%`;
            this.elements.stepText.innerText = index === this.views.length - 1 ? 'Preview' : `Step ${index} of ${this.views.length - 2}`;
        }
    },

    categoryIcons: {
        'Professional': 'fa-briefcase',
        'Modern': 'fa-rocket',
        'Minimal': 'fa-feather',
        'Creative': 'fa-paint-brush'
    },
    currentCategory: 'Professional',

    /* --- Template Picker & Preview --- */

    toggleCategoryMenu(e) {
        if (e) e.stopPropagation();
        const menu = document.getElementById('mobile-category-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    },

    closeCategoryMenu() {
        const menu = document.getElementById('mobile-category-menu');
        if (menu) {
            menu.classList.add('hidden');
        }
    },

    selectCategory(categoryName) {
        this.currentCategory = categoryName;
        this.closeCategoryMenu();

        // Check if current template is in this category
        const currentTpl = getTemplate(App.state.selectedTemplate);
        if (currentTpl.category !== categoryName) {
            const firstInCat = Templates.find(t => t.category === categoryName);
            if (firstInCat) {
                App.selectTemplate(firstInCat.id);
                return;
            }
        }

        this.renderMobileCategoryMenu(categoryName);
        this.renderMobileSwipeCards(App.state.selectedTemplate, categoryName);
        this.updateSelectedCategoryInfo(categoryName);
    },

    renderTemplatePicker(selectedId) {
        const active = getTemplate(selectedId);
        if (active && active.category) {
            this.currentCategory = active.category;
        }
        const index = Templates.findIndex(t => t.id === selectedId);

        this.renderDesktopTemplatePicker(selectedId);
        this.renderMobileCategoryMenu(this.currentCategory);
        this.renderMobileSwipeCards(selectedId, this.currentCategory);
        this.updateSelectedCategoryInfo(this.currentCategory);
        this.updateTemplateCaption(active.name, index);
    },

    renderDesktopTemplatePicker(selectedId) {
        const picker = this.elements.templatePicker || document.getElementById('template-picker');
        if (!picker) return;

        const thumb = {
            executive: 'band', creative: 'band',
            corporate: 'center', elegant: 'center',
            compact: 'solid', simple: 'solid',
            tech: 'line', colorful: 'line',
            bold: 'bar', snapshot: 'split'
        };

        const card = (t) => `
            <button type="button" data-template="${t.id}" onclick="App.selectTemplate('${t.id}')"
                    class="tpl-card tpl-card-row ${t.id === selectedId ? 'selected' : ''}">
                <div class="tpl-thumb ${thumb[t.id] || t.id}"></div>
                <div class="text-left min-w-0">
                    <div class="tpl-name">${t.name}</div>
                    <div class="tpl-desc">${t.desc}</div>
                </div>
            </button>`;

        picker.innerHTML = CATEGORIES.map(cat => {
            const list = Templates.filter(t => t.category === cat);
            if (!list.length) return '';
            return `
                <div>
                    <h4 class="tpl-cat-heading">
                        ${cat}
                        <span class="tpl-cat-tag">${list.length}</span>
                    </h4>
                    <div class="space-y-2.5">${list.map(card).join('')}</div>
                </div>`;
        }).join('');
    },

    renderMobileCategoryMenu(activeCategory) {
        const container = document.getElementById('mobile-category-menu-items');
        if (!container) return;

        container.innerHTML = CATEGORIES.map(cat => {
            const isActive = cat === activeCategory;
            const icon = this.categoryIcons[cat] || 'fa-folder';
            const count = Templates.filter(t => t.category === cat).length;
            return `
                <button type="button" onclick="UIManager.selectCategory('${cat}')"
                        class="cat-menu-item w-full text-left px-3.5 py-2.5 text-sm font-medium transition flex items-center justify-between ${isActive ? 'bg-green-50 text-green-700 font-bold' : 'text-slate-700 hover:bg-slate-50'}">
                    <span class="flex items-center">
                        <i class="fas ${icon} mr-2.5 ${isActive ? 'text-green-600' : 'text-slate-400'} w-4 text-center"></i>
                        ${cat}
                    </span>
                    <div class="flex items-center gap-2">
                        <span class="text-xs ${isActive ? 'bg-green-100 text-green-800 font-bold' : 'bg-slate-100 text-slate-600'} px-2 py-0.5 rounded-full">${count}</span>
                        ${isActive ? '<i class="fas fa-check text-green-600 text-xs"></i>' : ''}
                    </div>
                </button>
            `;
        }).join('');
    },

    renderMobileSwipeCards(selectedId, category) {
        const container = document.getElementById('mobile-swipe-cards');
        if (!container) return;

        const thumb = {
            executive: 'band', creative: 'band',
            corporate: 'center', elegant: 'center',
            compact: 'solid', simple: 'solid',
            tech: 'line', colorful: 'line',
            bold: 'bar', snapshot: 'split'
        };

        const list = Templates.filter(t => t.category === category);
        const countEl = document.getElementById('mobile-swipe-count');
        if (countEl) {
            countEl.innerText = `${list.length} template${list.length > 1 ? 's' : ''}`;
        }

        container.innerHTML = list.map(t => {
            const isSelected = t.id === selectedId;
            return `
                <div data-template="${t.id}" onclick="App.selectTemplate('${t.id}')"
                     class="tpl-swipe-card ${t.id} ${isSelected ? 'selected' : ''}">
                    ${isSelected ? '<span class="tpl-swipe-selected-tag"><i class="fas fa-check"></i> Active</span>' : ''}
                    <div class="tpl-thumb ${thumb[t.id] || t.id}"></div>
                    <div class="tpl-swipe-card-body">
                        <div class="tpl-name">${t.name}</div>
                        <div class="tpl-desc">${t.desc}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Smooth scroll to selected card
        setTimeout(() => {
            const selectedCard = container.querySelector(`.tpl-swipe-card[data-template="${selectedId}"]`);
            if (selectedCard) {
                selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 60);
    },

    updateSelectedCategoryInfo(category) {
        const nameEl = document.getElementById('mobile-selected-cat-name');
        const countEl = document.getElementById('mobile-selected-cat-count');
        const count = Templates.filter(t => t.category === category).length;
        const icon = this.categoryIcons[category] || 'fa-folder';

        if (nameEl) {
            nameEl.innerHTML = `<i class="fas ${icon} mr-1 text-green-600 text-xs"></i>${category}`;
        }
        if (countEl) {
            countEl.innerText = `(${count} template${count > 1 ? 's' : ''})`;
        }
    },

    updateTemplateCaption(name, index) {
        const cap = document.getElementById('template-cap');
        if (cap) cap.innerHTML = `Template <span>·</span> <strong>${name}</strong> <span>·</span> ${index + 1}/${Templates.length}`;
    },

    renderPreview(state) {
        const tpl = getTemplate(state.selectedTemplate);
        this.elements.previewPaper.innerHTML = tpl.preview(state);
        this.elements.previewPaper.classList.remove('fade-in');
        void this.elements.previewPaper.offsetWidth;
        this.elements.previewPaper.classList.add('fade-in');
    },

    /* --- Toast --- */

    showToast(msg, type = 'error') {
        this.elements.toastMsg.innerText = msg;
        this.elements.toast.className = `fixed bottom-5 right-5 text-white px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300 flex items-center gap-3 z-50 ${type === 'success' ? 'bg-green-600' : 'bg-red-500'}`;
        requestAnimationFrame(() => {
            this.elements.toast.classList.remove('translate-y-20', 'opacity-0');
        });
        setTimeout(() => {
            this.elements.toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    },

    /* --- Validation --- */

    validateForm(formId) {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input, textarea');
        let valid = true;

        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput) {
            if (phoneInput.value.length !== 10) {
                phoneInput.classList.add('border-red-500');
                this.showToast('Phone number must be exactly 10 digits');
                return false;
            }
        }

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                valid = false;
                input.classList.add('border-red-500');
                input.addEventListener('input', () => input.classList.remove('border-red-500'), { once: true });
            }
        });
        return valid;
    }
};

// Global click listener to close mobile category dropdown when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobile-category-menu');
    const btn = document.getElementById('hamburger-cat-btn');
    if (menu && !menu.classList.contains('hidden')) {
        if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
            menu.classList.add('hidden');
        }
    }
});

// Escape key listener to close category menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        UIManager.closeCategoryMenu();
    }
});