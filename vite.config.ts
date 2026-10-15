import { defineConfig } from 'vitest/config';
export default defineConfig({cacheDir:'.cache/vite',server:{fs:{strict:true,allow:['.']}},build:{outDir:'dist',chunkSizeWarningLimit:800},test:{include:['tests/**/*.test.ts']}});
