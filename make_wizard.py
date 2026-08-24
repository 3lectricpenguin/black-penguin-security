import re

with open('application.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Instead of complex regex, let's just insert the step divs manually at known string points.
# We know the H3 tags and other delimiters.
replacements = [
    ('<!-- Section 1: Application Information -->', '<div class="wizard-step active" id="step-1">\n            <!-- Section 1: Application Information -->'),
    ('<!-- Section 2: Defendant Information -->', '</div>\n            <div class="wizard-step" id="step-2" style="display:none;">\n            <!-- Section 2: Defendant Information -->'),
    ('<!-- Section 3: Occupation & Family Info -->', '</div>\n            <div class="wizard-step" id="step-3" style="display:none;">\n            <!-- Section 3: Occupation & Family Info -->'),
    ('<!-- Section 4: Auto & Legal/Criminal History -->', '</div>\n            <div class="wizard-step" id="step-4" style="display:none;">\n            <!-- Section 4: Auto & Legal/Criminal History -->'),
    ('<!-- Relatives / Friends -->', '</div>\n            <div class="wizard-step" id="step-5" style="display:none;">\n            <!-- Relatives / Friends -->'),
    ('<!-- Hold Harmless (Collateral) -->', '</div>\n            <div class="wizard-step" id="step-6" style="display:none;">\n            <!-- Hold Harmless (Collateral) -->'),
    ('<div style="text-align: center;"><div style="text-align: center;">\n              <button type="submit"', 
     '</div>\n            <div class="wizard-controls" style="display:flex; justify-content:space-between; margin-top:30px;">\n                <button type="button" id="prevBtn" class="btn btn-secondary" style="display:none;">Previous</button>\n                <button type="button" id="nextBtn" class="btn btn-primary">Next</button>\n            </div>\n            <div style="text-align: center; margin-top:20px;">\n              <button type="submit" id="submitBtn" style="display:none;"')
]

for old, new in replacements:
    content = content.replace(old, new)

# Add progress bar after <input type="hidden" name="_captcha" value="false">
progress_bar = '''
            <!-- Wizard Progress -->
            <div class="wizard-progress" style="margin-bottom:30px; background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
                <div id="wizard-progress-bar" style="width: 16.66%; background:var(--color-yellow-500); height:100%; transition:width 0.3s ease;"></div>
            </div>
'''
content = content.replace('<input type="hidden" name="_captcha" value="false">', '<input type="hidden" name="_captcha" value="false">\n' + progress_bar)

# Include script at the end
script = '''
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const steps = document.querySelectorAll(".wizard-step");
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");
        const submitBtn = document.getElementById("submitBtn");
        const progressBar = document.getElementById("wizard-progress-bar");
        let currentStep = 0;

        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.style.display = index === stepIndex ? "block" : "none";
            });
            
            prevBtn.style.display = stepIndex === 0 ? "none" : "inline-block";
            
            if (stepIndex === steps.length - 1) {
                nextBtn.style.display = "none";
                submitBtn.style.display = "inline-block";
            } else {
                nextBtn.style.display = "inline-block";
                submitBtn.style.display = "none";
            }
            
            progressBar.style.width = ((stepIndex + 1) / steps.length * 100) + "%";
            window.scrollTo(0, document.querySelector(".digital-application-form").offsetTop - 100);
        }

        nextBtn.addEventListener("click", () => {
            if (currentStep < steps.length - 1) {
                // Here we could add validation before proceeding
                currentStep++;
                showStep(currentStep);
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });
</script>
'''

content = content.replace('</body>', script + '\n</body>')

with open('application.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modified application.html successfully")
