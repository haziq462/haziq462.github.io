document.addEventListener("DOMContentLoaded", () => {
    const roleTarget = document.getElementById("hero-role");

    if (!roleTarget) {
        return;
    }

    if (roleTarget.dataset.rotatorInitialized === "true") {
        return;
    }

    roleTarget.dataset.rotatorInitialized = "true";

    const roles = [
        "Software Analysis",
        "Production Support",
        "Workflow Automation",
        "AI Evaluation",
        "Technical Consulting",
        "Incident Response",
        "Data Remediation",
        "Prompt Engineering",
        "System Monitoring",
        "Technical Research"
    ];

    let currentIndex = 0;
    const typingDelayMs = 85;
    const deletingDelayMs = 45;
    const pauseAfterTypingMs = 1500;
    const pauseBeforeTypingMs = 250;
    let currentText = "";
    let isDeleting = false;

    const tick = () => {
        const activeRole = roles[currentIndex];

        if (isDeleting) {
            currentText = activeRole.slice(0, currentText.length - 1);
        } else {
            currentText = activeRole.slice(0, currentText.length + 1);
        }

        roleTarget.textContent = currentText;

        if (!isDeleting && currentText === activeRole) {
            isDeleting = true;
            window.setTimeout(tick, pauseAfterTypingMs);
            return;
        }

        if (isDeleting && currentText.length === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % roles.length;
            window.setTimeout(tick, pauseBeforeTypingMs);
            return;
        }

        window.setTimeout(tick, isDeleting ? deletingDelayMs : typingDelayMs);
    };

    roleTarget.textContent = "";
    tick();
});
