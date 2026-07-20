document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data
        const [channelRes, videoRes] = await Promise.all([
            fetch('channel_info.json'),
            fetch('video_data.json')
        ]);
        
        const channelData = await channelRes.json();
        const videoData = await videoRes.json();

        // Initialize Main Video Area (from video_data.json as the featured course info)
        const mainPlayer = document.getElementById('main-player');
        const courseTitle = document.getElementById('course-title');
        const courseDescription = document.getElementById('course-description');
        const channelName = document.getElementById('channel-name');
        
        courseTitle.textContent = videoData.title;
        courseDescription.textContent = videoData.description;
        channelName.textContent = videoData.channel;

        // Initialize Curriculum Sidebar
        const curriculumList = document.getElementById('curriculum-list');
        
        channelData.forEach((video, index) => {
            const lessonItem = document.createElement('div');
            lessonItem.className = 'lesson-item';
            
            // If it's the first video, make it active and load it into the player
            if (index === 0) {
                lessonItem.classList.add('active');
                mainPlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=0&rel=0`;
                courseTitle.textContent = video.title;
                courseDescription.textContent = video.description || videoData.description;
            }

            lessonItem.innerHTML = `
                <div class="lesson-number">${index + 1}</div>
                <div class="lesson-details">
                    <h4>${video.title}</h4>
                    <div class="lesson-meta">
                        <span class="icon-play"></span>
                        <span>Video</span>
                    </div>
                </div>
            `;

            // Click handler to switch video
            lessonItem.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.lesson-item').forEach(item => item.classList.remove('active'));
                lessonItem.classList.add('active');
                
                // Switch video in player (add autoplay so it starts playing)
                mainPlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;
                
                // Update main title and description based on the clicked video
                courseTitle.textContent = video.title; 
                courseDescription.textContent = video.description || videoData.description;
            });

            curriculumList.appendChild(lessonItem);
        });

        // Tab Switching Logic
        const tabs = document.querySelectorAll('.tab');
        const aiTutorContent = document.getElementById('ai-tutor-content');
        const defaultContent = document.querySelector('.tab-content:not(#ai-tutor-content)');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Toggle AI content vs regular content
                if (tab.dataset.target === 'ai') {
                    aiTutorContent.style.display = 'block';
                    defaultContent.style.display = 'none';
                } else {
                    aiTutorContent.style.display = 'none';
                    defaultContent.style.display = 'block';
                }
            });
        });

        // AI Tutor Submission
        document.getElementById('ai-ask-btn').addEventListener('click', async () => {
            const btn = document.getElementById('ai-ask-btn');
            const question = document.getElementById('ai-question').value;
            const resBox = document.getElementById('ai-response');
            
            if (!question) return;

            btn.innerHTML = 'Thinking...';
            btn.disabled = true;

            try {
                const res = await fetch('/api/ai/ask', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ question })
                });
                const data = await res.json();
                
                resBox.textContent = data.answer || "Error processing response.";
                resBox.style.display = 'block';
            } catch (err) {
                resBox.textContent = "Could not reach Vertex AI / Codex endpoints.";
                resBox.style.display = 'block';
            }

            btn.innerHTML = 'Ask AI';
            btn.disabled = false;
        });

    } catch (error) {
        console.error("Error loading data:", error);
        document.getElementById('course-title').textContent = "Error loading course data. Please check console.";
    }
});
