class Stepper {
        constructor(config) {
            this.container = document.getElementById(config.containerId);
            this.steps = config.steps || ['Step 1', 'Step 2', 'Step 3'];
            this.currentStep = config.initialStep || 1;
            this.onStepChange = config.onStepChange || function() {};
            this.render(); 
        }

        render() {
            const totalSteps = this.steps.length;
            
            let linesHTML = `<div class="absolute top-[36px] left-[50px] right-[50px] flex justify-between z-0">`;
            for (let i = 1; i < totalSteps; i++) {
                const fillWidth = (this.currentStep > i) ? '100%' : '0%';
                linesHTML += `
                <div class="h-1 flex-1 bg-gray-300 rounded-sm relative ${i < totalSteps - 1 ? 'mr-1' : ''}">
                    <div class="h-full bg-primary rounded-sm transition-all duration-300" style="width: ${fillWidth};"></div>
                </div>`;
            }
            linesHTML += `</div>`;

            let stepsHTML = '';
            this.steps.forEach((stepName, index) => {
                const stepNum = index + 1;
                let statusClass = '';
                let circleContent = stepNum;
                let textDisplay = stepName;

                if (stepNum < this.currentStep) {
                    statusClass = 'completed';
                    circleContent = '✓';
                } else if (stepNum === this.currentStep) {
                    statusClass = 'active';
                    if(stepNum > 1 && stepNum < totalSteps) textDisplay = "Current\nStep"; 
                    if(stepNum === totalSteps) { 
                        statusClass = 'completed';
                        circleContent = '✓';
                    }
                }

                stepsHTML += `
                <div class="step-item ${statusClass} flex flex-col items-center z-10 w-[60px]">
                    <div class="step-circle w-8 h-8 rounded-full bg-stepInactive text-white flex justify-center items-center font-medium text-sm mb-1">${circleContent}</div>
                    <div class="step-text text-xs text-stepInactive text-center leading-tight whitespace-pre-line">${textDisplay}</div>
                </div>`;
            });

            this.container.innerHTML = `
                <div class="bg-stepBg px-8 py-5 flex justify-between items-center relative w-full">
                    ${linesHTML}
                    ${stepsHTML}
                </div>
            `;
        }

        next() {
            if (this.currentStep < this.steps.length) {
                this.currentStep++;
                this.render();
                this.onStepChange(this.currentStep); 
            }
        }

        prev() {
            if (this.currentStep > 1) {
                this.currentStep--;
                this.render();
                this.onStepChange(this.currentStep); 
            }
        }
    }
