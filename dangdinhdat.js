// dangdinhdat.js - frontend fetch logic for search UI
const API_URL = "http://localhost:1880/timkiem";

document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById('q');
	const btn = document.getElementById('btnSearch');
	const status = document.getElementById('status');
	const results = document.getElementById('results');

		function setStatus(text, isError = false, isLoading = false) {
			status.textContent = text || '';
			// set color class
			if (isError) {
				status.classList.add('error');
			} else {
				status.classList.remove('error');
			}
			// loading spinner
			if (isLoading) {
				status.classList.add('loading');
			} else {
				status.classList.remove('loading');
			}
		}

	async function search(q) {
		if (!q || !q.trim()) {
			setStatus('Vui lòng nhập từ khóa tìm kiếm.', true);
			results.innerHTML = '';
			return;
		}

		setStatus('Đang tìm...', false, true);
		results.innerHTML = '';

		try {
			// call the Node-RED endpoint; it expects ?q=...
			const url = new URL(API_URL);
			url.searchParams.set('q', q);

			const resp = await fetch(url.toString(), { method: 'GET' });
			if (!resp.ok) {
				const text = await resp.text();
				throw new Error(`Server trả về lỗi: ${resp.status} ${resp.statusText}\n${text}`);
			}

			// Node-RED may return JSON or a string. Try parse as JSON.
			const data = await resp.json();

					if (!data || (Array.isArray(data) && data.length === 0)) {
						setStatus('Không tìm thấy kết quả.', false, false);
						results.innerHTML = '<div class="no-results">Không tìm thấy kết quả</div>';
						return;
					}

					setStatus(`Tìm thấy ${Array.isArray(data) ? data.length : 1} kết quả.`, false, false);
					renderResults(data);
		} catch (err) {
			console.error(err);
					setStatus('Lỗi khi gọi API: ' + (err.message || err), true, false);
					results.innerHTML = `<div class="no-results">Lỗi: ${escapeHtml(err.message || err)}</div>`;
		}
	}

		function renderResults(data) {
			// If a single object, wrap into array
			const arr = Array.isArray(data) ? data : [data];

			// Build table header based on commonly expected fields (these appear first), then any other keys
			const fields = ['MaHV','HoTen','GioiTinh','NgaySinh','SDT','DiaChi'];

			const sample = arr[0] || {};
			const keys = Object.keys(sample);

			// columns: keep common fields first (if present), then any remaining keys from the sample
			const columns = Array.from(new Set([
				// common fields (only those we actually have in data will be meaningful, but keep order)
				...fields,
				// then all keys from sample (this adds any extra fields)
				...keys
			]));

			// Table inside a responsive wrapper
			const wrap = document.createElement('div');
			wrap.className = 'table-wrap card';

			const table = document.createElement('table');
			const thead = document.createElement('thead');
			const trh = document.createElement('tr');
			columns.forEach(c => {
				const th = document.createElement('th');
				th.textContent = c;
				trh.appendChild(th);
			});
			thead.appendChild(trh);
			table.appendChild(thead);

			const tbody = document.createElement('tbody');
			arr.forEach(item => {
				const tr = document.createElement('tr');
				columns.forEach(col => {
					const td = document.createElement('td');
					let val = item[col];
					if (val === null || val === undefined) val = '';
					// format ISO date-ish strings
					if (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}T/)) {
						try { val = new Date(val).toLocaleDateString(); } catch(e){}
					}
					td.textContent = String(val);
					tr.appendChild(td);
				});
				tbody.appendChild(tr);
			});
			table.appendChild(tbody);

			wrap.appendChild(table);

			// Raw JSON toggle
			const raw = document.createElement('details');
			raw.style.marginTop = '12px';
			const summary = document.createElement('summary');
			summary.textContent = 'Xem JSON thô';
			const pre = document.createElement('div');
			pre.className = 'raw-json';
			pre.textContent = JSON.stringify(arr, null, 2);
			raw.appendChild(summary);
			raw.appendChild(pre);

			results.innerHTML = '';
			results.appendChild(wrap);
			results.appendChild(raw);
		}

	// small helper to escape HTML for error display
	function escapeHtml(s) {
		return String(s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	// wire up events
	btn.addEventListener('click', () => search(input.value));
	input.addEventListener('keydown', (e) => { if (e.key === 'Enter') search(input.value); });

	// Autofocus input
	input.focus();
});


