// Stats Section
function loadStatsData() {
    if (!window.statsData) {
        window.statsData = [
            { lesson: "Matematika", attendance: "O'tkazilgan" },
            { lesson: "Fizika", attendance: "Bekor qilindi" }
        ];
    }

    const statsTable = document.getElementById('statsTable').getElementsByTagName('tbody')[0];

    // Clear previous data
    statsTable.innerHTML = '';  // Clears previous rows to avoid duplication

    window.statsData.forEach(stat => {
        const row = statsTable.insertRow();
        const lessonCell = row.insertCell(0);
        const attendanceCell = row.insertCell(1);

        lessonCell.textContent = stat.lesson;
        attendanceCell.textContent = stat.attendance;
        attendanceCell.classList.add(stat.attendance === 'O\'tkazilgan' ? 'text-green-800' : 'text-red-600');
    });
}

// DOMContentLoaded event to load stats data when section is shown
document.addEventListener('DOMContentLoaded', function () {
    loadStatsData(); // Stats data yuklashni boshlash
});
