document.addEventListener('DOMContentLoaded', () => {
	const html = document.documentElement;
	const toggle = document.getElementById('theme-toggle');
	const knob = document.getElementById('theme-toggle-knob');

	if (!toggle || !knob) return;

	// Palettes are objects that map CSS custom properties to values.
	const palettes = {
		dark: {
			'--neon-cyan': '#00f2ff',
            '--deep-purple': '#1a0b2e',
            '--glass-bg': 'rgba(15, 15, 20, 0.7)',
            '--glass-border': 'rgba(0, 242, 255, 0.2)',
            '--bg-body': '#0a0a0c',
			'--text-primary': '#ffffff',
			'--text-primary-rgb': '255,255,255',
			'--bg-black-rgb': '10,10,12',
			'--bg-white-rgb': '255,255,255',
            '--gradient-1':  'hsla(263, 66%, 15%, 1) 0px',
            '--gradient-2':  'hsla(280, 80%, 10%, 1) 0px',
            '--gradient-3':   'hsla(187, 100%, 10%, 1) 0px',
            '--gradient-4': 'hsla(263, 66%, 15%, 1) 0px',
            '--gradient-5':  'hsla(187, 100%, 10%, 1) 0px',
            '--bg-white' : '#ffffff',
            '--bg-black' : '#0a0a0c'
		},
		light: {
            '--neon-cyan': '#00b4d8',
            '--glass-bg': 'rgba(255, 255, 255, 0.4)',
            '--glass-border': 'rgba(0, 180, 216, 0.2)',
            '--bg-body': '#f8f9fb',
		    '--text-primary': '#1a1c25',
			'--text-primary-rgb': '26,28,37',
            '--bg-black' : '#e8ecff',
            '--bg-black-rgb': '232,236,255',
            '--bg-white' : '#00b4d8',
            '--bg-white-rgb': '0,180,216',
            '--gradient-1':  'hsla(200, 100%, 95%, 1) 0px',
            '--gradient-2':  ' hsla(320, 100%, 95%, 1) 0px',
            '--gradient-3':   'hsla(180, 100%, 95%, 1) 0px',
            '--gradient-4': 'hsla(210, 100%, 95%, 1) 0px',
            '--gradient-5':  'hsla(190, 100%, 95%, 1) 0px',
		},
		sunset: {
			'--neon-cyan': '#ff6b6b',
			'--neon-cyan-rgb': '255,107,107',
			'--deep-purple': '#ff9f1c',
			'--glass-border': 'rgba(255,107,107,0.2)'
		}
	};

	function applyPalette(p) {
		Object.entries(p).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
	}

	function updateGroupHoverTextWhite(mode) {
		const els = document.querySelectorAll('.group-hover\\:text-white');
		els.forEach(el => {
			if (mode === 'light') {
				// Replace the hover text utility with a hover background in light mode.
				if (el.classList.contains('group-hover:text-white')) {
					el.classList.remove('group-hover:text-white');
					el.classList.add('group-hover:text-slate-700');
					el.setAttribute('data-removed-group-hover-text-white', 'true');
					el.setAttribute('data-added-group-hover-text-slate-700', 'true');
				}
				// Also remove any forced `text-white` left over.
				el.classList.remove('text-white');
			} else {
				// Restore the original class when switching back to dark
				if (el.getAttribute('data-removed-group-hover-text-white') === 'true') {
					el.classList.add('group-hover:text-white');
					el.removeAttribute('data-removed-group-hover-text-white');
				}
				if (el.getAttribute('data-added-group-hover-text-slate-700') === 'true') {
					el.classList.remove('group-hover:text-slate-700');
					el.removeAttribute('data-added-group-hover-text-slate-700');
				}
			}
		});
	}

	function updateHoverBgWhite(mode) {
		// Now operate on hover text color utilities instead of background.
		const els = document.querySelectorAll('.hover\\:text-white');
		els.forEach(el => {
			if (mode === 'light') {
				if (el.classList.contains('hover:text-white')) {
					el.classList.remove('hover:text:white');
					// remove incorrect class above and add correct removal if present
				}
				if (el.classList.contains('hover:text-white')) {
					el.classList.remove('hover:text-white');
				}
				// Add the light-mode hover text color
				el.classList.add('hover:text-cyan-neon');
				el.setAttribute('data-removed-hover-text-white', 'true');
				el.setAttribute('data-added-hover-text-cyan-neon', 'true');
			} else {
				// Restore original hover text class when returning to dark
				if (el.getAttribute('data-removed-hover-text-white') === 'true') {
					el.classList.add('hover:text-white');
					el.removeAttribute('data-removed-hover-text-white');
				}
				if (el.getAttribute('data-added-hover-text-cyan-neon') === 'true') {
					el.classList.remove('hover:text-cyan-neon');
					el.removeAttribute('data-added-hover-text-cyan-neon');
				}
			}
		});
	}

	function updateToggleIcons(mode) {
		if (!toggle) return;
		const parent = toggle.parentElement;
		if (!parent) return;
		const spans = parent.querySelectorAll('span.material-symbols-outlined');
		if (spans.length < 2) return;
		const darkIcon = spans[0];
		const lightIcon = spans[1];
		if (mode === 'dark') {
			darkIcon.classList.add('text-cyan-neon');
			darkIcon.classList.remove('text-slate-600');
			lightIcon.classList.add('text-slate-600');
			lightIcon.classList.remove('text-cyan-neon');
		} else {
			darkIcon.classList.remove('text-cyan-neon');
			darkIcon.classList.add('text-slate-600');
			lightIcon.classList.remove('text-slate-600');
			lightIcon.classList.add('text-cyan-neon');
		}
	}

	function setTheme(mode) {
		if (mode === 'dark') {
			html.classList.add('dark');
			toggle.setAttribute('data-theme', 'dark');
			toggle.setAttribute('aria-pressed', 'true');
			knob.classList.remove('right-1');
			knob.classList.add('left-1');
			applyPalette(palettes.dark);
		} else {
			html.classList.remove('dark');
			toggle.setAttribute('data-theme', 'light');
			toggle.setAttribute('aria-pressed', 'false');
			knob.classList.remove('left-1');
			knob.classList.add('right-1');
			applyPalette(palettes.light);
		}
		// Update hover text handling (preserve in dark, clean in light)
		updateGroupHoverTextWhite(mode);
		updateHoverBgWhite(mode);
		updateToggleIcons(mode);

		localStorage.setItem('site-theme', mode);
	}

	// Initialize theme from storage or system preference
	const saved = localStorage.getItem('site-theme');
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	setTheme(saved || (prefersDark ? 'dark' : 'light'));

	// Toggle on click
	toggle.addEventListener('click', () => {
		const current = toggle.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
		setTheme(current === 'dark' ? 'light' : 'dark');
	});

	// Keyboard accessibility
	toggle.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle.click();
		}
	});

	// Public API: allow adding/applying palettes at runtime
	window.ThemePalettes = {
		add(name, obj) { palettes[name] = obj; },
		apply(name) { if (palettes[name]) applyPalette(palettes[name]); }
	};

});