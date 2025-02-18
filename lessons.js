const lessonsData = [
  { 
      id: 1, 
      name: "Matematika", 
      date: "2025-02-18", 
      day: "Dushanba", 
      time: "9:00 - 10:30", 
      status: "O'tkazilgan", 
      link: "https://zoom.us/j/1234567890", 
      instructor: "Ali", 
      type: "Lecture", 
      platform: "Zoom",
      attendance: { status: null, reason: '' }
  },
  {
    id:2,
    name: "Fizika",
    date: "2025-02-20",
    day: "Chorshanba",
    time: "11:00 - 12:30",
    status: "Bekor qilindi",
    link: "#",
    instructor: "Ali",
    type: "Lecture",
    platform: "Zoom",
    attendance: { status: null, reason: '' }
  },
  {
    id:3,
    name: "Ingliz Tili",
    date: "2025-02-22",
    day: "Juma",
    time: "14:00 - 15:30",
    status: "Rejalashtirilgan",
    link: "https://zoom.us/j/9876543210",
    instructor: "Ali",
    type: "Lecture",
    platform: "Zoom",
    attendance: { status: null, reason: '' }
  }
];

function createLessonRow(lesson) {
  return `
      <tr>
          <td class="py-3 px-4">${lesson.name}</td>
          <td class="py-3 px-4">${new Date(lesson.date).toLocaleDateString()}</td>
          <td class="py-3 px-4">${lesson.day}</td>
          <td class="py-3 px-4">${lesson.time}</td>
          <td class="py-3 px-4">
              <span class="${getStatusClass(lesson.status)}">${lesson.status}</span>
          </td>
          <td class="py-3 px-4">
              ${lesson.link !== "#" ? `<a href="${lesson.link}" target="_blank" class="text-blue-600 hover:text-blue-700 hover:underline">🔗 Ulanish</a>` : `<span class="text-gray-400">Mavjud emas</span>`}
          </td>
          <td class="py-3 px-4">
              <button onclick="addToCalendar({title: '${lesson.name}', start: '${lesson.date} ${lesson.time.split('-')[0]}', end: '${lesson.date} ${lesson.time.split('-')[1]}', url: '${lesson.link}', platform: '${lesson.platform}'})" class="text-green-600 hover:text-green-700">📅</button>
              <button onclick="setNotification({title: '${lesson.name}', date: '${lesson.date}', time: '${lesson.time}'})" class="text-yellow-600 hover:text-yellow-700">🔔</button>
              <button id="attendance-${lesson.id}" onclick="setAttendance(${lesson.id}, ${lesson.attendance.status !== 'attending'})" class="text-gray-600 hover:text-gray-700">${lesson.attendance.status === 'attending' ? 'Qatnashaman' : lesson.attendance.status === 'notAttending' ? 'Qatnashmayman' : 'Qatnashish'}</button>
          </td>
      </tr>
  `;
}

function getStatusClass(status) {
  switch (status) {
      case "O'tkazilgan": return "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700";
      case "Bekor qilindi": return "px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700";
      default: return "px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";
  }
}

function loadLessonsData() {
  const lessonsTableBody = document.getElementById('lessonsTableBody');
  if (lessonsTableBody) {
      lessonsTableBody.innerHTML = lessonsData.map(createLessonRow).join('');
  } else {
      console.error('Element with id "lessonsTableBody" not found');
  }
}

// This is crucial to ensure the DOM is ready before we try to manipulate it
document.addEventListener('DOMContentLoaded', loadLessonsData);