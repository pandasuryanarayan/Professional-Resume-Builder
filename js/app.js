/* ================================================================
   MODULE 4: PDFService
   Responsibility: Wrap jsPDF and delegate layout to the
   currently selected resume template.
   ================================================================ */
const PDFService = {
    generate(data) {
        if (!window.jspdf) {
            alert("PDF Library not loaded properly.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        const tpl = getTemplate(data.selectedTemplate || 'classic');
        tpl.draw(doc, data);

        PDFUtils.footer(doc);

        const filename = `${(data.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
        doc.save(filename);
    }
};

/* ================================================================
   MODULE 5: App (Controller)
   Responsibility: Application Logic, State Management, Init
   ================================================================ */
const App = {
    state: {
        fullName: '', email: '', phone: '', address: '', linkedin: '', github: '', languages: '', summary: '',
        qualifications: [],
        edu_12th_school: '', edu_12th_stream: '', edu_12th_year: '', edu_12th_score: '', edu_12th_board: '',
        edu_10th_school: '', edu_10th_board: '', edu_10th_year: '', edu_10th_score: '',
        workExperience: '', projects: '',
        skills: '', certifications: '', actHob: '',
        selectedTemplate: 'classic'
    },

    init() {
        const saved = StorageService.load();
        if (saved) {
            this.state = { ...this.state, ...saved };
            if (!Array.isArray(this.state.qualifications)) this.state.qualifications = [];
            if (!Templates.some(t => t.id === this.state.selectedTemplate)) this.state.selectedTemplate = 'classic';
            UIManager.populateInputs(this.state);
        } else {
            UIManager.addQualificationField();
        }
    },

    navigateTo(stepIndex) {
        if (stepIndex === UIManager.views.length - 1) {
            UIManager.renderTemplatePicker(this.state.selectedTemplate);
            UIManager.renderPreview(this.state);
        }
        UIManager.showView(stepIndex);
    },

    selectTemplate(templateId) {
        if (!Templates.some(t => t.id === templateId)) return;
        this.state.selectedTemplate = templateId;
        StorageService.save(this.state);
        UIManager.renderTemplatePicker(templateId);
        UIManager.renderPreview(this.state);
    },

    cycleTemplate(direction) {
        const idx = Templates.findIndex(t => t.id === this.state.selectedTemplate);
        const next = Templates[(idx + direction + Templates.length) % Templates.length];
        this.selectTemplate(next.id);
    },

    validateAndProceed(currentStepIndex, formId) {
        if (UIManager.validateForm(formId)) {
            const newData = UIManager.getFormData(formId);
            this.updateState(newData);
            this.navigateTo(currentStepIndex + 1);
        } else {
            UIManager.showToast('Please fill out all required fields.');
        }
    },

    updateState(newData) {
        this.state = { ...this.state, ...newData };
        StorageService.save(this.state);
    },

    download() {
        try {
            PDFService.generate(this.state);
            UIManager.showToast('Resume downloaded!', 'success');
        } catch (e) {
            console.error(e);
            UIManager.showToast('Error generating PDF.');
        }
    },

    reset() {
        if (confirm('Clear all data and start over?')) {
            StorageService.clear();
            location.reload();
        }
    }
};

window.addEventListener('load', () => App.init());