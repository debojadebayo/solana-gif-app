/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    '.cta-button': [
      'h-[45px]',
      'border-0',
      'w-auto',
      'px-10',
      'rounded-lg',
      'cursor-pointer',
      'text-base',
      'font-bold',
      'text-white',
    ], '.submit-gif-button': [
      'bg-gradient-to-r',
      'from-[#4e44ce]',
      'to-[#35aee2]',
      'bg-[length:200%_200%]',
      'animate-gradient',
      'ml-2.5',
    ],


  }
}

