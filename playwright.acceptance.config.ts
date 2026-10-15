import {defineConfig} from '@playwright/test';
import base from './playwright.config';
export default defineConfig({...base,testDir:'tests/acceptance',timeout:180000,outputDir:'.cache/acceptance-results'});
