// stats.js

// Darslarni generatsiya qilish funksiyasi
function generateLessons(courseName) {
    const lessons = [];
    for (let i = 1; i <= 20; i++) {
        const attended = Math.random() > 0.3; // 70% qatnashgan, 30% qatnashmagan
        const grade = attended ? (Math.floor(Math.random() * 41) + 60) : 0; // 60-100 oralig‘ida baho
        const date = new Date();
        date.setDate(date.getDate() - (i * 2)); // Har dars 2 kun oraliq bilan bo‘lgan
        lessons.push({
            name: `${courseName} ${i}-dars`,
            attended: attended,
            grade: grade,
            date: date.toISOString().split("T")[0] // YYYY-MM-DD formatida
        });
    }
    return lessons;
}

// Statistikalarni yuklash funksiyasi
function loadStatsData() {
    const summaryContainer = document.getElementById("courseSummary");
    const detailsContainer = document.getElementById("detailedStats");

    if (!summaryContainer || !detailsContainer) {
        console.error("Statistika konteyneri topilmadi!");
        return;
    }

    summaryContainer.innerHTML = "";
    detailsContainer.innerHTML = "";

    const courses = [
        { name: "Matematika", lessons: generateLessons("Matematika") },
        { name: "Fizika", lessons: generateLessons("Fizika") },
        { name: "Dasturlash", lessons: generateLessons("Dasturlash") }
    ];

    courses.forEach((course, index) => {
        let totalGrades = 0, attendedCount = 0, totalLessons = course.lessons.length;

        course.lessons.forEach(lesson => {
            if (lesson.attended) attendedCount++;
            totalGrades += lesson.grade;
        });

        const attendancePercent = totalLessons > 0 ? ((attendedCount / totalLessons) * 100).toFixed(2) : "0";
        const averageGrade = totalLessons > 0 ? (totalGrades / totalLessons).toFixed(2) : "0";
        const overallPerformance = totalLessons > 0 ? ((parseFloat(attendancePercent) + parseFloat(averageGrade)) / 2).toFixed(2) : "0";

        // Kurslar bo‘yicha umumiy statistikani ko‘rsatuvchi kartani yaratish
        const summaryCard = document.createElement("div");
        summaryCard.classList.add(
            "bg-white", "p-6", "rounded-xl", "shadow-lg",
            "hover:shadow-xl", "transition-shadow", "duration-300",
            "border", "border-gray-100"
        );
        summaryCard.innerHTML = `
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-blue-600 text-lg">📘</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800">${course.name}</h3>
            </div>
            
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Qatnashish:</span>
                    <span class="font-semibold ${attendancePercent >= 80 ? 'text-green-600' : 'text-orange-600'}">
                        ${attendancePercent}%
                    </span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full ${attendancePercent >= 80 ? 'bg-green-500' : 'bg-orange-500'} rounded-full transition-all duration-500" 
                         style="width: ${attendancePercent}%"></div>
                </div>

                <div class="flex justify-between items-center pt-2">
                    <span class="text-gray-600">O'rtacha baho:</span>
                    <div class="flex items-center">
                        <span class="font-bold text-blue-600 mr-2">${averageGrade}</span>
                        <span class="text-sm text-gray-400">/ 100</span>
                    </div>
                </div>

                <div class="pt-3 border-t border-gray-100">
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-500">Umumiy ko'rsatkich:</span>
                        <span class="font-medium ${overallPerformance >= 70 ? 'text-purple-600' : 'text-red-600'}">
                            ${overallPerformance}%
                        </span>
                    </div>
                </div>
            </div>
        `;
        summaryContainer.appendChild(summaryCard);

        // Batafsil statistikani drop-down (accordion) shaklida yaratish
        const courseDetail = document.createElement("div");
        courseDetail.classList.add("bg-white", "rounded-xl", "shadow-lg", "border", "border-gray-100");
        courseDetail.innerHTML = `
            <button onclick="toggleAccordion(${index})" 
                    class="w-full text-left px-6 py-4 flex justify-between items-center 
                           hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded="false">
                <div class="flex items-center">
                    <span class="text-purple-600 mr-3 text-lg">📊</span>
                    <h3 class="text-lg font-semibold text-gray-800">${course.name} statistikasi</h3>
                </div>
                <span id="arrow-${index}" class="text-gray-500 transform transition-transform duration-300">▼</span>
            </button>
            
            <div id="accordion-${index}" class="hidden overflow-hidden transition-all duration-300">
                <div class="px-6 py-4 border-t border-gray-100">
                    <div class="mb-6">
                        <div class="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Umumiy qatnashish darajasi</span>
                            <span>${attendancePercent}%</span>
                        </div>
                        <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-green-500 rounded-full transition-all duration-500" 
                                 style="width: ${attendancePercent}%"></div>
                        </div>
                    </div>

                    <div class="overflow-x-auto rounded-lg border border-gray-200">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Dars Nomi</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sana</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Holati</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Baho</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                ${course.lessons.map((lesson, i) => `
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td class="px-4 py-3 text-sm text-gray-600">${i + 1}</td>
                                    <td class="px-4 py-3 text-sm text-gray-800 font-medium">${lesson.name}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${lesson.date}</td>
                                    <td class="px-4 py-3">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lesson.attended ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                            ${lesson.attended ? 'Qatnashgan' : 'Qatnashmagan'}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-sm ${lesson.attended ? 'text-blue-600 font-semibold' : 'text-gray-400'}">
                                        ${lesson.grade}
                                    </td>
                                </tr>`).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        detailsContainer.appendChild(courseDetail);
    });
}

// Accordion (drop-down) funksiyasi
function toggleAccordion(index) {
    const accordion = document.getElementById(`accordion-${index}`);
    const arrow = document.getElementById(`arrow-${index}`);
    const button = accordion.previousElementSibling;

    if (accordion.classList.contains("hidden")) {
        accordion.classList.remove("hidden");
        arrow.style.transform = "rotate(180deg)";
        button.setAttribute("aria-expanded", "true");
    } else {
        accordion.classList.add("hidden");
        arrow.style.transform = "rotate(0deg)";
        button.setAttribute("aria-expanded", "false");
    }
}

// Statistikalarni yuklash DOMContentLoaded da
document.addEventListener('DOMContentLoaded', loadStatsData);
