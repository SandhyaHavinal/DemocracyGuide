// home.js
document.addEventListener('DOMContentLoaded', () => {
    // Default to Nov 3, 2026
    let electionDate = new Date('November 3, 2026 00:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');
    const dateInput = document.getElementById('electionDateInput');

    if (dateInput) {
        // Set initial value
        dateInput.value = '2026-11-03';
        
        dateInput.addEventListener('change', (e) => {
            if (e.target.value) {
                // Parse date at midnight local time
                const [year, month, day] = e.target.value.split('-');
                electionDate = new Date(year, month - 1, day).getTime();
                updateCountdown();
            }
        });
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = electionDate - now;

        if (distance < 0) {
            if (daysEl) daysEl.innerHTML = "00";
            if (hoursEl) hoursEl.innerHTML = "00";
            if (minsEl) minsEl.innerHTML = "00";
            if (secsEl) secsEl.innerHTML = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
        if (minsEl) minsEl.innerHTML = minutes.toString().padStart(2, '0');
        if (secsEl) secsEl.innerHTML = seconds.toString().padStart(2, '0');
    }

    if (daysEl) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
});
