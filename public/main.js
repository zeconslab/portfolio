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