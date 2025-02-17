function loadMaterialsData() {
    if (!window.materialsData) {
        window.materialsData = [
            {
                title: "Matematika Darslari",
                category: "Matematika",
                lessons: Array.from({ length: 20 }, (_, i) => ({
                    lessonTitle: `Matematika Darsi ${i + 1}`,
                    materials: [
                        { type: "PDF", title: `Matematika Darslik ${i + 1}`, link: `https://example.com/math${i + 1}.pdf`, date: `2025-02-${String(i + 1).padStart(2, '0')}` },
                        { type: "Link", title: `Matematika Video ${i + 1}`, link: `https://zoom.us/j/${1234567890 + i}`, date: `2025-02-${String(i + 1).padStart(2, '0')}` }
                    ]
                }))
            },
            {
                title: "Fizika Darslari",
                category: "Fizika",
                lessons: Array.from({ length: 20 }, (_, i) => ({
                    lessonTitle: `Fizika Darsi ${i + 1}`,
                    materials: [
                        { type: "PDF", title: `Fizika Darslik ${i + 1}`, link: `https://example.com/physics${i + 1}.pdf`, date: `2025-02-${String(i + 1).padStart(2, '0')}` }
                    ]
                }))
            },
            {
                title: "Ingliz Tili Darslari",
                category: "Ingliz Tili",
                lessons: Array.from({ length: 20 }, (_, i) => ({
                    lessonTitle: `Ingliz Tili Darsi ${i + 1}`,
                    materials: [
                        { type: "PDF", title: `Ingliz Tili Darslik ${i + 1}`, link: `https://example.com/english${i + 1}.pdf`, date: `2025-02-${String(i + 1).padStart(2, '0')}` }
                    ]
                }))
            }
        ];
    }

    const materialsList = document.getElementById('materialsList');
    const searchInput = document.getElementById('searchMaterials');
    const categoryLinks = document.querySelectorAll('.category-link');

    function showMaterialsForCategory(category) {
        const course = window.materialsData.find(mat => mat.category === category);
        if (!course) return;

        materialsList.innerHTML = course.lessons.map(lesson => `
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div class="p-4 border-b border-gray-100">
                    <h4 class="text-lg font-semibold flex items-center">
                        <span class="mr-2">📖</span>
                        ${lesson.lessonTitle}
                    </h4>
                    <button class="see-more mt-2 text-blue-600 hover:text-blue-700 flex items-center" 
                            data-lesson="${lesson.lessonTitle}" 
                            data-category="${category}">
                        <span class="mr-1">⬇️</span>
                        Ko'proq ko'rsatish
                    </button>
                </div>
                <div class="materials-content hidden px-4 pb-4 pt-2 bg-gray-50">
                    ${lesson.materials.map(material => `
                        <div class="flex items-center justify-between p-3 bg-white rounded-lg mb-2">
                            <div>
                                <a href="${material.link}" 
                                   class="text-blue-600 hover:text-blue-700 flex items-center" 
                                   target="_blank">
                                    ${material.type === 'PDF' ? '📄' : '🔗'}
                                    <span class="ml-2">${material.title}</span>
                                </a>
                                <span class="text-sm text-gray-500 block mt-1">
                                    📅 ${new Date(material.date).toLocaleDateString()}
                                </span>
                            </div>
                            <span class="text-sm px-2 py-1 rounded-full ${material.type === 'PDF' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'}">
                                ${material.type}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // "Ko'proq" tugmasi bosilganda materiallarni ochish
    materialsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('see-more')) {
            const parentDiv = e.target.closest('.bg-white');
            const materialsContent = parentDiv.querySelector('.materials-content');
            materialsContent.classList.toggle('hidden');
        }
    });

    // Kategoriyalar bosilganda
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('bg-blue-50'));
            this.classList.add('bg-blue-50');
            showMaterialsForCategory(this.dataset.category);
        });
    });

    // **Izlash funksiyasi (Tuzatilgan)**
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();

        Array.from(materialsList.children).forEach(card => {
            const lessonTitle = card.querySelector("h4").textContent.toLowerCase();
            const materialsContent = card.querySelector(".materials-content");
            const materialTexts = Array.from(materialsContent.querySelectorAll("a")).map(a => a.textContent.toLowerCase());

            const foundInLesson = lessonTitle.includes(term);
            const foundInMaterials = materialTexts.some(text => text.includes(term));

            if (foundInLesson || foundInMaterials) {
                card.style.display = '';
                if (foundInMaterials) {
                    materialsContent.classList.remove('hidden');
                }
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Dastlab Matematika kategoriyasini yuklash
    showMaterialsForCategory('Matematika');
}

// `DOMContentLoaded` ni ishlatish
document.addEventListener('DOMContentLoaded', loadMaterialsData);
