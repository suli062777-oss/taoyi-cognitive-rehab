import {defineConfig} from 'vite';
export default defineConfig({publicDir:false,build:{outDir:'public/mediapipe/worker',emptyOutDir:true,target:'es2022',lib:{entry:'src/vendor/kiln/input/mediapipe.worker.ts',name:'TaoyiHandWorker',formats:['iife'],fileName:()=> 'hand-worker.js'}}});
