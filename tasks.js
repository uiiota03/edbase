// Vazifalar ma'lumotlari
function loadTasksData() {
    if (!window.tasksData) {
        window.tasksData = {
            "Matematika": Array.from({ length: 20 }, (_, i) => ({
                lesson: `Matematika Darsi ${i + 1}`,
                tasks: [
                    {
                        task: `Uy vazifasi ${i + 1}`,
                        deadline: `2025-02-${String(i + 1).padStart(2, '0')}`,
                        status: 'pending',
                        grade: null,
                        teacherComment: '',
                        attachments: []
                    },
                    {
                        task: `Masalalar to'plami ${i + 1}`,
                        deadline: `2025-02-${String(i + 2).padStart(2, '0')}`,
                        status: 'pending',
                        grade: null,
                        teacherComment: '',
                        attachments: []
                    }
                ]
            })),
            "Fizika": Array.from({ length: 20 }, (_, i) => ({
                lesson: `Fizika Darsi ${i + 1}`,
                tasks: [
                    {
                        task: `Eksperiment ${i + 1}`,
                        deadline: `2025-03-${String(i + 1).padStart(2, '0')}`,
                        status: 'pending',
                        grade: null,
                        teacherComment: '',
                        attachments: []
                    },
                    {
                        task: `Teoriya ${i + 1}`,
                        deadline: `2025-03-${String(i + 2).padStart(2, '0')}`,
                        status: 'pending',
                        grade: null,
                        teacherComment: '',
                        attachments: []
                    }
                ]
            })),
            "Ingliz Tili": Array.from({ length: 20 }, (_, i) => ({
                lesson: `Ingliz Tili Darsi ${i + 1}`,
                tasks: [
                    {
                        task: `Essay ${i + 1}`,
                        deadline: `2025-04-${String(i + 1).padStart(2, '0')}`,
                        status: 'pending',
                        grade: null,
                        teacherComment: '',
                        attachments: []
                    },
                    {
                        task: `Grammatika ${i + 1}`,
                        deadline: `2025-04-${String(i + 2).padStart(2, '0')}`,
                        status: 'pending',
                        grade: null,
                        teacherComment: '',
                        attachments: []
                    }
                ]
            }))
        };
    }

    const subjectSelect = document.getElementById('subjectSelect');
    const lessonSelect = document.getElementById('lessonSelect');
    const tasksDiv = document.getElementById('tasks');
    const searchInput = document.getElementById('searchTask');
    let tasksStatus = JSON.parse(localStorage.getItem('tasksStatus')) || {};

    // Darslarni yuklash
    function loadLessons(subject) {
        lessonSelect.innerHTML = '<option value="">Dars tanlang</option>';
        if (subject && window.tasksData[subject]) {
            window.tasksData[subject].forEach((lesson, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = lesson.lesson;
                lessonSelect.appendChild(option);
            });
            lessonSelect.disabled = false;
        } else {
            lessonSelect.disabled = true;
        }
    }

    // Vazifalarni ko'rsatish
    function showTasks(filter = 'all', searchTerm = '') {
        const selectedSubject = subjectSelect.value;
        const selectedLesson = lessonSelect.value;
        tasksDiv.innerHTML = '';
        if (selectedSubject && selectedLesson !== "" && window.tasksData[selectedSubject]) {
            const lesson = window.tasksData[selectedSubject][selectedLesson];
            lesson.tasks.forEach(task => {
                const status = task.status || 'pending';
                if ((filter === 'all' || filter === status) && 
                    task.task.toLowerCase().includes(searchTerm.toLowerCase())) {
                    const taskElement = document.createElement('div');
                    taskElement.className = `task-card ${status === 'completed' ? 'completed' : ''} ${isPastDeadline(task.deadline) ? 'past-deadline' : ''}`;
                    taskElement.innerHTML = `
                        <p><strong>${task.task}</strong> - Muddati: ${task.deadline}</p>
                        <p>${task.grade !== null ? `Bahosi: ${task.grade}` : 'Baholanmagan'}<br>
                        ${task.teacherComment ? `O'qituvchi izohi: ${task.teacherComment}` : ''}<br>
                        ${task.attachments.length > 0 ? `Ilovalar: ${task.attachments.join(', ')}` : 'Ilovalar yo‘q'}
                        </p>
                        <div class="progress-bar" style="width: ${task.status === 'completed' ? '100%' : '0%'}"></div>
                        ${isPastDeadline(task.deadline) ? '<span class="deadline-warning">Muddati o‘tib ketdi!</span>' : ''}
                        <button onclick="toggleTaskStatus('${selectedSubject}', ${selectedLesson}, '${task.task}')" class="mt-2 px-4 py-2 rounded-lg ${status === 'completed' ? 'bg-green-500' : 'bg-red-500'} text-white">
                            ${status === 'completed' ? 'Bajarilgan' : 'Bajarilmagan'}
                        </button>
                        <button onclick="submitTask('${selectedSubject}', ${selectedLesson}, '${task.task}')" class="mt-2 ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white">Topshirish</button>
                    `;
                    tasksDiv.appendChild(taskElement);
                }
            });
        }
    }

    // Vazifa holatini o'zgartirish
    window.toggleTaskStatus = function(subject, lessonIndex, taskName) {
        const task = window.tasksData[subject][lessonIndex].tasks.find(t => t.task === taskName);
        if (task) {
            task.status = task.status === 'completed' ? 'pending' : 'completed';
            localStorage.setItem('tasksStatus', JSON.stringify(tasksStatus));
            showTasks();
        }
    };

    // Muddati o'tgan vazifalarni tekshirish
    function isPastDeadline(deadline) {
        return new Date(deadline) < new Date();
    }

    // Filtrlash
    document.getElementById('filterAll').addEventListener('click', () => showTasks('all'));
    document.getElementById('filterCompleted').addEventListener('click', () => showTasks('completed'));
    document.getElementById('filterPending').addEventListener('click', () => showTasks('pending'));

    // Qidirish
    searchInput.addEventListener('input', (e) => showTasks('all', e.target.value));

    // Fan tanlanganda
    subjectSelect.addEventListener('change', () => {
        loadLessons(subjectSelect.value);
        showTasks();
    });

    // Dars tanlanganda
    lessonSelect.addEventListener('change', () => showTasks());

    // Vazifa topshirish
    window.submitTask = function(subject, lessonIndex, taskName) {
        const task = window.tasksData[subject][lessonIndex].tasks.find(t => t.task === taskName);
        if (task) {
            task.status = 'completed'; // Assume task is completed upon submission
            alert('Vazifa muvaffaqiyatli topshirildi!');
            // Here you might want to add file upload functionality or link submission
            showTasks();
        }
    };

    // Esdaliklar (Notifications)
    function checkDeadlines() {
        Object.keys(window.tasksData).forEach(subject => {
            window.tasksData[subject].forEach(lesson => {
                lesson.tasks.forEach(task => {
                    const now = new Date();
                    const deadline = new Date(task.deadline);
                    const timeDiff = deadline - now;
                    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    if (daysLeft <= 1) {
                        alert(`Esdalik: ${task.task} vazifasi muddati ${daysLeft === 0 ? 'bugun' : 'ertaga'} tugaydi!`);
                    }
                });
            });
        });
    }

    // Check deadlines daily
    setInterval(checkDeadlines, 24 * 60 * 60 * 1000); // Every 24 hours

    // Dastlabki yuklash
    loadLessons(subjectSelect.value);
    showTasks();
}

// DOM yuklanganda
document.addEventListener('DOMContentLoaded', loadTasksData);