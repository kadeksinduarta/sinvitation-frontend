(function() {
    // Determine the slug from the URL.
    // Example: https://s-invitation.my.id/agung-sudita -> slug is "agung-sudita"
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const slug = pathParts[pathParts.length - 1] || 'default-slug';

    // The backend API URL
    // Can be configured by finding the script tag and reading a data-api-url attribute, or hardcoded
    const API_URL = 'https://api.s-invitation.my.id/api/rsvp';

    function createForm() {
        const container = document.getElementById('rsvp-widget');
        if (!container) return; // Exit if no container found

        container.innerHTML = `
            <style>
                #rsvp-widget-form {
                    font-family: inherit;
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }
                #rsvp-widget-form .form-group {
                    margin-bottom: 15px;
                }
                #rsvp-widget-form label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 600;
                    color: #333;
                }
                #rsvp-widget-form input, 
                #rsvp-widget-form select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-family: inherit;
                    box-sizing: border-box;
                }
                #rsvp-widget-form button {
                    background: #4ade80;
                    color: #fff;
                    border: none;
                    padding: 12px 20px;
                    width: 100%;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                #rsvp-widget-form button:hover {
                    background: #22c55e;
                }
                #rsvp-widget-form button:disabled {
                    background: #9ca3af;
                    cursor: not-allowed;
                }
                #rsvp-message {
                    margin-top: 15px;
                    padding: 10px;
                    border-radius: 6px;
                    display: none;
                }
                .rsvp-success { background: #dcfce7; color: #166534; }
                .rsvp-error { background: #fee2e2; color: #991b1b; }
            </style>
            <div id="rsvp-widget-form">
                <form id="rsvpForm">
                    <div class="form-group">
                        <label for="nama_tamu">Nama Tamu</label>
                        <input type="text" id="nama_tamu" name="nama_tamu" required placeholder="Masukkan nama Anda">
                    </div>
                    <div class="form-group">
                        <label for="jumlah_kehadiran">Jumlah Orang</label>
                        <input type="number" id="jumlah_kehadiran" name="jumlah_kehadiran" min="1" value="1" required>
                    </div>
                    <div class="form-group">
                        <label for="status_kehadiran">Status Kehadiran</label>
                        <select id="status_kehadiran" name="status_kehadiran" required>
                            <option value="hadir">Hadir</option>
                            <option value="tidak_hadir">Tidak Hadir</option>
                        </select>
                    </div>
                    <button type="submit" id="rsvpSubmitBtn">Kirim Konfirmasi</button>
                    <div id="rsvp-message"></div>
                </form>
            </div>
        `;

        const form = document.getElementById('rsvpForm');
        const submitBtn = document.getElementById('rsvpSubmitBtn');
        const messageDiv = document.getElementById('rsvp-message');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'Mengirim...';
            messageDiv.style.display = 'none';
            messageDiv.className = '';

            const formData = new FormData(form);
            const data = {
                slug: slug,
                nama_tamu: formData.get('nama_tamu'),
                jumlah_kehadiran: parseInt(formData.get('jumlah_kehadiran'), 10),
                status_kehadiran: formData.get('status_kehadiran')
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    messageDiv.innerText = result.message || 'Terima kasih atas konfirmasi kehadiran Anda.';
                    messageDiv.classList.add('rsvp-success');
                    messageDiv.style.display = 'block';
                    form.reset();
                } else {
                    messageDiv.innerText = result.message || 'Terjadi kesalahan. Silakan coba lagi.';
                    messageDiv.classList.add('rsvp-error');
                    messageDiv.style.display = 'block';
                }
            } catch (err) {
                messageDiv.innerText = 'Koneksi bermasalah. Silakan coba lagi.';
                messageDiv.classList.add('rsvp-error');
                messageDiv.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Kirim Konfirmasi';
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createForm);
    } else {
        createForm();
    }
})();
