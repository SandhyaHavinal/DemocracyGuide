// timeline.js
function getElectionSteps() {
    return [
        {
            id: "eligibility", title: t('step_1_title') || "Eligibility & Registration",
            description: t('step_1_desc') || "The first step is ensuring you are eligible and registered to vote. Rules vary by region, but generally require you to be a citizen and of voting age.",
            cards: [
                { icon: "bx-check-shield", title: t('step_1_c1_t') || "Check Eligibility", desc: t('step_1_c1_d') || "Verify age, citizenship, and residency requirements." },
                { icon: "bx-id-card", title: t('step_1_c2_t') || "Register", desc: t('step_1_c2_d') || "Complete voter registration online, by mail, or in person." },
                { icon: "bx-calendar-exclamation", title: t('step_1_c3_t') || "Deadlines", desc: t('step_1_c3_d') || "Pay attention to registration deadlines which are often weeks before the election." }
            ],
            botMessage: t('step_1_bot') || "Have you registered to vote yet? The deadline is approaching! Let me know if you need help finding where to register."
        },
        {
            id: "research", title: t('step_2_title') || "Research Candidates & Issues",
            description: t('step_2_desc') || "An informed voter is a powerful voter. Take time to understand the people running and the ballot measures you'll be voting on.",
            cards: [
                { icon: "bx-search-alt-2", title: t('step_2_c1_t') || "Find Candidates", desc: t('step_2_c1_d') || "Look up who is on your local and national ballot." },
                { icon: "bx-news", title: t('step_2_c2_t') || "Compare Platforms", desc: t('step_2_c2_d') || "Read non-partisan guides and candidate websites." },
                { icon: "bx-spreadsheet", title: t('step_2_c3_t') || "Ballot Measures", desc: t('step_2_c3_d') || "Understand local propositions and referendums." }
            ],
            botMessage: t('step_2_bot') || "It's always good to research candidates from multiple non-partisan sources. Want some tips on where to look?"
        },
        {
            id: "voting-plan", title: t('step_3_title') || "Make a Voting Plan",
            description: t('step_3_desc') || "Decide exactly how, when, and where you will vote. Preparing in advance makes the process smooth and stress-free.",
            cards: [
                { icon: "bx-map-pin", title: t('step_3_c1_t') || "Find Polling Place", desc: t('step_3_c1_d') || "Locate your assigned voting location and its hours." },
                { icon: "bx-envelope", title: t('step_3_c2_t') || "Mail-in / Early", desc: t('step_3_c2_d') || "Request an absentee ballot or find early voting dates." },
                { icon: "bx-bus", title: t('step_3_c3_t') || "Logistics", desc: t('step_3_c3_d') || "Plan your ride and ensure you have necessary ID." }
            ],
            botMessage: t('step_3_bot') || "Do you plan to vote early, by mail, or on Election Day? Making a plan increases the chance you'll actually vote!"
        },
        {
            id: "vote", title: t('step_4_title') || "Cast Your Vote",
            description: t('step_4_desc') || "The big day! Follow your plan and make your voice heard at the ballot box.",
            cards: [
                { icon: "bx-time-five", title: t('step_4_c1_t') || "Timing", desc: t('step_4_c1_d') || "Try to go during off-peak hours to avoid long lines." },
                { icon: "bx-badge-check", title: t('step_4_c2_t') || "Your Rights", desc: t('step_4_c2_d') || "If you're in line when polls close, stay in line!" },
                { icon: "bx-check-double", title: t('step_4_c3_t') || "Verify", desc: t('step_4_c3_d') || "Review your ballot carefully before submitting it." }
            ],
            botMessage: t('step_4_bot') || "Remember, if you encounter any issues at the polls, you have the right to request a provisional ballot."
        },
        {
            id: "results", title: t('step_5_title') || "Results & Certification",
            description: t('step_5_desc') || "After polls close, votes are tallied, verified, and officially certified.",
            cards: [
                { icon: "bx-bar-chart-alt-2", title: t('step_5_c1_t') || "Counting", desc: t('step_5_c1_d') || "Election officials carefully count all valid ballots." },
                { icon: "bx-certification", title: t('step_5_c2_t') || "Certification", desc: t('step_5_c2_d') || "Results are audited and officially certified by authorities." },
                { icon: "bx-group", title: t('step_5_c3_t') || "Inauguration", desc: t('step_5_c3_d') || "The elected officials are sworn into office." }
            ],
            botMessage: t('step_5_bot') || "Counting takes time, especially with mail-in ballots. Official results may take days to finalize."
        }
    ];
}

let currentStepIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const timelineNav = document.getElementById('timelineNav');
    let stepContent = document.getElementById('stepContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const chatBody = document.getElementById('chatBody');

    if (!timelineNav) return;

    function renderTimeline() {
        timelineNav.innerHTML = '';
        const progress = document.createElement('div');
        progress.className = 'timeline-progress';
        progress.id = 'timelineProgress';
        timelineNav.appendChild(progress);

        const currentSteps = getElectionSteps();
        currentSteps.forEach((step, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-step';
            item.dataset.index = index;
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Step ${index + 1}: ${step.title}`);
            item.innerHTML = `
                <div class="step-circle">${index + 1}</div>
                <div class="step-label">${step.title.split(' ')[0]}</div>
            `;
            item.addEventListener('click', () => {
                currentStepIndex = index;
                updateStep();
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentStepIndex = index;
                    updateStep();
                }
            });
            timelineNav.appendChild(item);
        });
    }

    function updateStep() {
        const steps = document.querySelectorAll('.timeline-step');
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index < currentStepIndex) step.classList.add('completed');
            else if (index === currentStepIndex) step.classList.add('active');
        });

        const currentSteps = getElectionSteps();
        const progress = document.getElementById('timelineProgress');
        if(progress) progress.style.width = `${(currentStepIndex / (currentSteps.length - 1)) * 100}%`;

        const stepData = currentSteps[currentStepIndex];
        const newContent = stepContent.cloneNode(false);
        
        let cardsHtml = '';
        stepData.cards.forEach(card => {
            cardsHtml += `
                <div class="detail-card">
                    <i class='bx ${card.icon}'></i>
                    <h3>${card.title}</h3>
                    <p>${card.desc}</p>
                </div>
            `;
        });

        newContent.innerHTML = `
            <h2>${stepData.title}</h2>
            <p>${stepData.description}</p>
            <div class="step-details">${cardsHtml}</div>
        `;
        
        stepContent.parentNode.replaceChild(newContent, stepContent);
        stepContent = newContent;

        prevBtn.disabled = currentStepIndex === 0;
        if (currentStepIndex === currentSteps.length - 1) {
            nextBtn.innerHTML = t('btn_finish') + " <i class='bx bx-check'></i>";
            nextBtn.classList.replace('btn-primary', 'btn-secondary');
            nextBtn.style.borderColor = 'var(--secondary-accent)';
            nextBtn.style.color = 'var(--secondary-accent)';
        } else {
            nextBtn.innerHTML = t('btn_next') + " <i class='bx bx-right-arrow-alt'></i>";
            nextBtn.classList.replace('btn-secondary', 'btn-primary');
            nextBtn.style.borderColor = 'transparent';
            nextBtn.style.color = 'white';
        }

        if (chatBody) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot';
            msgDiv.innerHTML = `<p>${stepData.botMessage}</p>`;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentStepIndex > 0) { currentStepIndex--; updateStep(); }
    });

    nextBtn.addEventListener('click', () => {
        const currentSteps = getElectionSteps();
        if (currentStepIndex < currentSteps.length - 1) {
            currentStepIndex++; updateStep();
        } else {
            alert("You've completed the guide! Head over to Resources for more.");
        }
    });

    renderTimeline();
    updateStep();
    
    // Expose a function to re-render when language changes
    window.reRenderTimeline = () => {
        renderTimeline();
        updateStep();
    };
});
