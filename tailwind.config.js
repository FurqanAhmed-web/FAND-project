/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				error: '#FDA29B',
				'error-2': '#D92D20',
				'error-3': '#B42318',
				'black-2': '#262626',
				yellow: '#FC0',
				gray: '#393939',
				'gray-3': '#D9D9D9',
				'gray-4': '#D6D6D6',
				'gray-5': '#7D7D7D',
				'gray-6': '#515151',
				'gray-8': '#667085',
				'gray-9': '#666666',
				'gray-11': '#344054',
				'gray-12': '#475467',
				'gray-13': '#101828',
				'gray-14': '#CBCBCB',
				'gray-18': '#1D2939',
				'gray-19': '#858585',
				'gray-21': '#5F5F5F',
				error: '#F04438',
				success: '#6CE9A6',
				'success-2': '#027A48'
			},
			backgroundColor: {
				'error-4': '#FEE4E2',
				yellow: '#FC0',
				'yellow-2': '#FFCC0080',
				'yellow-3': '#ffcc004d',
				'gray-2': '#D0D5DD',
				'gray-3': '#D9D9D9',
				'gray-4': '#D6D6D6',
				'gray-10': '#F2F4F7',
				'black-3': '#00000080',
				'success-3': '#F6FEF9',
				'error-5': '#FFFBFA'
			},
			borderColor: {
				error: '#FDA29B',
				'black-3': '#00000080',
				'gray-2': '#D0D5DD',
				'gray-4': '#D6D6D6',
				'gray-5': '#7D7D7D',
				'gray-7': '#9D9D9D',
				'gray-9': '#666666',
				'gray-15': '#E6E6E6',
				'gray-16': '#EAECF0',
				'gray-17': '#F9FAFB',
				'gray-20': '#EEEEEE',
				yellow: '#FC0',
				success: '#6CE9A6'
			},
			textDecorationColor: {
				yellow: '#FC0'
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: []
};
