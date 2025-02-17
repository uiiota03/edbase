        // Vazifalar ma'lumotlari
        function loadTasksData() {
            if (!window.tasksData) {
                window.tasksData = {
                    "Matematika": Array.from({ length: 20 }, (_, i) => ({
                        lesson: `Matematika Darsi ${i + 1}`,
                        tasks: [
                            { task: `Uy vazifasi ${i + 1}`, deadline: `2025-02-${String(i + 1).padStart(2, '0')}` },
                            { task: `Masalalar to'plami ${i + 1}`, deadline: `2025-02-${String(i + 2).padStart(2, '0')}` }
                        ]
                    })),
                    "Fizika": Array.from({ length: 20 }, (_, i) => ({
                        lesson: `Fizika Darsi ${i + 1}`,
                        tasks: [
                            { task: `Eksperiment ${i + 1}`, deadline: `2025-03-${String(i + 1).padStart(2, '0')}` },
                            { task: `Teoriya ${i + 1}`, deadline: `2025-03-${String(i + 2).padStart(2, '0')}` }
                        ]
                    })),
                    "Ingliz Tili": Array.from({ length: 20 }, (_, i) => ({
                        lesson: `Ingliz Tili Darsi ${i + 1}`,
                        tasks: [
                            { task: `Essay ${i + 1}`, deadline: `2025-04-${String(i + 1).padStart(2, '0')}` },
                            { task: `Grammatika ${i + 1}`, deadline: `2025-04-${String(i + 2).padStart(2, '0')}` }
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
                    const sortedTasks = lesson.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                    sortedTasks.forEach(task => {
                        if ((filter === 'all' || tasksStatus[task.task] === filter) && 
                            task.task.toLowerCase().includes(searchTerm.toLowerCase())) {
                            const taskElement = document.createElement('div');
                            taskElement.className = `task-card ${tasksStatus[task.task] === 'completed' ? 'completed' : ''} ${isPastDeadline(task.deadline) ? 'past-deadline' : ''}`;
                            taskElement.innerHTML = `
                                <p><strong>${task.task}</strong> - Muddati: ${task.deadline}</p>
                                <button onclick="toggleTaskStatus('${task.task}')" class="mt-2 px-4 py-2 rounded-lg ${tasksStatus[task.task] === 'completed' ? 'bg-green-500' : 'bg-red-500'} text-white">
                                    ${tasksStatus[task.task] === 'completed' ? 'Bajarilgan' : 'Bajarilmagan'}
                                </button>
                            `;
                            tasksDiv.appendChild(taskElement);
                        }
                    });
                }
            }

            // Vazifa holatini o'zgartirish
            window.toggleTaskStatus = function(taskName) {
                tasksStatus[taskName] = tasksStatus[taskName] === 'completed' ? 'pending' : 'completed';
                localStorage.setItem('tasksStatus', JSON.stringify(tasksStatus));
                showTasks();
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

            // Dastlabki yuklash
            loadLessons(subjectSelect.value);
            showTasks();
        }

        // DOM yuklanganda
        document.addEventListener('DOMContentLoaded', loadTasksData);