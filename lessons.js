
function loadLessonsData() {
    if (!window.lessonsData) {
        window.lessonsData = [
            { name: "Matematika", date: "2025-02-18", day: "Dushanba", time: "9:00 - 10:30", status: "O'tkazilgan", link: "https://zoom.us/j/1234567890" },
            { name: "Fizika", date: "2025-02-20", day: "Chorshanba", time: "11:00 - 12:30", status: "Bekor qilindi", link: "#" },
            { name: "Ingliz Tili", date: "2025-02-22", day: "Juma", time: "14:00 - 15:30", status: "Rejalashtirilgan", link: "https://zoom.us/j/9876543210" },
            // Boshqa darslar qo'shish mumkin
        ];
    }

    const lessonsTableBody = document.getElementById('lessonsTableBody');
    lessonsTableBody.innerHTML = window.lessonsData.map(lesson => `
        <tr class="hover:bg-gray-50 transition-all">
            <td class="py-3 px-4">${lesson.name}</td>
            <td class="py-3 px-4">${new Date(lesson.date).toLocaleDateString()}</td>
            <td class="py-3 px-4">${lesson.day}</td>
            <td class="py-3 px-4">${lesson.time}</td>
            <td class="py-3 px-4">
                <span class="px-3 py-1 rounded-full text-sm font-semibold ${
                    lesson.status === 'O\'tkazilgan' ? 'bg-green-100 text-green-700' :
                    lesson.status === 'Bekor qilindi' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                }">
                    ${lesson.status}
                </span>
            </td>
            <td class="py-3 px-4">
                <a href="${lesson.link}" target="_blank" 
                   class="text-blue-600 hover:text-blue-700 hover:underline flex items-center">
                    <span class="mr-1">🔗</span>
                    Ulanish
                </a>
            </td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadLessonsData);